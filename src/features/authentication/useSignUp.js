import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup as signupAPI } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (credentials) => {
    setIsLoading(true);
    try {
      const user = await signupAPI(credentials);
      localStorage.setItem("user", JSON.stringify(user.user));
      toast.success(
        "Account successfully created!"
      );
      navigate("/dashboard", { replace: true });
      console.log(user);
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
}
