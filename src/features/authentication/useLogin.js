import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth"; 

export const useLogin =() => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const { user, error } = await loginApi(credentials); 
      if (error) throw error;

      toast.success("User logged in successfully");
      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.error("ERROR:", error);
      toast.error("Provided email or password are incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}