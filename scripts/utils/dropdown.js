const wrapperIngredients = document.querySelector('.wrapper-ingredients');
const wrapperDevices = document.querySelector('.wrapper-devices');
const wrapperUtensils = document.querySelector('.wrapper-utensils');
const dropdownIngredients = document.querySelector('.dropdown-ingredients');
const dropdownDevices = document.querySelector('.dropdown-devices');
const dropdownUtensils = document.querySelector('.dropdown-utensils');

function openDropdown(e) {
  const parent = e.target.parentNode;
  parent.classList.toggle('dropdown-global-open');
}

wrapperIngredients.addEventListener('click', (e) =>{
  openDropdown(e);
});

wrapperDevices.addEventListener('click', (e) => {
  openDropdown(e);
});

wrapperUtensils.addEventListener('click', (e) => {
  openDropdown(e);
});

function displayIngredientsFilter(ingredients) {
  ingredients.forEach((ingredient) => {
    const ingredientModel = dropdownFactory(ingredient, "ingredient");
    const ingredientLi = ingredientModel.getDropdown();
    if (ingredientLi) {
      dropdownIngredients.appendChild(ingredientLi);
    }
  })
}

function displayUtensilsFilter(utensils) {
  utensils.forEach((utensil) => {
    const utensilModel = dropdownFactory(utensil, "utensil");
    const utensilLi = utensilModel.getDropdown();
    if (utensilLi) {
      dropdownUtensils.appendChild(utensilLi);
    }
  })
}

function displayDevicesFilter(devices) {
  const deviceModel = dropdownFactory(devices, "device");
  const deviceLi = deviceModel.getDropdown();
  if (deviceLi) {
    dropdownDevices.appendChild(deviceLi);
  }
}

function displayDropdown(recipes) {
  dropdownIngredients.innerHTML = '';
  dropdownDevices.innerHTML = '';
  dropdownUtensils.innerHTML = '';
  recipes.forEach((recipe) => {
    const ingredients = recipe.ingredients;
    const devices = recipe.applicance;
    const utensils = recipe.ustensils;
    displayIngredientsFilter(ingredients);
    displayDevicesFilter(devices);
    displayUtensilsFilter(utensils);
  })
}
