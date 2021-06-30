const auth = firebase.auth()

const authenticate = async ({ email, password }) => {
  return auth.signInWithEmailAndPassword(email, password)
}

const authService = {
  authenticate
}

export default authService
