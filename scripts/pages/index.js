const recipeDisplay = document.querySelector('.recipes');

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
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
}
init();
