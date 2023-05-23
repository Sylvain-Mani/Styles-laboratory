

// let tree2
// let startTime = (new Date()).getTime();
// let endTime
// fetch('./truc.php').then(function (response) {
//   if (response.ok) {
//     response.json().then(function (json) {
//       tree2 = json;
//       endTime = (new Date()).getTime();
//       let time = endTime - startTime;
//       console.log('fetch result : ' + time + ' ms')
//       console.log(tree2)
//     });
//   } else {
//     console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
//   }
// });


console.log(tree)

const baseUriHtml = './view/'
const baseUriCss = './css/'
const baseUriJS = 'js/'

let justRefreshed = true


const targetEl = document.querySelector('.target');
// const targetEl = document.querySelector('body');
// const targetEl = document.getElementsByTagName('main');


// * fonction pour charger le body du fichier html d'origine dans index.php
const loadHtml = file => {
  fetch(file).then(res => {
    if (res.ok) {
      return res.text();
    }
  })
    .then(result => {
      // * Nettoyer le résultat pour ne récupérer que le contenu de la balise body
      console.log(result)
      script = result.substring(result.indexOf('<script'), result.lastIndexOf('</script>')+9)
      console.log('script : ')
      console.log(script)
      // result = (result.substring(result.indexOf('<body>') + 6, result.indexOf('</body>'))).trim()
      result = (result.substring(result.indexOf('<div class="target">') + 20, result.lastIndexOf('</div>'))).trim()
      console.log('result 1 : ')
      console.log(result)
      // result += script
      result = result.replaceAll('../../', '')
      script = script.replaceAll('../../', '')
      console.log(result)
      targetEl.innerHTML = result;

      console.log('innerHTML body : ')
      console.log(document.querySelector('body').innerHTML)
      console.log('innerHTML body + result : ')
      console.log(document.querySelector('body').innerHTML + script)
      result2 = document.querySelector('body').innerHTML + script
      document.querySelector('body').innerHTML = result2

      //
      loadMenu(file)
      loadCss(file)
      //loadJs(file)
      justRefreshed = false

      // let w = window.open('view/Menu/menu2.html')
      // let scripts = w.document.querySelectorAll('script')
      // w.close()
    })
}




// * fonction pour importer le CSS du fichier html d'origine dans index.php
const loadCss = file => {
  let link = document.createElement('link')
  // link.type = 'text/css' // no need in HTML5
  link.rel = 'stylesheet'
  link.href = (file.replace(baseUriHtml, baseUriCss)).replace('.html', '.css')
  if (justRefreshed) {
    document.querySelector('head').insertAdjacentElement('beforeend', link)
    // document.querySelector('.target').insertAdjacentElement('afterbegin', link)
  } else {
    document.querySelector('head').replaceChild(link, document.querySelector('head').lastChild)
  }
}

// * fonction pour importer le JS du fichier html d'origine dans index.php
const loadJs = file => {
  let script = document.createElement('script')
  // link.src = `./css/bloc/${file}.css`
  script.setAttribute('src', (file.replace(baseUriHtml, baseUriJS)).replace('.html', '.js'))
  if (justRefreshed) {
    document.querySelector('body').insertAdjacentElement('beforeend', script)
    // document.querySelector('.target').insertAdjacentElement('beforeend', script)
  } else {
    document.querySelector('body').replaceChild(script, document.querySelector('body').lastChild)
  }
}


create_navbar()

function create_navbar() {

  // * Création de la balise <nav>
  // document.querySelector('body').appendChild(document.createElement('nav'))
  document.querySelector('body').insertAdjacentElement('afterbegin', document.createElement('nav'))

  let navbar = document.querySelector('nav')
  // let navbar = document.getElementsByTagName('nav')
  // console.log(navbar)

  // * Peuplement des dossiers de la navbar
  tree.forEach(dir => {
    // console.log(dir)
    let ul = document.createElement('ul')
    ul.textContent = dir['dirname']
    //console.log(ul)

    // let a = document.createElement('a')
    // a.textContent = dir['dirname']
    // ul.appendChild(a)

    navbar.appendChild(ul)

    // * Peuplement des fichiers dans la navbar
    dir['content'].forEach(file => {
      let li = document.createElement('li')
      // li.textContent = file['filename']
      // li.style.opacity = 0

      let a = document.createElement('a')
      a.textContent = file['title']
      // a.target = "_blank"
      //console.log(dir['dirname'])
      // a.href = baseUriHtml + file['path'] + '/' + file['filename']
      let t = baseUriHtml + dir['dirname'] + '/' + file['filename']
      // a.href = baseUriHtml + dir['dirname'] + '/' + file['filename']
      // a.href = "#"
      // a.href = `loadHtml(${t})`
      // a.onclick = loadHtml(a.href)
      // a.setAttribute("onclick", `loadHtml(${t})`)

      li.appendChild(a)
      // li.setAttribute("onclick", `loadHtml(${t})`)
      li.setAttribute('id', dir['dirname'] + '/' + file['filename'])

      ul.appendChild(li)
    })
    // for (let file of dir['content']) {
    //   let li = document.createElement('li')
    //   li.textContent = file['title']
    //   ul.appendChild(li)
    // }
  });
}


let tr = document.querySelectorAll('a');
// console.log(sidebarBtn);
tr.forEach(el => {
  el.addEventListener("click", () => {
    // console.log('a clicked');
    // console.log(el.href)
    // console.log(tree)
  });

});
let trr = document.querySelectorAll('li');
// console.log(sidebarBtn);
trr.forEach(el => {
  el.addEventListener("click", () => {
    // console.log('li clicked');
    // console.log(baseUriHtml + el.id)
    // loadHtml(baseUriHtml + el.id)
    // window.open(baseUriHtml + el.id, '_blank');
    document.querySelector('iframe').src = baseUriHtml + el.id
    loadMenu(baseUriHtml + el.id)
  });

});
