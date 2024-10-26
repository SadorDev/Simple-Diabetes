import styled from "styled-components";
// import Logo from "../Logo.jsx"
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-greay-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  grid-gap: 3.2rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
