import * as constants from '../../configs/constants.js'
import newsService from '../../services/news.js'
import utils from '../../utils.js'

const init = async () => {
  const news = await newsService.getAllByType(constants.HEALTH)
  const mainElement = document.getElementById(constants.HEALTH)

  for(const healthNews of news) {
    const article = utils.appendNews(healthNews)
    mainElement.append(article)
  }
}

init()
.then(utils.removeLoader)
.catch(utils.removeLoader)
