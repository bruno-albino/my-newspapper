import * as constants from '../../configs/constants.js'
import utils from '../../utils.js'

utils.init(constants.EDUCATION)
.then(utils.removeLoader)
.catch(utils.removeLoader)
