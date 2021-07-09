const auth = firebase.auth()
import authService  from '../services/auth.js'
import { CONVERT_ERROR_MESSAGE } from '../../configs/convert-error-message.js'

const searchForm = document.getElementById('search-form')
const authForm = document.getElementById('auth-form')

authForm.onsubmit = async e => {
  e.preventDefault()
  
  const email = document.getElementById('auth-email-input').value
  const password = document.getElementById('auth-password-input').value

  try {
    await authService.authenticate({ email, password })
    window.location.reload()
    $('#authModal').modal('hide')
  } catch(err) {
    alert(`${CONVERT_ERROR_MESSAGE[err.message] || err.message}`)
  }
}

searchForm.onsubmit = e => {
  e.preventDefault()
  const search = document.getElementById('search-input').value
  window.location.href = `/pages/search/index.html?q=${search}`
}



const verifyUserBehavior = () => {
  const authModalLoginBtn = document.getElementById('auth-modal-login-btn')
  const accountDropdown = document.getElementById('account-dropdown')
  const accountDropdownAddNewsItem = document.getElementById('add-news-link')

  auth.onAuthStateChanged(async (user) => {
    if(!user) {
      authModalLoginBtn.style.display = 'block'
      accountDropdown.style.display = 'none'
      return
    }
    const isAdmin = await authService.isAdmin(user.uid)
    if(isAdmin) {
      accountDropdownAddNewsItem.style.display = 'block';
    }
    
    authModalLoginBtn.style.display = 'none'
    accountDropdown.style.display = 'block'
  });
}

const logoutBtn = document.getElementById('logout-btn')
logoutBtn.onclick =  () => {
  auth.signOut()
  verifyUserBehavior()
}

verifyUserBehavior()
