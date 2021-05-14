const getJsonFile = () => {
  const http = new XMLHttpRequest();
  http.overrideMimeType('application/json')
  http.open('GET', '../../configs/news.json', true)
  http.send()

  return new Promise(resolve => {
    http.onreadystatechange = () => {
      if(http.readyState === 4 && http.status == '200') {
        resolve(http.responseText)
      }
    }
  })
}

const init = async () => {
  const response = await getJsonFile()
  const mainElement = document.getElementById('education')
  const news = JSON.parse(response).news['education']
  for(const educationNews of news) {
    console.log(educationNews)
    const divElement = document.createElement('div')
    divElement.className = 'teste'
    divElement.innerHTML = educationNews.title
    mainElement.appendChild(divElement)
  }
}

init()

