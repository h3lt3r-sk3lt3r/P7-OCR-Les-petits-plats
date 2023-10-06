function dropdownFactory(data, datatype) {
  let value = '';
  const dropdownIngredients = document.querySelector('.dropdown-ingredients');
  const dropdownDevices = document.querySelector('.dropdown-devices');
  const dropdownUtensils = document.querySelector('.dropdown-utensils');
  let list = '';
  switch (datatype) {
    case "ingredient":
      list = dropdownIngredients.querySelectorAll('li');
      value = data.ingredient ? data.ingredient : data;
      if(isAlreadyPresentInArray(value, filterIngredients).length <= 0){
        filterIngredients.push(value);
      }
      break;
    case "device":
      list = dropdownDevices.querySelectorAll('li');
      value = data;
      if (isAlreadyPresentInArray(value, filterDevices).length <= 0) {
        filterDevices.push(value);
      }
      break;
    case "utensil":
      list = dropdownUtensils.querySelectorAll('li');
      value = data;
      if (isAlreadyPresentInArray(value, filterUtensils).length <= 0) {
        filterUtensils.push(value);
      }
      break;
    default:
      break;
  }

  function getDropdown() {
    if(isAlreadyPresentInList(value).length <= 0){
      const list = document.createElement('li');
      list.textContent = value;
      return list;
    }
  }

  function isAlreadyPresentInList(value) {
    dropdownList = Array.from(list);

    const reg = new RegExp(`${value}`, "i");
    existingList = dropdownList.filter((item) => {
      if (reg.test(item.textContent)) {
        return true;
      }
      return false;
    });
    return existingList;
  }

  function isAlreadyPresentInArray(value, array) {
    const reg = new RegExp(`${value}`, "i");
    existingArray = array.filter((item) => {
      return reg.test(item);
    });
    return existingArray;
  }

  return { getDropdown };
}
