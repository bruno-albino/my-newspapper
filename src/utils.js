import newsService from './services/news.js'
import authService from './services/auth.js'

const init = async newsType => {
  const news = await newsService.getAllByType(newsType)
  const mainElement = document.getElementById(newsType)

  for(const educationNews of news) {
    const article = appendNews(educationNews)
    mainElement.append(article)
  }
}

const appendNews = news => {
  const div = document.createElement('div')
  const div2 = document.createElement('div')

  div.className = 'card';
  div2.className = 'card-body';
  div.style.margin = '10px 0px'

  appendTitle(news, div2)
  appendText(news, div2)

  div.appendChild(div2)
  
  appendAuthor(news, div)
  appendImageUrl(news, div)
  appendLikeButton(news, div)

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
  if(!news.imageUrl) {
    return
  }
  const img = document.createElement('img')
  img.className = 'card-img-top'
  img.alt = news.title.split(' ')[0]
  img.src = news.imageUrl
  img.style.padding = '10px 30px'
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

const appendLikeButton = async (news, element) => {
  const user = await authService.getAuthenticatedUser()
  const userHasLiked = !user ? false : (news.likes || []).includes(user.uid)

  const div = document.createElement('div')
  div.style.padding = '5px 30px'
  const i = document.createElement('i')

  i.className = 'fa fa-thumbs-up fa-3x'
  i.style.color = userHasLiked ? 'blue' : 'gray'
  i.style.cursor = 'pointer'
  i.onclick = () => userHasLiked ? onUserDisLikeNews(news.id) : onUserLikeNews(news.id)

  div.appendChild(i)
  element.appendChild(div)
}

const onUserLikeNews = async newsId => {
  const user = await authService.getAuthenticatedUser()
  if (!user) {
    alert('Entre com sua conta para curtir notícias')
    return
  }
  await newsService.addUserLike(user.uid, newsId)
  window.location.reload()
}

const onUserDisLikeNews = async newsId => {
  const user = await authService.getAuthenticatedUser()
  if (!user) {
    alert('Entre com sua conta para curtir notícias')
    return
  }
  await newsService.removeUserLike(user.uid, newsId)
  window.location.reload()
}

const removeLoader = () => {
  const wrapper = document.getElementById('loader-wrapper')
  wrapper.style.display = 'none'
}

export default {
  removeLoader,
  appendNews
}
