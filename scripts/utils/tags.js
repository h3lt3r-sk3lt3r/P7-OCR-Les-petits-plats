function closeTag(target) {
  const parent = target.parentNode;
  const removedTag = parent.querySelector('span').textContent;
  parent.style.display = 'none';

  removedSelectedTag(removedTag);
  getRecipeWithTags();
}

function removedSelectedTag(tag) {
  const index = selectedTags.indexOf(tag);
  if (index > -1) {
    selectedTags.splice(index, 1);
  }
}

function getRecipeWithTags() {
  const inputValue = document.querySelector('#search-bar').value;

  if (inputValue.length <= 2) {
    if (selectedTags.length > 0) {
      const tagUtensils = document.querySelectorAll('.tag-utensil');
      if (tagUtensils.length > 0) {
        let utensilsTags = Array.from(tagUtensils, (tag) => tag.querySelector('span').textContent);
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
    } else {
      search = [];
      displayDropdown(recipes);
      displayRecipes(recipes);
    }
  } else {
    if (selectedTags.length > 0) {
      const tagUtensils = document.querySelectorAll('.tag-utensil');
      if (tagUtensils.length > 0) {
        let utensilsTags = Array.from(tagUtensils, (tag) => tag.querySelector('span').textContent);
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
    } else {
      displaySearchInput(inputValue, recipes);
    }
  }
}
