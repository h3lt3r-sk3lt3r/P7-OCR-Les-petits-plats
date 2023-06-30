const recipeDisplay = document.querySelector('.recipes');

let recipes = [];

async function getRecipes() {
  try {
    const res = await fetch('data/recipes.json')
    const data = await res.json();
    return { recipes: data.recipes };
  } catch (err) {
    console.log('Erreur : ' + err);
    return { recipes: [] };
  }
}

 async function displayRecipes (recipes) {
  recipes.forEach((recipe) => {
    const recipeTemplate = recipeFactory(recipe);
    const recipeCard = recipeTemplate.getRecipeCard();
    recipeDisplay.appendChild(recipeCard);
  })
}

async function init() {
  recipes = (await getRecipes()).recipes;
  displayRecipes(recipes);
}
init();

const searchBar = document.getElementById('search-bar');



searchBar.addEventListener('input', (e) => {
  if (e.currentTarget.value.length >= 3) {
    const searchedResult = e.currentTarget.value.trim().toLowerCase();
    searchBarRecipes(searchedResult);
  }
})

function searchBarRecipes(data) {
  search = recipes.filter((recipe => {
    let matched = false;
    if (recipe.name.toLowerCase().trim().includes(data.toLowerCase().trim())) {
      return true;
    } else if (recipe.description.toLowerCase().trim().includes(data.toLowerCase().trim())) {
      return true
    }
    recipe.ingredients.forEach(({ ingredient }) => {
      if (ingredient.toLowerCase().trim().includes(data.toLowerCase().trim())) {
        matched = true;
      }
    });
    return matched;
  }
  ));
  console.log(search);
  search.length > 0 ? displayRecipes(search) : null;
}
