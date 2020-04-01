import React, { Component } from "react";
import Table from "./common/table";

class MarketTable extends Component {
  columns = [
    {
      class: "clickable",
      // classData: "col-2",
      path: "storeName", //store_name
      label: "Store Name"
    },
    {
      class: "clickable",
      // classData: "col-1",
      path: "address", //address_supermarket
      label: "Address"
    },
    {
      class: "clickable",
      // classData: "col-1",
      path: "phone", //phon_number
      label: "Phone Number"
    },
    {
      class: "clickable",
      // classData: "col-1",
      path: "open",
      label: "Today Opening Hours"
    },
    {
      class: "clickable",
      // classData: "col-1",
      path: "distance",
      label: "Distance (in meters)"
    },
    {
      class: "clickable",
      // classData: "col-1",
      path: "rating", //rating
      label: "Google Rating"
    },
    {
      class: "clickable",
      // classData: "col-1",
      path: "totalScore", //total_score
      label: "Match to you"
    }
  ];

  render() {
    const { supers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={supers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MarketTable;
