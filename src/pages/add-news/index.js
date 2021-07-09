
import newsService from '../../services/news.js'
import authService from '../../services/auth.js'

authService.getAuthenticatedUser()
.then(user => {
  if(!user) {
    window.location.href = '/'
  }
  authService.isAdmin(user.uid)
  .then(isAdmin => {
    if(!isAdmin) {
      window.location.href = '/'
    }
  })
})

const addNewsForm = document.getElementById('add-news-form')
$('.alert').hide()


addNewsForm.onsubmit = async e => {
  e.preventDefault();
  $('.alert').hide()
  let isFormInvalid = false;

  const title = document.getElementById('inputTitle').value
  const author = document.getElementById('inputAuthor').value
  const text = document.getElementById('inputText').value
  const type = document.getElementById('categorySelect').value

  if(!title) {
    $('.alert-title').show()
    isFormInvalid = true;
  }
  if(!author) {
    $('.alert-author').show()
    isFormInvalid = true;
  }
  if(!text) {
    $('.alert-text').show()
    isFormInvalid = true;
  }

  if(title.length > 50) {
    $('.alert-title-max-length').show()
    isFormInvalid = true;
  }
  if(author.length > 100) {
    $('.alert-author-max-length').show()
    isFormInvalid = true;
  }
  if(text.length > 100) {
    $('.alert-text-max-length').show()
    isFormInvalid = true;
  }

  if(isFormInvalid) {
    return
  }

  try {
    await newsService.createNews({ title, author, text, type })
    alert('Notícia cadastrada com sucesso')
    clearForm()

  } catch(err) {
    alert('Ocorreu um erro na hora de cadastrar a notícia')
  }
}


const clearForm = () => {
  document.getElementById('inputTitle').value = ''
  document.getElementById('inputAuthor').value = ''
  document.getElementById('inputText').value = ''
}
