import React, { Component } from "react";
import _ from "lodash";
import RecipesTable from "./recipesTable";
import RecipeModal from "./recipeModal";
import WineModal from "./wineModal";
import ResultModal from "./resultModal";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import { getWine } from "../services/recipeService";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleWine = this.toggleWine.bind(this);
    this.toggleNoWine = this.toggleNoWine.bind(this);
    this.state = {
      recipeModal: {},
      modal: false,
      wineModal: false,
      noWine: false,
      recipes: [],
      fullRecipes: [],
      cuisines: [],
      currentPage: 1,
      pageSize: 5,
      searchQuery: "",
      selectedCuisine: null,
      sortColumn: { path: "title", order: "asc" },
      wineText: "",
      wineNames: [],
      ingNames: [],
      subs: 0
    };
  }

  componentDidMount() {
    const { recipes, cuisines, fullRecipes } = this.props;
    this.setState({ recipes, cuisines, fullRecipes });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNoWine() {
    this.setState({
      noWine: !this.state.noWine
    });
  }

  toggleWine() {
    this.setState({
      wineModal: !this.state.wineModal
    });
  }

  handleWine = async recipe => {
    this.setState({ wineText: "" });
    this.setState({ wineNames: [] });
    let data = { type: "find_wine_to_recipe", recipe_id: recipe._id };
    const res = await getWine(data);
    if (res !== "Error") {
      const wines = await res;
      if (wines.length > 0) {
        let winesName = [];
        const wineDisc = wines[0].pairing_text;
        wines.map(wine => winesName.push(wine.Wine_name));
        this.setState({ wineText: wineDisc });
        this.setState({ wineNames: winesName });
        this.toggleWine();
      } else {
        this.toggleNoWine();
      }
    } else {
      this.toggleNoWine();
    }
  };

  handleLike = recipe => {
    const recipes = [...this.state.recipes];
    const index = recipes.indexOf(recipe);
    recipes[index] = { ...recipes[index] };
    recipes[index].liked = !recipes[index].liked;
    this.setState({ recipes });
  };

  handleDisplay = recipe => {
    const originalRecipes = [...this.state.fullRecipes];
    const recipeDisplay = originalRecipes.filter(m => m._id === recipe._id);
    const arr = recipeDisplay[0].ingsArr;
    this.setState({ recipeModal: recipeDisplay[0], ingNames: arr });
    this.toggle();
  };

  showWineModal() {
    return (
      <WineModal
        head="Match Found!"
        wineText={this.state.wineText}
        modal={this.state.wineModal}
        toggle={this.toggleWine}
        wines={this.state.wineNames}
      />
    );
  }

  showModal() {
    return (
      <RecipeModal
        recipe={this.state.recipeModal}
        subs={this.props.subs}
        ings={this.state.ingNames}
        modal={this.state.modal}
        toggle={this.toggle}
      />
    );
  }

  showErrWine() {
    return (
      <ResultModal
        modal={this.state.noWine}
        toggle={this.toggleNoWine}
        head="Sorry"
        body="No match for this recipe, try other recipe."
      />
    );
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleCuisineSelect = cuisine => {
    this.setState({
      selectedCuisine: cuisine,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedCuisine: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedCuisine,
      searchQuery,
      recipes: allRecipes
    } = this.state;

    let filtered = allRecipes;
    if (searchQuery)
      filtered = allRecipes.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCuisine && selectedCuisine._id)
      filtered = allRecipes.filter(m => m.cuisine._id === selectedCuisine._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const recipes = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: recipes };
  };

  render() {
    const { length: count } = this.state.recipes;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      fullRecipes
    } = this.state;

    if (count === 0) return <p>There are no recipes in the database.</p>;

    const { totalCount, data: recipes } = this.getPagedData();

    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-3 clickable">
            <ListGroup
              items={this.state.cuisines}
              selectedItem={this.state.selectedCuisine}
              onItemSelect={this.handleCuisineSelect}
            />
          </div>
          <div className="col-9">
            <p>Showing {totalCount} recipes in the database.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <RecipesTable
              recipes={recipes}
              fullRecipes={fullRecipes}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onWine={this.handleWine}
              onSort={this.handleSort}
              onDisplay={this.handleDisplay}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
            {this.showModal()}
            {this.showWineModal()}
            {this.showErrWine()}
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;
