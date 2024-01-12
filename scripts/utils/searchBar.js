const searchBar = document.getElementById('search-bar');

// function searchBarRecipes(data, recipes) {
//   search = recipes.filter((recipe => {
//     let matched = false;
//     if (normalizer(recipe.name).includes(normalizer(data)) || normalizer(recipe.description).includes(normalizer(data)) || normalizer(recipe.appliance).includes(normalizer(data))) {
//       return true;
//     }
//     recipe.ingredients.forEach(({ ingredient }) => {
//       if (normalizer(ingredient).includes(normalizer(data))) {
//         matched = true;
//       }
//     });
//     recipe.ustensils.forEach((utensil) => {
//       if (normalizer(utensil).includes(normalizer(data))) {
//         matched = true;
//       }
//     })
//     return matched;
//   }
//   ));
//   return search;
// }

function searchBarRecipes(data, recipes) {
  const search = [];

  for (const recipe of recipes) {
    let matched = false;

    if (
      normalizer(recipe.name).includes(normalizer(data)) ||
      normalizer(recipe.description).includes(normalizer(data)) ||
      normalizer(recipe.appliance).includes(normalizer(data))
    ) {
      matched = true;
    }

    for (const { ingredient } of recipe.ingredients) {
      if (normalizer(ingredient).includes(normalizer(data))) {
        matched = true;
      }
    }

    for (const utensil of recipe.ustensils) {
      if (normalizer(utensil).includes(normalizer(data))) {
        matched = true;
      }
    }

    if (matched) {
      search.push(recipe);
    }
  }

  return search;
}

function searchInputFrom(inputValue, recipes, inputType) {
  if (inputType === 'ingredient') {
    return search = recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map(item => item.ingredient)
      return ingredients.includes(inputValue);
    })
  } else if (inputType === 'device') {
    return search = recipes.filter((recipe) => {
      return recipe.appliance.includes(inputValue);
    })
  } else if (inputType === 'utensil') {
    return search = recipes.filter((recipe) => {
      return recipe.ustensils.includes(inputValue);
    })
  }
}

function displaySearchInput(data, recipes, inputType = null) {
  if (inputType === null) {
    const search = searchBarRecipes(data, recipes);
    search.length > 0 ? displayRecipes(search) : displayNoRecipes();
    displayDropdown(recipes);
  } else {
    const search = searchInputFrom(data, recipes, inputType)
    search.length > 0 ? displayRecipes(search) : displayNoRecipes();
    displayDropdown(search);
  }
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
              // displaySearchInputFromUtensils(tag, i === 0 ? recipes : search);
              displaySearchInput(tag, i === 0 ? recipes : search, 'utensil');
            } else {
              // displaySearchInputFromUtensils(tag, search);
              displaySearchInput(tag, search, 'utensil');
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
            // displaySearchInputFromUtensils(tag, i === 0 ? recipes : search);
            displaySearchInput(tag, i === 0 ? recipes : search, 'utensil');
          } else {
            // displaySearchInputFromUtensils(tag, search);
            displaySearchInput(tag, search, 'utensil');
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
