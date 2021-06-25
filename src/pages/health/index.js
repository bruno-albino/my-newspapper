import * as constants from '../../configs/constants.js'
import utils from '../../utils.js'

utils.init(constants.HEALTH)
.then(utils.removeLoader)
.catch(utils.removeLoader)
