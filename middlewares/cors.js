const cors = require('cors')

const corsOptions = {
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {

      callback(null, true)

  }
}

module.exports = cors(corsOptions)
