const data = {
    by: 'École du Web',
    video: 'https://www.youtube.com/watch?v=-Qx-iHkeeD8',
    code: 'https://codepen.io/Ziratsu/pen/eYpzdEQ'
}


const containerMenu = document.querySelector('.container-menu');
const btnMenu = document.querySelector('.btn-menu');

btnMenu.addEventListener('click', () => {

    containerMenu.classList.toggle('active')

})