import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const user = await loginApi(credentials);
      localStorage.setItem("user", JSON.stringify(user.user));
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
