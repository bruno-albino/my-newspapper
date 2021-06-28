import utils from '../../utils.js'

utils.initRandom()
.then(utils.removeLoader)
.catch(utils.removeLoader)


function onSubmitLoginModal() {
  alert('aq')
}
