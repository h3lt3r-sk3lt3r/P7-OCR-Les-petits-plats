function recipeFactory(data) {
  const { id, name, serving, ingredients, time, description, appliance, ustensils } = data;

  function getRecipeCard() {
    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const cardTitleRecipe = document.createElement('h2');
    cardTitleRecipe.classList.add('card-title-recipe');
    cardTitleRecipe.textContent = `${name}`;

    const cardTimeIcon = document.createElement('i');
    const iconClass = ['fa-sharp', 'fa-regular', 'fa-clock'];
    cardTimeIcon.classList.add(...iconClass);

    const cardTimeData = document.createElement('p');
    cardTimeData.textContent = `${time} min`;

    const cardTime = document.createElement('div');
    cardTime.classList.add('card-time');
    cardTime.appendChild(cardTimeIcon);
    cardTime.appendChild(cardTimeData);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.appendChild(cardTitleRecipe);
    cardTitle.appendChild(cardTime);

    const cardDescriptionText = document.createElement('p');
    cardDescriptionText.textContent = `${description}`;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card-description');
    cardDescription.appendChild(cardDescriptionText);

    const cardIngredients = document.createElement('div');
    cardIngredients.classList.add('card-ingredients');
    cardIngredients.appendChild(getIngredients(ingredients));
    cardIngredients.appendChild(cardDescription);

    const cardInstructions = document.createElement('div');
    cardInstructions.classList.add('card-instructions');
    cardInstructions.appendChild(cardTitle);
    cardInstructions.appendChild(cardIngredients);

    const card = document.createElement('article');
    card.classList.add('card-recipe');
    card.dataset.ustensils = `${ustensils}`;
    card.appendChild(cardImage);
    card.appendChild(cardInstructions);

    return card;
  }

  function getIngredients(ingredients) {
    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('card-ingredients-list');
    ingredients.forEach(ingredient => {
      if(!ingredient.quantity){
        ingredientsList.innerHTML += `<li><b>${ingredient.ingredient}</b></li>`;
      } else if(ingredient.hasOwnProperty('unit')) {
        ingredientsList.innerHTML += `<li><b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit.slice(0, 9)}</li>`;
      } else {
        ingredientsList.innerHTML += `<li><b>${ingredient.ingredient}:</b> ${ingredient.quantity}</li>`;
      }
    });
    return ingredientsList;
  }
  return { getRecipeCard };
}
