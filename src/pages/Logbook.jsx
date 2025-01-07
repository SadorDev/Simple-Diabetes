import { useState, useEffect } from "react";
import { getBloodGlucoseReadings } from "../services/APILogbook";
import LogbookTable from "../features/logbook/LogBookTable";
import { getCurrentUser } from "../services/apiAuth";

const Logbook = () => {

  const [logbookEntries, setLogbookEntries] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUserId(currentUser.id);
        }
      } catch (err) {
        console.error("Error fetching user in Logbook:", err);
        setError("Failed to load user information."); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLogbookEntries = async () => {
      if (userId) {
        try {
          const data = await getBloodGlucoseReadings(userId);
          setLogbookEntries(data);
        } catch (error) {
          setError("Failed to load logbook entries");
          console.error("Error fetching logbook entries:", error);
        }
      }
    };

    fetchLogbookEntries();
  }, [userId]);

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