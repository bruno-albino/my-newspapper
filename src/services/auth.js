const auth = firebase.auth()
const db = firebase.firestore()

const authenticate = async ({ email, password }) => {
  return auth.signInWithEmailAndPassword(email, password)
}

const getAuthenticatedUser = () => new Promise((resolve, reject) => {
  auth.onAuthStateChanged(resolve)
})

const isAdmin = userId => new Promise((resolve) => {
  db.collection('admins').where('users', 'array-contains', userId).get()
  .then(querySnapshot => resolve(!querySnapshot.empty))
})
  

const authService = {
  authenticate,
  getAuthenticatedUser,
  isAdmin
}

export default authService
