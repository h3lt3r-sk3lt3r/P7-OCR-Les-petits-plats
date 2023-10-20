const searchBar = document.getElementById('search-bar');

function searchBarRecipes(data, recipes) {
  search = recipes.filter((recipe => {
    let matched = false;
    if (normalizer(recipe.name).includes(normalizer(data)) || normalizer(recipe.description).includes(normalizer(data))) {
      return true;
    }
    recipe.ingredients.forEach(({ ingredient }) => {
      if (normalizer(ingredient).includes(normalizer(data))) {
        matched = true;
      }
    });
    return matched;
  }
  ));
  return search;
}

function searchInputFromUtensils(inputValue, recipes) {
  return search = recipes.filter((recipe) => {
    return recipe.ustensils.includes(inputValue);
  })
}

function displaySearchInputFromUtensils(inputValue, recipes) {
  const search = searchInputFromUtensils(inputValue, recipes);
  search.length > 0 ? displayRecipes(search) : displayNoRecipes();
  displayDropdown(search);
}

function displaySearchInput(data, recipes) {
  const search = searchBarRecipes(data, recipes);
  search.length > 0 ? displayRecipes(search) : displayNoRecipes();
  displayDropdown(recipes);
}

searchBar.addEventListener('input', (e) => {
  const inputValue = normalizer(e.currentTarget.value);

  if (inputValue.length >= 3) {
    if (selectedTags.length <= 0) {
      displaySearchInput(inputValue, recipes);
    } else {
      const tagUtensils = document.querySelectorAll('.tag-utensil');
      if (tagUtensils.length > 0) {
        const utensilsTags = Array.from(tagUtensils, (tag) => tag.querySelector('span').textContent);
        selectedTags.forEach((tag, i) => {
          if (utensilsTags.includes(tag)) {
            if (i === 0) {
              displaySearchInputFromUtensils(tag, i === 0 ? recipes : search);
            } else {
              displaySearchInputFromUtensils(tag, search);
            }
          } else if (i === 0) {
            displaySearchInput(tag, recipes);
          } else {
            displaySearchInput(tag, search);
          }
        });
        displaySearchInput(inputValue, search);
      } else {
        selectedTags.forEach((tag, i) => {
          if (i === 0) {
            displaySearchInput(tag, recipes);
          } else {
            displaySearchInput(tag, search);
          }
        });
        displaySearchInput(inputValue, search);
      }
    }
  }
});

searchBar.addEventListener('keyup', (e) => {
  if (e.key == 'Backspace' || e.key == 'Delete') {
    const searchedResult = normalizer(e.currentTarget.value);

    if (searchedResult.length < 3) {
      resetSearchResults();
    }
  }
})

function resetSearchResults() {
  search = [];

  if (selectedTags.length <= 0) {
    displayRecipes(recipes);
    displayDropdown(recipes);
  } else {
    const tagUtensils = document.querySelectorAll('.tag-utensil');
    if (tagUtensils.length > 0) {
      const utensilsTags = Array.from(tagUtensils, (tag) => tag.querySelector('span').textContent);
      selectedTags.forEach((tag, i) => {
        if (utensilsTags.includes(tag)) {
          if (i === 0) {
            displaySearchInputFromUtensils(tag, i === 0 ? recipes : search);
          } else {
            displaySearchInputFromUtensils(tag, search);
          }
        } else if (i === 0) {
          displaySearchInput(tag, recipes);
        } else {
          displaySearchInput(tag, search);
        }
      });
    } else {
      selectedTags.forEach((tag, i) => {
        if (i === 0) {
          displaySearchInput(tag, recipes);
        } else {
          displaySearchInput(tag, search);
        }
      });
    }
  }
}

function normalizer(data) {
  data = data.trim()
  data = data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  data = data.replace(/[.,!;:?]/g, "");
  data = data.toLowerCase();
  return data
}
