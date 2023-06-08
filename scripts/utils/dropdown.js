function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown-menu');
  const input = document.querySelector('.search-input');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  input.style.display = input.style.display === 'block' ? 'none' : 'block';
}
