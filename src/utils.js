import { news } from './configs/news.json'

const getNewsByType = type => {
  return news[type] || []
}
export default {
  getNewsByType
}
