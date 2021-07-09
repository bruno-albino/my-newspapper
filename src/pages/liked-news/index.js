import utils from '../../utils.js';
import authService  from '../../services/auth.js'
import newsService  from '../../services/news.js'

const likedNewsWrapper = document.getElementById('liked-news')
const initLikedNews =  async () => {
  const user = await authService.getAuthenticatedUser()
  if(!user) {
    return
    window.location.href = '/'
  }

  const likedNews = await newsService.getLikedNewsByUserId(user.uid)
  for(const singleNews of likedNews) {
    const article = utils.appendNews(singleNews)
    likedNewsWrapper.append(article)
  }
}

initLikedNews()
.then(utils.removeLoader)
.catch(utils.removeLoader)
