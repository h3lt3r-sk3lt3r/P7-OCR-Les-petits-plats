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
  search = recipes;
  if (selectedTags.length == 0) {
    displayDropdown(recipes);
    displayRecipes(recipes);
  }
  selectedTags.forEach(tag => {
    searchBarRecipes(tag, search)
  })
}
