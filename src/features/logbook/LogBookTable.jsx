import styled from "styled-components";
import { useEffect, useState } from "react";
import { getBloodGlucoseReadings } from "../../services/APILogbook";
import { addBloodGlucoseReadings } from "../../services/APILogbook";
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

// Takes userId as a prop
const LogbookTable = ({ userId }) => {
  // State Management
  // logbookEntries stores the user's blood glucose readings, starting as an empty array, while setLogbookEntries updates this data when fetched.
  // newEntry tracks the state of the form for adding a new reading, and setNewEntry updates the form fields as the user types.
  const [logbookEntries, setLogbookEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    reading: "",
    insulinUnits: "",
    notes: "",
  });

  useEffect(() => {
    // This code runs after userId changes, first checking if userId exists to avoid unnecessary calls.
    // It fetches data from the database using getBloodGlucoseReadings(userId) and updates the state with setLogbookEntries(entries).
    // If fetching fails, an error is logged. The dependency array [userId] ensures the data is re-fetched only when userId changes.
    const fetchLogbookEntries = async () => {
      if (userId) {
        try {
          const entries = await getBloodGlucoseReadings(userId);
          setLogbookEntries(entries);
        } catch (error) {
          console.error("Failed to load logbook entries:", error);
        }
      }
    };

    fetchLogbookEntries();
  }, [userId]);

  // This handles an asynchoronous function that allows users to add data to their logbook
  const handleAddEntry = async () => {
    // This checks if the newEntry.reading is empty.
    // If it is, the function returns early and does not proceed to add the entry. This ensures that an empty reading is not submitted.
    if (!newEntry.reading || !userId) return;
    // This part uses async/await to call the addBloodGlucoseReadings function (which interacts with the database to insert a new entry).
    // user_id: Passes the current user's ID (userId).
    // reading: Converts the reading from a string to a number.
    // insulinUnits: If insulin units are provided, it converts them into a number, otherwise it sends null.
    // notes: Includes any notes the user has entered.
    // timestamp: Sets the timestamp for the entry to the current time in ISO format.
    // await ensures that the function pauses here until the data is successfully added or an error occurs.
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

      

      setLogbookEntries((prevEntries) => [
        ...prevEntries,
        addedEntry[0], // Handle array response
      ]);
      // This rests the form feilds to their empty initial state after the entry is successfully added
      setNewEntry({ reading: "", insulinUnits: "", notes: "" });
    } catch (error) {
      console.error("Failed to add logbook entry:", error);
    }
  };

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
        {/* Table Header */}
        <StyledHeader columns="1fr 1fr 1fr 1fr 1fr">
          <span>Date</span>
          <span>Time</span>
          <span>Glucose Level</span>
          <span>Insulin Units</span>
          <span>Notes</span>
        </StyledHeader>

        {/* Table Body */}
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
