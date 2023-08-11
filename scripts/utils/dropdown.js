const wrapperIngredients = document.querySelector('.wrapper-ingredients');
const wrapperDevices = document.querySelector('.wrapper-devices');
const wrapperUtensils = document.querySelector('.wrapper-utensils');
const dropdownIngredients = document.querySelector('.dropdown-ingredients');
const dropdownDevices = document.querySelector('.dropdown-devices');
const dropdownUtensils = document.querySelector('.dropdown-utensils');
const tags = document.querySelector('.tags');

function toggleDropdown(e) {
  const filters = document.querySelectorAll('.search-dropdowns')
  const parent = e.target.parentNode;
  const clickedFilter = parent.parentNode
  const dropdown = document.querySelector('.dropdown-menu')
  parent.classList.toggle('dropdown-global-open');
  filters.forEach(filter => {
    if(filter != clickedFilter){
      filter.classList.toggle('dropdown-not-clicked');
    }
  })
  clickedFilter.classList.toggle('dropdown-clicked');
  dropdown.style.display = 'block'
}

function clickedDropdownItem(event) {
  const tag = document.createElement('div');
  const nameTag = document.createElement('span');
  const closeIcon = document.createElement('i');

  nameTag.textContent = event.target.textContent;
  closeIcon.classList.add('fa-sharp fa-regular fa-circle-xmark tag-close-icon')

  tag.classList.add('tag');
  tag.classList.add('tag-ingredient');

  tag.appendChild(nameTag);
  tag.appendChild(closeIcon);

  tags.appendChild(tag);
  tags.style.display = 'flex';
  closeIcon.addEventListener('click', (event) => {
    closeTag(event.target);
  })
}

function addListener(node) {
  if(node.hasChildNodes()) {
    for(const child of node.children){
      if(child.tagName != 'ul' && child.tagName != 'input'){
        child.addEventListener('click', (event) => {
          toggleDropdown(event);
        })
      }
      if(child.tagName == 'ul'){
        child.addEventListener('click', (event) => {
          clickedDropdownItem(event);
        })
      }
    }
  }
}
addListener(wrapperIngredients);
addListener(wrapperDevices);
addListener(wrapperUtensils);

// wrapperIngredients.addEventListener('click', (e) =>{
//   openDropdown(e);
// });

// wrapperDevices.addEventListener('click', (e) => {
//   openDropdown(e);
// });

// wrapperUtensils.addEventListener('click', (e) => {
//   openDropdown(e);
// });

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
    const devices = recipe.appliance;
    const utensils = recipe.ustensils;
    displayIngredientsFilter(ingredients);
    displayDevicesFilter(devices);
    displayUtensilsFilter(utensils);
  })
}
