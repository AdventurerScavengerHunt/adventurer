const Sequelize = require('sequelize')
const db = require('../db')

const HuntLocation = db.define('huntLocation', {
  visited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = HuntLocation
