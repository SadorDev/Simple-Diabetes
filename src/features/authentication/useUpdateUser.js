import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "./supabaseClient";

export const useUpdateUser = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateUser = async (data, onSuccess) => {
    setIsUpdating(true);

    try {
      // Assuming you have a user session stored somewhere
      const { user } = await supabase.auth.getUser();

      // Update the user profile in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          fullName: "New Full Name",
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      onSuccess();
      toast.success("User account successfully updated.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateUser, isUpdating };
};
