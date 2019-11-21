const router = require('express').Router()
const {HuntLocation, User, Hunt, Location} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const currentUser = await User.findByPk(userId)
    const currentHuntLocations = await currentUser.getLocations({order: ['id']})
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
    await currentUser.update({
      huntId
    })
    res.status(201).send(currentHuntLocations)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:locationId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const locationId = req.params.locationId
    await HuntLocation.update(
      {
        visited: true
      },
      {
        where: {userId: userId, locationId: locationId}
      }
    )
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/:locationId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const locationId = req.params.locationId
    const currentUser = await User.findByPk(userId)
    const currentLocation = await Location.findByPk(locationId)
    await currentUser.removeLocation(currentLocation)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
