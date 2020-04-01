import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";

class RecpiesTable extends Component {
  columns = [
    {
      class: "clickable",
      // classData: "col-6",
      path: "title",
      label: "Title",
      // style: { width: "20px" },
      content: recipe => (
        <button
          className="btn btn-link active"
          onClick={() => this.props.onDisplay(recipe)}
        >
          {recipe.title}
        </button>
      )
    },
    {
      class: "clickable",
      // classData: "col-2",
      path: "cuisine.name",
      label: "Cuisine"
    },
    {
      class: "clickable",
      // classData: "col-1",
      path: "prep_time",
      label: "Prep Time"
    },
    {
      key: "like",
      content: recipe => (
        <Like liked={recipe.liked} onClick={() => this.props.onLike(recipe)} />
      )
    },
    {
      label: "Wine Pairing",
      key: "wine",
      content: recipe => (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => this.props.onWine(recipe)}
        >
          <i className="fa fa-glass" aria-hidden="true" /> Get Wine
        </button>
      )
    }
  ];

  render() {
    let { recipes, onSort, sortColumn } = this.props;
    recipes.forEach(element => {
      if (element.title.length > 45) {
        const index = recipes.indexOf(element);
        recipes[index] = { ...recipes[index] };
        recipes[index].title = recipes[index].title.slice(0, 45);
      }
    });

    return (
      <Table
        columns={this.columns}
        data={recipes}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RecpiesTable;
