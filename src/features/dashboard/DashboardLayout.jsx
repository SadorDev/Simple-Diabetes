import useBloodGlucoseReadings, {
  useTodaysBloodGlucoseReadings,
} from "./useBloodGlucoseReadings";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import Stats from "./Stats";
import {
  HiOutlineTrendingUp,
  HiOutlineClock,
  HiOutlineBeaker,
} from "react-icons/hi";
import TimeInRangeChart from "./TimeInRangeChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const [filterDays, setFilterDays] = useState(7);
  const { readings, isLoading, error } = useBloodGlucoseReadings(filterDays);
  const {
    readings: todaysReadings,
    isLoading: todaysLoading,
    error: todaysError,
  } = useTodaysBloodGlucoseReadings();

  if (isLoading || todaysLoading) return <Spinner />;
  if (error || todaysError)
    return <div>{error?.message || todaysError?.message}</div>;

  const handleFilterChange = (days) => {
    setFilterDays(parseInt(days, 10));
  };

  // Data preparation for Stats component
  const averageGlucose =
    readings?.length > 0
      ? readings.reduce((sum, r) => sum + r.reading, 0) / readings.length
      : 0;
  const inRangeReadings = readings?.filter(
    (r) => r.reading >= 70 && r.reading <= 180
  );
  const glucoseInRange =
    readings?.length > 0 ? (inRangeReadings.length / readings.length) * 100 : 0;
  const insulinUsed =
    readings?.reduce((sum, r) => sum + (r.insulin_units || 0), 0) || 0;
  const lowEvents = readings?.filter((r) => r.reading < 70).length || 0;

  return (
    <StyledDashboardLayout>
      <Stats
        metrics={[
          {
            title: "Average Glucose",
            value: `${averageGlucose.toFixed(0)} mg/dL`,
            color: "green",
            icon: <HiOutlineTrendingUp />,
          },
          {
            title: "Glucose in Range",
            value: `${glucoseInRange.toFixed(0)}%`,
            color: "blue",
            icon: <HiOutlineClock />,
          },
          {
            title: "Insulin Used",
            value: `${insulinUsed} Units`,
            color: "red",
            icon: <HiOutlineBeaker />,
          },
          {
            title: "Low Events",
            value: lowEvents,
            color: "orange",
            icon: <HiOutlineBeaker />,
          },
        ]}
      />

      <div>
        {readings &&
          readings.map((reading) => (
            <p key={reading.timestamp}>Reading: {reading.reading}</p>
          ))}
      </div>
      <TimeInRangeChart />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
