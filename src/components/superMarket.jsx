import React, { Component } from "react";
import _ from "lodash";
import MarketTable from "./marketsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class SuperMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supers: [],
      currentPage: 1,
      pageSize: 10,
      sortColumn: { path: "title", order: "asc" }
    };
  }

  componentDidMount() {
    const { supers } = this.props;
    this.setState({ supers });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, supers: allSupers } = this.state;

    const sorted = _.orderBy(allSupers, [sortColumn.path], [sortColumn.order]);

    const supers = paginate(sorted, currentPage, pageSize);

    return { totalCount: allSupers.length, data: supers };
  };

  render() {
    const { length: count } = this.state.supers;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no supers in the database.</p>;

    const { totalCount, data: supers } = this.getPagedData();

    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col">
            <h4 className="display-4">Your Supermarket</h4>
            <br />
            <p>Showing {totalCount} supermarkets in the database.</p>
            <MarketTable
              supers={supers}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SuperMarket;
