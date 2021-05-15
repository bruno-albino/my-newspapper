const getNewsByType = async type => {
  const response = await fetch('../../configs/news.json').then(response => response.json())
  return response.news[type] || []
}

const init = async newsType => {
  const news = await getNewsByType(newsType)
  const mainElement = document.getElementById(newsType)

  for(const educationNews of news) {
    const article = appendNews(educationNews)
    mainElement.append(article)
  }
}

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
  const p = document.createElement('p')
  p.innerHTML = news.text
  element.appendChild(p)
}


export default {
  getNewsByType,
  appendNews,
  init
}
