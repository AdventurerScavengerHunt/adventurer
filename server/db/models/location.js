const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  latitude: {
    type: Sequelize.DECIMAL //ask natalie?
  },
  longitude: {
    type: Sequelize.DECIMAL //ask natalie?
  },
  riddle: {
    type: Sequelize.STRING
  }
})

module.exports = Location
