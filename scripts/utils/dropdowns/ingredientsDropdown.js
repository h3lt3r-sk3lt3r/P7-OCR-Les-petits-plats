const wrapperIngredients = document.querySelector('.wrapper-ingredients');
const dropdownIngredients = document.querySelector('.dropdown-ingredients');
const inputIngredient = wrapperIngredients.querySelector('.dropdown-input');

let filterIngredients = [];

function displayIngredientsFilter(ingredients) {
  const filteredIngredients = ingredients.filter(ingredient => !selectedTags.includes(ingredient.ingredient))
  filteredIngredients.forEach((ingredient) => {
    const ingredientModel = dropdownFactory(ingredient, "ingredient");
    const ingredientLi = ingredientModel.getDropdown();
    if (ingredientLi) {
      ingredientLi.dataset.type = 'ingredient';
      // if (selectedTags.includes(ingredient.ingredient)) {
      //   ingredientLi.classList.add('dropdown-added-tag')
      // }
      ingredientLi.addEventListener('click', (event) => {
        selectedTags.push(event.target.textContent);
        displaySearchInput(event.target.textContent, search.length > 0 ? search : recipes, 'ingredient');
        toggleDropdown(dropdownIngredients);
      })
      dropdownIngredients.appendChild(ingredientLi);
    }
  })
}

function displayInputIngredient(input, ingredients) {
  const filteredIngredients = searchDropdown(input, ingredients);
  if (filteredIngredients.length > 0) {
    removeDropdownChildNode(dropdownIngredients);
    displayIngredientsFilter(filteredIngredients);
  } else {
    console.log("Aucun ingrédients")
  }
}

inputIngredient.addEventListener("input", (event) => {
  if (event.currentTarget.value.length > 0) {
    displayInputIngredient(event.target.value, filterIngredients);
  }
});

inputIngredient.addEventListener("keyup", (event) => {
  if (event.key == "Backspace" || event.key == "Delete") {
    const searchedItem = event.currentTarget.value.trim().toLowerCase();
    if (searchedItem.length < 0) {
      filterIngredients = [];
      removeDropdownChildNode(dropdownIngredients);
      recipes.forEach((recipe) => {
        displayIngredientsFilter(recipe.ingredients);
      });
    }
  }
});
