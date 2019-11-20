const User = require('./user')
const Hunt = require('./hunt')
const HuntObject = require('./huntObject')
const Location = require('./location')
const VisitedLocation = require('./visitedLocation')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasOne(Hunt)
Hunt.hasMany(User)

Hunt.hasMany(Location)
Location.hasOne(Hunt)

HuntObject.hasMany(Location)
Location.hasOne(HuntObject)

User.belongsToMany(Location, {through: 'VisitedLocation'})
Location.belongsToMany(User, {through: 'VisitedLocation'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Hunt,
  HuntObject,
  Location,
  VisitedLocation
}
