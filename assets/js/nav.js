const menu_bar = document.querySelector('.menu-bar')
      menu_items = document.querySelector('.menu-items');

menu_bar.addEventListener('click', () => {
    menu_bar.classList.toggle('active');
    menu_items.classList.toggle('active');
});

// When fully load the page\
window.addEventListener('load', () => {
    document.querySelector("#main").style.background = "url('/assets/images/islamic-background-2.png')";
});
