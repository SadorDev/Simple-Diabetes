import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup as signupAPI } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (credentials) => {
    setIsLoading(true);
    try {
      const { user, error } = await signupAPI(credentials);
      console.log(user);

      if (error) throw error;

      toast.success("Account successfully created!");
      navigate("/users", { replace: true });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "There has been an error creating your account, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};
