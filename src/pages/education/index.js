import * as constants from '../../configs/constants.js'
import utils from '../../utils.js'

const init = async () => {
  const news = await utils.getNewsByType(constants.EDUCATION)
  console.log(news)
  // const response = await getJsonFile()
  // const mainElement = document.getElementById('education')
  // const news = JSON.parse(response).news['education']
  // for(const educationNews of news) {
  //   console.log(educationNews)
  //   const divElement = document.createElement('div')
  //   divElement.className = 'teste'
  //   divElement.innerHTML = educationNews.title
  //   mainElement.appendChild(divElement)
  // }
}

init()

