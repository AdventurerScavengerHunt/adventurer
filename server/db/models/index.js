const User = require('./user')
const Hunt = require('./hunt')
const HuntObject = require('./huntObject')
const Location = require('./location')
const HuntLocation = require('./huntLocation')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsTo(Hunt)

Location.belongsTo(Hunt)
Hunt.hasMany(Location)

Location.belongsTo(HuntObject)
HuntObject.hasMany(Location)

User.belongsToMany(Location, {through: 'huntLocation'})
Location.belongsToMany(User, {through: 'huntLocation'})

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
  HuntLocation
}
