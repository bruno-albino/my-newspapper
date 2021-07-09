import * as constants from '../../configs/constants.js'
import newsService from '../../services/news.js'
import utils from '../../utils.js'

const init = async () => {
  const news = await newsService.getAllByType(constants.POLITICS)
  const mainElement = document.getElementById(constants.POLITICS)

  for(const politicsNews of news) {
    const article = utils.appendNews(politicsNews)
    mainElement.append(article)
  }
}

init()
.then(utils.removeLoader)
.catch(utils.removeLoader)
