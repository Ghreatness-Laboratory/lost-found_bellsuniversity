import Filter from "../components/filter";
import ItemList from "../components/itemList";

function Reports() {
  return (
    <div>
      <ItemList
        title="Search our database for your lost properties"
        filter={<Filter />}
        ReportItems={6}
      />
    </div>
  );
}

export default Reports;
