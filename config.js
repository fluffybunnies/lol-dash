const config = require('./config.json')

try {
  Object.assign(config, require('./config.local.json'))
} catch(e){}

module.exports = config
