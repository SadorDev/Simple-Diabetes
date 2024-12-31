import { useState, useEffect } from "react";
import { getBloodGlucoseReadings } from "../services/APILogbook";
import LogbookTable from "../features/logbook/LogBookTable";
import { getCurrentUser } from "../services/apiAuth"; // Function to get the current logged-in user

const Logbook = () => {
  const [logbookEntries, setLogbookEntries] = useState([]);
  const [userId, setUserId] = useState(null); // State to store the logged-in user's ID
  const [loading, setLoading] = useState(true); // Loading state while fetching data
  const [error, setError] = useState(null); // Error handling state

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); 
        console.log(currentUser);// Get current user data
        if (currentUser) {
          setUserId(currentUser.id); // Set userId if user is logged in
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch logbook entries if the user is logged in
  useEffect(() => {
    const fetchLogbookEntries = async () => {
      if (userId) {
        try {
          const data = await getBloodGlucoseReadings(userId); // Fetch entries for the logged-in user
          setLogbookEntries(data);
        } catch (error) {
          setError("Failed to load logbook entries");
          console.error(error);
        }
      }
    };

    fetchLogbookEntries();
  }, [userId]); // Dependency on userId

  // Render loading state or error if no user is logged in
  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (!userId) {
    return <div>Please log in to view your logbook entries.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Logbook</h1>
      <LogbookTable userId={userId} logbookEntries={logbookEntries} />
    </div>
  );
};

export default Logbook;
