let data

const creator = {
  'École du Web': {
    yt: 'https://www.youtube.com/@EcoleduWeb',
    site: 'https://www.ecole-du-web.net'
  },
  'Online Tutorials': {
    yt: 'https://www.youtube.com/@OnlineTutorialsYT',
    site: ''
  },
  'Codehal': {
    yt: 'https://www.youtube.com/@codehal',
    site: 'https://codehalweb.com/'
  },
  'CodingLab': {
    yt: 'https://www.youtube.com/@CodingLabYT',
    site: 'https://www.codingnepalweb.com/'
  },
}


// * 
const loadMenu = file => {
  // console.log(file)
  // console.log(file.substring(file.lastIndexOf('/')+1, file.length))

  let div = document.createElement('div')
  div.className = "my-menu"

  let span = document.createElement('span')
  span.textContent = file.substring(file.lastIndexOf('/') + 1, file.length)

  let a = document.createElement('a')
  a.textContent = 'ouvrir'
  a.href = file
  a.target = "_blank"

  //console.log(a)

  let button = document.createElement('button')
  button.textContent = 'ouvrir'

  div.append(span)
  div.appendChild(a)
  div.appendChild(button)

  // document.querySelector('.target').insertAdjacentElement('afterbegin', div)

  if (justRefreshed) {
    targetEl.insertAdjacentElement('afterbegin', div)
    // document.querySelector('.target').insertAdjacentElement('afterbegin', link)
    justRefreshed = false
  } else {
    targetEl.replaceChild(div, targetEl.querySelector('.my-menu'))
  }


  // targetEl.appendChild(button)
  // targetEl.appendChild(a)



}
