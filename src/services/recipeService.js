import http from "./httpService";
import { apiUrl } from "../config.json";

const sendProductsEndpoint = apiUrl + "/fridge_handling";
const sendAllergiesEndpoint = apiUrl + "/allergies";
const getSupersEndpoint = apiUrl + "/get_supermarkets";
const sendNutEndpoint = apiUrl + "/handle_nutritions";
const wineEndpoint = apiUrl + "/get_wines";
const preferEndpoint = apiUrl + "/replace_and_freetext";

// get array of recipes and return recipes array with relvant attributes
function parseRecipe(data) {
  let recipes = [];
  data.forEach(item => {
    let current = {};
    current.title = item.title;
    current.prep_time = item.prep_time;
    current.cuisine = item.cuisine;
    current.ADDED_DATA = item.ADDED_DATA;
    current.kategonic = item.kategonic;
    current.vegan = item.vegan;
    current.vegetarian = item.vegetarian;
    current.very_healithy = item.very_healithy;
    current.gluten = item.gluten_free;
    current.dairy = item.Dairy_free;
    current.servings = item.servings;
    current._id = item.recipe_id;
    current.summarize = item.summarize;
    current.instructions = item.instructions_data;
    current.source_url = item.source_url;
    current.ingsArr = Object.keys(item.ING);
    current.img = item.img;
    current.subs = 0;
    recipes.push(current);
  });
  return recipes;
}

function getRecipes(data) {
  //1.parse the data to recipe array
  const fullRecipes = parseRecipe(data);
  //2.show data
  let displayRecipes = [];
  let allCuisines = [];
  let strCuisines = [];
  fullRecipes.forEach(item => {
    let current = {};
    current._id = item._id;
    current.title = item.title;
    current.prep_time = item.prep_time;
    let cuisine = {};
    cuisine._id = item.cuisine;
    cuisine.name = item.cuisine;
    current.cuisine = cuisine;
    if (!strCuisines.includes(cuisine.name)) {
      strCuisines.push(cuisine.name);
      allCuisines.push(cuisine);
    }
    displayRecipes.push(current);
  });
  return {
    recipes: displayRecipes, //recipes - array of recpies to table
    cuisines: allCuisines,
    fullRecipes: fullRecipes
  };
}

export async function sendProduct(products) {
  let data = { type: "get_recipes_by_fridge", products: products };
  let response = await http.post(sendProductsEndpoint, data);
  if (
    response === "Error" ||
    response.data === "Quntity should be a number (in gr)"
  )
    return "Error";
  return getRecipes(response.data.results);
}

export async function sendSubs(product) {
  let data = { type: "replace_ing_and_find_recipe", product: product };
  let response = await http.post(preferEndpoint, data);
  if (response === "Error") return "Error";
  return getRecipes(response.data.results);
}

export async function sendPrefers(data) {
  let response = await http.post(preferEndpoint, data);
  if (response === "Error") return "Error";
  return getRecipes(response.data.results);
}

export async function getSupers() {
  let data = { type: "find_supermarkets_by_time_day" };
  let response = await http.post(getSupersEndpoint, data);
  if (response === "Error") {
    return "Error";
  } else {
    let supers = [];
    response.data.results.forEach(item => {
      let current = {};
      current.storeName = item.store_name;
      current.address = item.address_supermarket;
      current.phone = item.phon_number;
      current.open = item.open_today;
      current.distance = item.distance.toFixed(1);
      current.rating = item.rating.toFixed(2);
      current.totalScore = item.total_score.toFixed(2);
      current._id = current.id_supermarket;
      supers.push(current);
    });
    return { supers };
  }
}

export async function sendAllergies(allergies) {
  let response = await http.post(sendAllergiesEndpoint, allergies);
  if (response === "Error") return "Error";
  return getRecipes(response.data.results);
}

export async function sendCaloric(caloric) {
  let response = await http.post(sendAllergiesEndpoint, caloric);
  if (response === "Error") return "Error";
  return getRecipes(response.data.results);
}

export async function sendBoth(dataToSend) {
  let response = await http.post(sendAllergiesEndpoint, dataToSend);
  if (response === "Error") return "Error";
  return getRecipes(response.data.results);
}

export async function sendNut(dataToSend) {
  let response = await http.post(sendNutEndpoint, dataToSend);
  if (response === "Error") return "Error";
  return getRecipes(response.data.results);
}

export async function getWine(dataToSend) {
  let response = await http.post(wineEndpoint, dataToSend);
  console.log(response);
  if (response === "Error") return "Error";
  return response.data.results;
}
