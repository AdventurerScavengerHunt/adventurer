const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  latitude: {
    type: Sequelize.FLOAT(10, 6)
  },
  longitude: {
    type: Sequelize.FLOAT(10, 6)
  },
  clue: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 116]
    }
  }
})

module.exports = Location
