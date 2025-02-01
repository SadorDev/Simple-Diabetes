import { useEffect, useState } from "react";
import { useUser } from "../authentication/useUser";
import { getToday } from "../../utils/helpers";
import { getBloodGlucoseReadingsBetweenDates } from "../../services/APILogbook";

const useBloodGlucoseReadings = (filterDays = 7) => {
  const { user } = useUser();
  const [readings, setReadings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryDays, setQueryDays] = useState(filterDays);

  useEffect(() => {
    const fetchReadings = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const endDate = getToday({ end: true });
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - queryDays);
        const startDateISO = startDate.toISOString();
        const endDateISO = endDate;

        const data = await getBloodGlucoseReadingsBetweenDates(
          user.id,
          startDateISO,
          endDateISO
        );
        setReadings(data);
      } catch (err) {
        console.error("Error fetching readings:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadings();
  }, [user?.id, queryDays]);

  return { readings, isLoading, error, setQueryDays };
};

export const useTodaysBloodGlucoseReadings = () => {
  const { user } = useUser();
  const [readings, setReadings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadings = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const todayStart = getToday();
        const todayEnd = getToday({ end: true });
        const data = await getBloodGlucoseReadingsBetweenDates(
          user.id,
          todayStart,
          todayEnd
        );
        setReadings(data);
      } catch (err) {
        console.error("Error fetching today's readings:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadings();
  }, [user?.id]); 

  return { readings, isLoading, error }; 
};

export default useBloodGlucoseReadings;
