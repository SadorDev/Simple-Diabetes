import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/apiAuth";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const fetchedUser = await getCurrentUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, isAuthenticated: !!user };
};
