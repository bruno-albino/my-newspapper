import utils from '../../utils.js';
import newsService  from '../../services/news.js'

const TOTAL_RANDOM_PAGES = 6

const init = async () => {
  let allNews = await newsService.getAll()

  const newsToAppend = []
  for(let i = 0; i < TOTAL_RANDOM_PAGES; i++) {
    const randomNews = getRandomItem(allNews)
    newsToAppend.push(randomNews)
    allNews = allNews.filter(news => randomNews !== news)
  }

  const mainElement = document.getElementById('random')

  for(const news of newsToAppend) {
    const article = utils.appendNews(news)
    mainElement.append(article)
  }
}

init()
.then(utils.removeLoader)
.catch(utils.removeLoader)

const getRandomItem = items => items[Math.floor(Math.random()* items.length)]
