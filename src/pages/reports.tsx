import React, { useState } from "react";
import Filter from "../components/reports/filter";
import ItemList from "../components/common/itemList";

const Reports: React.FC = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleFilterChange = (selectedLocation: string) => {
    setSelectedLocations(prev =>
      prev.includes(selectedLocation)
        ? prev.filter(location => location !== selectedLocation)
        : [...prev, selectedLocation]
    );
  };

  return (
    <div>
      <ItemList
        title="Search our database for your lost properties"
        filter={<Filter onFilterChange={handleFilterChange} />}
        selectedLocations={selectedLocations}
        reportItems={6}
      />
    </div>
  );
};

export default Reports;