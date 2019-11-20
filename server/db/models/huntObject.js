const Sequelize = require('sequelize')
const db = require('../db')

const HuntObject = db.define('huntObject', {
  name: {
    type: Sequelize.STRING
  },
  source: {
    type: Sequelize.STRING
  }
})

module.exports = HuntObject
