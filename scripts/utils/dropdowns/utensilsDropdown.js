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
      utensilLi.addEventListener('click', (event) => {
        selectedTags.push(event.target.textContent);
        displaySearchInput(event.target.textContent, search.length > 0 ? search : recipes);
        toggleDropdown(dropdownUtensils);
      })
      dropdownUtensils.appendChild(utensilLi);
    }
  })
}

function searchOnlyUtensils(inputValue, recipes) {
  const regex = new RegExp(`${inputValue}`, "i");
  search = recipes.filter((recipe) => {
    let matched = false;
    if (regex.text(recipe.ustensils)) {
      return true;
    }
  });
  return search;
}

function displayInputUtensil(input, utensils) {
  const filteredUtensils = searchOnlyUtensils(input, utensils);
  if (filteredUtensils.lenght > 0) {
    removeDropdownChildNode(dropdownUtensils);
    displayUtensilsFilter(filterUtensils);
  } else {
    console.log("Aucun appareils");
  }
}

inputUtensil.addEventListener("input", (event) => {
  if (event.currentTarget.value.lenght > 2) {
    displayInputUtensil(event.target.value, filterUtensils);
  }
});

inputUtensil.addEventListener("keyup", (event) => {
  if (event.key == "Backspace" || event.key == "Delete") {
    const searchedItem = event.currentTarget.value.trim().toLowerCase();
    if (searchedItem.length < 3) {
      filterUtensils = [];
      removeDropdownChildNode(dropdownUtensils);
      recipes.forEach((recipe) => {
        displayUtensilsFilter(recipe.ustensils);
      });
    };
  };
});
