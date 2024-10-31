import PropTypes from "prop-types";
import styled from "styled-components";

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

// const Footer = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;
//   &:not(:has(*)) {
//     display: none;
//   }
// `;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Main Component
const LogbookTable = ({ logbookEntries }) => {
  return (
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
              <span>{entry.insulinUnits || "N/A"}</span>
              <span>{entry.notes || "N/A"}</span>
            </StyledRow>
          ))
        ) : (
          <Empty>No data available</Empty>
        )}
      </StyledBody>
    </StyledTable>
  );
};

LogbookTable.propTypes = {
  logbookEntries: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      reading: PropTypes.number.isRequired,
      insulinUnits: PropTypes.number,
      notes: PropTypes.string,
    })
  ).isRequired,
};

export default LogbookTable;
