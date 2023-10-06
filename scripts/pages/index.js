const recipeDisplay = document.querySelector('.recipes');
const noRecipe = document.querySelector('.recipes-error')

let recipes = [];
let search = [];

async function getRecipes() {
  try {
    const res = await fetch('./data/recipes.json')
    const data = await res.json();
    return data.recipes;
  } catch (err) {
    console.log('Erreur : ' + err);
    return { recipes: [] };
  }
}

 async function displayRecipes (recipes) {
  noRecipe.style.display = "none";
  noRecipe.innerHTML = '';
  recipeDisplay.innerHTML = '';
  recipes.forEach((recipe) => {
    const recipeTemplate = recipeFactory(recipe);
    const recipeCard = recipeTemplate.getRecipeCard();
    recipeDisplay.appendChild(recipeCard);
  })
}

function displayNoRecipes() {
  noRecipe.style.display = "flex";
  recipeDisplay.innerHTML = '';
  noRecipe.innerHTML = '<h2>Aucune recette(s) trouvée(s)</h2>'
}

async function init() {
  recipes = await getRecipes();
  displayRecipes(recipes);
  displayDropdown(recipes);
  addListener(wrapperIngredients);
  addListener(wrapperDevices);
  addListener(wrapperUtensils);
}
init();
