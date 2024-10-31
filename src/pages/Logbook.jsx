import { useState, useEffect } from "react";
import { getBloodGlucoseReadings } from "../services/APILogbook";
import LogbookTable from "../features/logbook/LogBookTable";

const Logbook = () => {
  const [logbookEntries, setLogbookEntries] = useState([]);

  useEffect(() => {
    getBloodGlucoseReadings().then((data) => {
      setLogbookEntries(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>Logbook</h1>
      <LogbookTable logbookEntries={logbookEntries} />
    </div>
  );
};

export default Logbook;
