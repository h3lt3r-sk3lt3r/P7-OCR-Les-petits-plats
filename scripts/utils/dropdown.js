const tags = document.querySelector('.tags');

let selectedTags = [];

function toggleDropdown(target) {
  const filters = document.querySelectorAll('.search-dropdowns')
  const parent = target.parentNode;
  const clickedFilter = parent.parentNode
  parent.classList.toggle('dropdown-global-open');
  filters.forEach(filter => {
    if(filter != clickedFilter){
      filter.classList.toggle('dropdown-not-clicked');
    }
  })
  clickedFilter.classList.toggle('dropdown-clicked');
}

function clickedDropdownItem(target) {
  const tag = document.createElement('div');
  const nameTag = document.createElement('span');
  const closeIcon = document.createElement('i');

  nameTag.textContent = target.textContent;
  closeIcon.classList.add('fa-sharp');
  closeIcon.classList.add('fa-regular');
  closeIcon.classList.add('fa-circle-xmark');
  closeIcon.classList.add('tag-close-icon');

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
  console.log(node)
  if(node.hasChildNodes()) {
    for(const child of node.children){
      if(child.tagName != 'UL' && child.tagName != 'INPUT'){
        child.addEventListener('click', (event) => {
          toggleDropdown(event.target);
        })
      }
      if(child.tagName == 'UL'){
        child.addEventListener('click', (event) => {
          clickedDropdownItem(event.target);
        })
      }
    }
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

function tagType(tag) {
  switch (tag.dataset.type) {
    case 'ingredient':
      return 'tag-ingredient';
    case 'device':
      return 'tag-device';
    default:
      return 'tag-utensil';
  }
}

function searchDropdown(input, items) {
  const regex = new RegExp(input, "gmi");
  return items.filter((item) => regex.test(item))
}

function removeDropdownChildNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
