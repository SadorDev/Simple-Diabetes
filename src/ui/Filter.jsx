import styled, { css } from "styled-components";

// Wrapper for the filter controls
const Filter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  align-items: center; /* Align the children vertically */
`;

// Button used for filter options with conditional styles
const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer; /* Indicate that it is clickable */
  
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:focus {
    outline: 2px solid var(--color-brand-600); /* Add outline on focus for accessibility */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export {Filter, FilterButton };
