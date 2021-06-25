const db = firebase.firestore();

const createNews = ({ title, author, text, imageUrl, type }) => {
  return db.collection('news').add({ title, author, text, imageUrl, type })
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

const serializeDoc = doc => {
  return {
    id: doc.id,
    ...doc.data()
  }
}

const newsService = {
  createNews,
  getAll,
  getAllByType
}

export default newsService
