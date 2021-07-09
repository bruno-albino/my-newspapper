const db = firebase.firestore();

const createNews = ({ title, author, text, imageUrl = '', type }) => {
  const keywords = text.split(' ').map(child => child.toLowerCase())
  return db.collection('news').add({ title, author, text, imageUrl, type, keywords })
}

const getAll = () => {
  return new Promise(resolve => {
    db.collection('news').get()
    .then(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(serializeDoc(doc))
      })
      resolve(items)
    })
  })
}

const getAllByType = async type => {
  return new Promise(resolve => {
    db.collection('news').where('type', '==', type).get()
    .then(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(serializeDoc(doc))
      })
      resolve(items)
    })
  })
}

const getAllByTitle = async title => {
  return new Promise(resolve => {
    db.collection('news').where('keywords', 'array-contains', title.toLowerCase()).get()
    .then(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(serializeDoc(doc))
      })
      resolve(items)
    })
  })
}

const addUserLike = async (userId, newsId) => {
  const newsRef = db.collection('news').doc(newsId)
  const likes = newsRef.likes || []
  likes.push(userId)

  await newsRef.update({ likes })
}

const removeUserLike = async (userId, newsId) => {
  const newsRef = db.collection('news').doc(newsId)
  const likes = newsRef.likes || []
  const index = likes.findIndex(user => user === userId)
  if(index !== -1) {
    likes.splice(index, 1)
  }

  await newsRef.update({ likes })
}

const getLikedNewsByUserId = async userId => {
  return new Promise(resolve => {
    db.collection('news').where('likes', 'array-contains', userId).get()
    .then(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(serializeDoc(doc))
      })
      resolve(items)
    })
  })
}


const serializeDoc = doc => {
  return {
    id: doc.id,
    ...doc.data()
  }
}

const newsService = {
  createNews,
  getAll,
  getAllByType,
  addUserLike,
  getAllByTitle,
  removeUserLike,
  getLikedNewsByUserId
}

export default newsService
