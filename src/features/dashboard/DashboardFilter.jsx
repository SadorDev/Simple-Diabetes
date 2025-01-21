import { Filter, FilterButton } from "../../ui/Filter";
import { useState } from "react";

const DashboardFilter = () => {
  const [activeFilter, setActiveFilter] = useState("7"); // Initialize active filter

  return (
    <Filter>
      {/* Map over the options to create the buttons */}
      {[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ].map((option) => (
        <FilterButton
          key={option.value}
          active={activeFilter === option.value}
          onClick={() => setActiveFilter(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </Filter>
  );
};

export default DashboardFilter;