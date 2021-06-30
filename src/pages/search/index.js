import newsService from '../../services/news.js'
import utils from '../../utils.js'

const searchQuery = window.location.search?.split('?')[1]?.split('=')

const getNewsByTitle = async title => {
  const allNews = await newsService.getAllByTitle(title)
  const mainElement = document.getElementById('search-news-wrapper')

  for(const news of allNews) {
    const article = utils.appendNews(news)
    mainElement.append(article)
  }
}

if(searchQuery) {
  const [key, value] = searchQuery
  if((key && value) && key === 'q') {
    const search = decodeURI(value)
    const searchText = document.getElementsByTagName('h1')[0]
    searchText.innerHTML += search
    getNewsByTitle(search)
    .then(utils.removeLoader)
  } else {
    utils.removeLoader()
  }
} else {
  utils.removeLoader()
}

