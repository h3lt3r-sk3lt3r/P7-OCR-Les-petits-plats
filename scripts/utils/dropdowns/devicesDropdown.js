const wrapperDevices = document.querySelector('.wrapper-devices');
const dropdownDevices = document.querySelector('.dropdown-devices');
const inputDevice = wrapperDevices.querySelector('.dropdown-input');

let filterDevices = [];

function displayDevicesFilter(devices) {
  const filteredDevices = devices.filter(device => !selectedTags.includes(device))
  filteredDevices.forEach((device) => {
    const deviceModel = dropdownFactory(device, "device");
    const deviceLi = deviceModel.getDropdown();
    if (deviceLi) {
      deviceLi.dataset.type = 'device';
      deviceLi.addEventListener('click', (event) => {
        selectedTags.push(event.target.textContent);
        displaySearchInput(event.target.textContent, search.length > 0 ? search : recipes, 'device');
        toggleDropdown(dropdownDevices);
      })
      dropdownDevices.appendChild(deviceLi);
    }
  })
}

function displayInputDevice(input, devices) {
  const filteredDevices = searchDropdown(input, devices);
  if (filteredDevices.length >= 0) {
    removeDropdownChildNode(dropdownDevices);
    displayDevicesFilter(filteredDevices);
  } else {
    console.log("Aucun appareils")
  }
}

inputDevice.addEventListener("input", (event) => {
  if (event.currentTarget.value.length > 0) {
    displayInputDevice(event.target.value, filterDevices);
  }
});

inputDevice.addEventListener("keyup", (event) => {
  if (event.key == "Backspace" || event.key == "Delete") {
    const searchedItem = event.currentTarget.value.trim().toLowerCase();
    if (searchedItem.length < 0) {
      filterDevices = [];
      removeDropdownChildNode(dropdownDevices);
      recipes.forEach((recipe) => {
        displayDevicesFilter([recipe.appliance]);
      });
    }
  }
});
