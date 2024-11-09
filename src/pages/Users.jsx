import Heading from "../ui/Heading";
import SignUpForm from "../features//authentication/SignUpForm";

const Users = () => {
  return (
    <>
      <Heading as="h1"> Create a New User</Heading>
      <SignUpForm />
    </>
  );
};

export default Users;
