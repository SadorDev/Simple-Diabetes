import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
