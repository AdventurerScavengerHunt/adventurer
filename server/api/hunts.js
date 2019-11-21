const router = require('express').Router()
const {Hunt} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allHunts = await Hunt.findAll()
    res.json(allHunts)
  } catch (err) {
    next(err)
  }
})
