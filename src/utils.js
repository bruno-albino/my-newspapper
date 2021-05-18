const TOTAL_RANDOM_PAGES = 6

const getNewsByType = async type => {
  const response = await getAllNews()
  return response[type] || []
}

const getAllNews = async () => {
  const response = await fetch('../../configs/news.json').then(response => response.json())
  return response.news
}

const init = async newsType => {
  const news = await getNewsByType(newsType)
  const mainElement = document.getElementById(newsType)

  for(const educationNews of news) {
    const article = appendNews(educationNews)
    mainElement.append(article)
  }
}

const initRandom = async () => {
  const allNews = await getAllNews()
  let serializedNews = []
  Object.keys(allNews).forEach(key => {
    serializedNews = serializedNews.concat(allNews[key])
  })

  const newsToAppend = []
  for(let i = 0; i < TOTAL_RANDOM_PAGES; i++) {
    const randomNews = getRandomItem(serializedNews)
    newsToAppend.push(randomNews)
    serializedNews = serializedNews.filter(news => randomNews !== news)
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
  img.alt = news.title[0]
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


export default {
  init,
  initRandom
}
