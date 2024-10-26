import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 14.6rem;
  width: auto;
`;

const Logo = () => {
  return (
    <StyledLogo>
      <Img src="/logo.png" alt="Logo" />
      <h1>Simple Diabetes</h1>
    </StyledLogo>
  );
}

export default Logo;
