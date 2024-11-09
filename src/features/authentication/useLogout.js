import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("user");
      toast.success("User logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("ERROR:", error);
      toast.error("There was an issue logging out");
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
}
