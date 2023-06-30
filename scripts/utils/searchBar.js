// import recipes from '../../data/recipes.json'
// console.log(recipes);
// const searchBar = document.getElementById('search-bar');



// searchBar.addEventListener('input', (e) => {
//   if (e.currentTarget.value.length >= 3) {
//     const searchedResult = e.currentTarget.value.trim().toLowerCase();
//     searchBarRecipes(searchedResult);
//   }
// })

// function searchBarRecipes(data) {
//   search = recipes.filter((recipe => {
//     let matched = false;
//     if (recipe.name.toLowerCase().trim().includes(data.toLowerCase().trim())) {
//       return true;
//     } else if (recipe.description.toLowerCase().trim().includes(data.toLowerCase().trim())) {
//       return true
//     }
//     recipe.ingredients.forEach(({ingredient}) => {
//       if(ingredient.toLowerCase().trim().includes(data.toLowerCase().trim())) {
//         matched = true;
//       }
//     });
//     return matched;
//   }
//   ));
//   search.length > 0 ? displayRecipes(search) : null;
// }
