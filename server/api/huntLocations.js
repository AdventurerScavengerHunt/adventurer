const router = require('express').Router()
const {HuntLocation, User, Hunt} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const currentUser = await User.findByPk(userId)
    console.log(currentUser)
    const currentHuntLocations = await currentUser.getLocations()
    res.json(currentHuntLocations)
  } catch (error) {
    next(error)
  }
})
