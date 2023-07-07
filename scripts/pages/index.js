const recipeDisplay = document.querySelector('.recipes');
const noRecipe = document.querySelector('.recipes-error')

let recipes = [];

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
  /** removeChild */
  //  let d = document.getElementsByTagName("main");
  //  let d_nested = document.getElementById("recipes");
  //  d.removeChild(d_nested);
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
  noRecipe.innerHTML = '<h2>Aucune recette trouvée</h2>'
}

async function init() {
  recipes = await getRecipes();
  displayRecipes(recipes);
}
init();

// const searchBar = document.getElementById('search-bar');

// searchBar.addEventListener('input', (e) => {
//   if (e.currentTarget.value.length >= 3) {
//     const searchedResult = e.currentTarget.value.trim().toLowerCase();
//     let filterSearch = searchBarRecipes(searchedResult);
//     displayRecipes(filterSearch);
//   }
// })

// function searchBarRecipes(data) {
//   search = recipes.filter((recipe => {
//     let matched = false;
//     if (recipe.name.toLowerCase().trim().includes(data.toLowerCase().trim())) {
//       return true;
//     } else if (recipe.description.toLowerCase().trim().includes(data.toLowerCase().trim())) {
//       return true
//     }
//     recipe.ingredients.forEach(({ ingredient }) => {
//       if (ingredient.toLowerCase().trim().includes(data.toLowerCase().trim())) {
//         matched = true;
//       }
//     });
//     return matched;
//   }
//   ));
//   console.log(search);
//   search.length > 0 ? displayRecipes(search) /** return search */ : null;
// }
