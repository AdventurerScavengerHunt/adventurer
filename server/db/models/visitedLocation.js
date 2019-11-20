const Sequelize = require('sequelize')
const db = require('../db')

const VisitedLocation = db.define('visitedLocation', {
  visited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = VisitedLocation
