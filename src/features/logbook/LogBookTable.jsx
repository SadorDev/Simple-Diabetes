import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getBloodGlucoseReadings,
  addBloodGlucoseReadings,
} from "../../services/APILogbook";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const LogbookTable = ({ userId }) => {
  const [logbookEntries, setLogbookEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    reading: "",
    insulinUnits: "",
    notes: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogbookEntries = async () => {
      if (userId) {
        try {
          const entries = await getBloodGlucoseReadings(userId);
          setLogbookEntries(entries || []);
        } catch (error) {
          console.error("Failed to load logbook entries:", error);
          setError("Failed to load logbook entries.");
        }
      }
    };

    fetchLogbookEntries();
  }, [userId]);

  const handleAddEntry = async () => {
    if (!userId) {
      console.error("User ID is missing. Cannot add entry.");
      setError("User ID is missing. Please log in.");
      return;
    }

    if (!newEntry.reading) {
      console.error("Reading is required. Cannot add entry.");
      setError("Reading is required.");
      return;
    }

    try {
      const addedEntry = await addBloodGlucoseReadings({
        userId,
        reading: Number(newEntry.reading),
        insulinUnits: newEntry.insulinUnits
          ? Number(newEntry.insulinUnits)
          : null,
        notes: newEntry.notes,
        timestamp: new Date().toISOString(),
      });

      if (addedEntry && addedEntry.length > 0) {
        setLogbookEntries((prevEntries) => [...prevEntries, addedEntry[0]]);
        setNewEntry({ reading: "", insulinUnits: "", notes: "" });
        setError(null);
      } else {
        console.error("No data returned after adding entry:", addedEntry);
        setError("Failed to add logbook entry. Please check the data.");
      }
    } catch (error) {
      console.error("Failed to add logbook entry:", error);
      setError("Failed to add logbook entry. Please try again.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <Input
        type="number"
        placeholder="Glucose Level"
        value={newEntry.reading}
        onChange={(e) => setNewEntry({ ...newEntry, reading: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Insulin Units"
        value={newEntry.insulinUnits}
        onChange={(e) =>
          setNewEntry({ ...newEntry, insulinUnits: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Notes"
        value={newEntry.notes}
        onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
      />
      <Button onClick={handleAddEntry}>Add Entry</Button>
      <StyledTable>
        <StyledHeader columns="1fr 1fr 1fr 1fr 1fr">
          <span>Date</span>
          <span>Time</span>
          <span>Glucose Level</span>
          <span>Insulin Units</span>
          <span>Notes</span>
        </StyledHeader>
        <StyledBody>
          {logbookEntries.length > 0 ? (
            logbookEntries.map((entry, index) => (
              <StyledRow key={index} columns="1fr 1fr 1fr 1fr 1fr">
                <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                <span>{new Date(entry.created_at).toLocaleTimeString()}</span>
                <span>{entry.reading}</span>
                <span>{entry.insulin_units || "N/A"}</span>
                <span>{entry.notes || "N/A"}</span>
              </StyledRow>
            ))
          ) : (
            <Empty>No data available</Empty>
          )}
        </StyledBody>
      </StyledTable>
    </>
  );
};

LogbookTable.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default LogbookTable;
