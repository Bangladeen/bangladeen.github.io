const menu_bar = document.querySelector('.menu-bar')
      menu_items = document.querySelector('.menu-items');

menu_bar.addEventListener('click', () => {
    menu_bar.classList.toggle('active');
    menu_items.classList.toggle('active');
});
