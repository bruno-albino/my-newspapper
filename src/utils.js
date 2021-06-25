import newsService from './services/news.js'
const TOTAL_RANDOM_PAGES = 6

const init = async newsType => {
  const news = await newsService.getAllByType(newsType)
  const mainElement = document.getElementById(newsType)

  for(const educationNews of news) {
    const article = appendNews(educationNews)
    mainElement.append(article)
  }
}

const initRandom = async () => {
  let allNews = await newsService.getAll()

  const newsToAppend = []
  for(let i = 0; i < TOTAL_RANDOM_PAGES; i++) {
    const randomNews = getRandomItem(allNews)
    newsToAppend.push(randomNews)
    allNews = allNews.filter(news => randomNews !== news)
  }

  const mainElement = document.getElementById('random')

  for(const news of newsToAppend) {
    const article = appendNews(news)
    mainElement.append(article)
  }
}

const getRandomItem = items => items[Math.floor(Math.random()* items.length)]

const appendNews = news => {
  const article = document.createElement('article')
  appendTitle(news, article)
  appendAuthor(news, article)
  appendImageUrl(news, article)
  appendText(news, article)
  return article
}

const appendTitle = (news, element) => {
  const h2 = document.createElement('h2')
  h2.innerHTML = news.title
  element.appendChild(h2)
}

const appendAuthor = (news, element) => {
  const span = document.createElement('span')
  span.innerHTML = `<strong>Autor:</strong> ${news.author}`
  element.appendChild(span)
}

const appendImageUrl = (news, element) => {
  const img = document.createElement('img')
  img.alt = news.title.split(' ')[0]
  img.src = news.imageUrl
  element.appendChild(img)
}

const appendText = (news, element) => {
  const texts = news.text.split('<br>')
  for(const text of texts) {
    const p = document.createElement('p')
    p.innerHTML = text
    element.appendChild(p)
  }
}

const removeLoader = () => {
  const wrapper = document.getElementById('loader-wrapper')
  wrapper.style.display = 'none'
}

export default {
  init,
  initRandom,
  removeLoader
}
