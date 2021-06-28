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
  const div = document.createElement('div')
  const div2 = document.createElement('div')

  div.className = 'card';
  div2.className = 'card-body';
  div.style.margin = '10px 0px';

  appendTitle(news, div2)
  appendText(news, div2)

  div.appendChild(div2)
  
  appendAuthor(news, div)
  appendImageUrl(news, div)

  return div
}

const appendTitle = (news, element) => {
  const h5 = document.createElement('h5')
  h5.className = 'card-title card-header';
  h5.innerHTML = news.title
  element.appendChild(h5)
}

const appendAuthor = (news, element) => {
  const small = document.createElement('small')
  small.className = 'card-body text-muted'
  small.innerHTML = `Autor: ${news.author}`
  element.appendChild(small)
}

const appendImageUrl = (news, element) => {
  const img = document.createElement('img')
  img.className = 'card-img-top'
  img.alt = news.title.split(' ')[0]
  img.src = news.imageUrl
  element.appendChild(img)
}

const appendText = (news, element) => {
  const texts = news.text.split('<br>')
  const div = document.createElement('div');
  for(const text of texts) {
    const p = document.createElement('p')

    p.className = 'card-text'
    p.innerHTML = text

    div.appendChild(p)
  }
  element.appendChild(div)
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
