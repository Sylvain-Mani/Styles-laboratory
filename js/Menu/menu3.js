const data = {
  by: 'Codehal',
  video: 'https://www.youtube.com/watch?v=Q6YUEqnOgIg',
  code: 'https://codehalweb.com/magic-navigation-menu-indicator/'
}


const list = document.querySelectorAll('.list');

function activeLink() {
  list.forEach((item) =>
    item.classList.remove('active'));
  this.classList.add('active');
}

list.forEach((item) =>
  item.addEventListener('click', activeLink));