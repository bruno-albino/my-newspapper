import * as constants from '../../configs/constants.js'
import newsService from '../../services/news.js'
import utils from '../../utils.js'

const init = async () => {
  const news = await newsService.getAllByType(constants.EDUCATION)
  const mainElement = document.getElementById(constants.EDUCATION)

  for(const educationNews of news) {
    const article = utils.appendNews(educationNews)
    mainElement.append(article)
  }
}

init()
.then(utils.removeLoader)
.catch(utils.removeLoader)
