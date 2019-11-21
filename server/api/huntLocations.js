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

router.post('/:userId/:huntId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const huntId = req.params.huntId
    const currentUser = await User.findByPk(userId)
    const currentHunt = await Hunt.findByPk(huntId)
    const locations = await currentHunt.getLocations()

    await currentUser.addLocations(locations)
    const currentHuntLocations = await currentUser.getLocations()
    await User.update(
      {
        huntId
      },
      {
        where: {id: userId}
      }
    )
    res.status(201).send(currentHuntLocations)
  } catch (error) {
    next(error)
  }
})
