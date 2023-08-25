const wrapperIngredients = document.querySelector('.wrapper-ingredients');
const wrapperDevices = document.querySelector('.wrapper-devices');
const wrapperUtensils = document.querySelector('.wrapper-utensils');
const dropdownIngredients = document.querySelector('.dropdown-ingredients');
const dropdownDevices = document.querySelector('.dropdown-devices');
const dropdownUtensils = document.querySelector('.dropdown-utensils');
const tags = document.querySelector('.tags');

function toggleDropdown(target) {
  // const filters = document.querySelectorAll('.search-dropdowns')
  const parent = target.parentNode;
  // const clickedFilter = parent.parentNode
  parent.classList.toggle('dropdown-global-open');
  // filters.forEach(filter => {
  //   if(filter != clickedFilter){
  //     filter.classList.toggle('dropdown-not-clicked');
  //     dropdown.style.display = 'none';
  //   }
  // })
  // clickedFilter.classList.toggle('dropdown-clicked');
}

function clickedDropdownItem(target) {
  const tag = document.createElement('div');
  const nameTag = document.createElement('span');
  const closeIcon = document.createElement('i');

  nameTag.textContent = target.textContent;
  closeIcon.classList.add('fa-sharp fa-regular fa-circle-xmark tag-close-icon')

  tag.classList.add('tag');
  tag.classList.add(tagType(target));

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
          toggleDropdown(event.target);
        })
      }
      if(child.tagName == 'ul'){
        child.addEventListener('click', (event) => {
          clickedDropdownItem(event.target);
        })
      }
    }
  }
}
addListener(wrapperIngredients);
addListener(wrapperDevices);
addListener(wrapperUtensils);

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

function displayIngredientsFilter(ingredients) {
  ingredients.forEach((ingredient) => {
    const ingredientModel = dropdownFactory(ingredient, "ingredient");
    const ingredientLi = ingredientModel.getDropdown();
    if (ingredientLi) {
      ingredientLi.dataset.type = 'ingredient';
      ingredientLi.addEventListener('click', (event) => {
        searchBarRecipes(event.target.textContent);
        toggleDropdown(dropdownIngredients);
      })
      dropdownIngredients.appendChild(ingredientLi);
    }
  })
}

function displayUtensilsFilter(utensils) {
  utensils.forEach((utensil) => {
    const utensilModel = dropdownFactory(utensil, "utensil");
    const utensilLi = utensilModel.getDropdown();
    if (utensilLi) {
      utensilLi.dataset.type = 'utensil';
      utensilLi.addEventListener('click', (event) => {
        searchBarRecipes(event.target.textContent);
        toggleDropdown(dropdownUtensils);
      })
      dropdownUtensils.appendChild(utensilLi);
    }
  })
}

function displayDevicesFilter(devices) {
  const deviceModel = dropdownFactory(devices, "device");
  const deviceLi = deviceModel.getDropdown();
  if (deviceLi) {
    deviceLi.dataset.type = 'device';
    deviceLi.addEventListener('click', (event) => {
      searchBarRecipes(event.target.textContent);
      toggleDropdown(dropdownDevices);
    })
    dropdownDevices.appendChild(deviceLi);
  }
}

function tagType(tag) {
  switch (item.dataset.type) {
    case 'ingredient':
      return 'tag-ingredient';
    case 'device':
      return 'tag-device';
    default:
      return 'tag utensil';
  }
}
