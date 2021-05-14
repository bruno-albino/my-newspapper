const getNewsByType = async type => {
  const response = await fetch('../../configs/news.json').then(response => response.json())
  return response.news[type] || []
}
export default {
  getNewsByType
}
