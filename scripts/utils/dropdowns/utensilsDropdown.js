const wrapperUtensils = document.querySelector('.wrapper-utensils');
const dropdownUtensils = document.querySelector('.dropdown-utensils')
const inputUtensil = wrapperUtensils.querySelector('.dropdown-input');

let filterUtensils = [];

function displayUtensilsFilter(utensils) {
  utensils.forEach((utensil) => {
    const utensilModel = dropdownFactory(utensil, "utensil");
    const utensilLi = utensilModel.getDropdown();
    if (utensilLi) {
      utensilLi.dataset.type = 'utensil';
      if (selectedTags.includes(utensil)) {
        utensilLi.classList.add('dropdown-added-tag');
      }
      utensilLi.addEventListener('click', (event) => {
        selectedTags.push(event.target.textContent);
        // displaySearchInputFromUtensils(event.target.textContent, search.length > 0 ? search : recipes);
        displaySearchInput(event.target.textContent, search.length > 0 ? search : recipes, 'utensil');
        toggleDropdown(dropdownUtensils);
      })
      dropdownUtensils.appendChild(utensilLi);
    }
  })
}

function displayInputUtensil(input, utensils) {
  const filteredUtensils = searchDropdown(input, utensils);
  if (filteredUtensils.length > 0) {
    removeDropdownChildNode(dropdownUtensils);
    displayUtensilsFilter(filteredUtensils);
  } else {
    console.log("Aucun ustensiles");
  }
}

inputUtensil.addEventListener("input", (event) => {
  if (event.currentTarget.value.length > 0) {
    displayInputUtensil(event.target.value, filterUtensils);
  }
});

inputUtensil.addEventListener("keyup", (event) => {
  if (event.key == "Backspace" || event.key == "Delete") {
    const searchedItem = event.currentTarget.value.trim().toLowerCase();
    if (searchedItem.length <= 0) {
      filterUtensils = [];
      removeDropdownChildNode(dropdownUtensils);
      recipes.forEach((recipe) => {
        displayUtensilsFilter(recipe.ustensils);
      });
    };
  };
});
