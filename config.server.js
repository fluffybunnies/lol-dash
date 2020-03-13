const config = require('./config.server.json')

try {
  Object.assign(config, require('./config.server.local.json'))
} catch(e){}

module.exports = config
