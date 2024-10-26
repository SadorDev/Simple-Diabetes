import { useEffect } from "react";
import { getBloodGlucoseReadings } from "../services/APILogbook";

const Logbook = () => {
  useEffect(() => {
    getBloodGlucoseReadings().then((data) => console.log(data));
  }, []);

  return <div>Logbook</div>;
};

export default Logbook;
