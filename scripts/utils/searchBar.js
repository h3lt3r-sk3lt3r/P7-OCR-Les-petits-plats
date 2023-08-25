const searchBar = document.getElementById('search-bar');

function searchBarRecipes(data, recipes) {
  search = recipes.filter((recipe => {
    let matched = false;
    if (recipe.name.toLowerCase().trim().includes(data.toLowerCase().trim())) {
      return true;
    } else if (recipe.description.toLowerCase().trim().includes(data.toLowerCase().trim())) {
      return true
    }
    recipe.ingredients.forEach(({ingredient}) => {
      if(ingredient.toLowerCase().trim().includes(data.toLowerCase().trim())) {
        matched = true;
      }
    });
    return matched;
  }
  ));
  return search;
}

function displaySearchBar(data, recipes) {
  const search = searchBarRecipes(data, recipes);
  search.length > 0 ? displayRecipes(search) : displayNoRecipes();
  displayDropdown(recipes);
}

searchBar.addEventListener('input', (e) => {
  if (e.currentTarget.value.length >= 3) {
    const searchedResult = e.currentTarget.value.trim().toLowerCase();
    displaySearchBar(searchedResult, recipes);
  }
})

searchBar.addEventListener('keyup', (e) => {
  if(e.key == 'Backspace' || e.key == 'Delete') {
    const searchedResult = e.currentTarget.value.trim().toLowerCase();
    if (searchedResult.length < 3) {
      search = [];
      displayRecipes(recipes);
      displayDropdown(recipes);
    }
  }
})
