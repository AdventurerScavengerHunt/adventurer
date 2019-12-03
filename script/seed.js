'use strict'

//please create database called adventurer

const db = require('../server/db')
const {
  User,
  Hunt,
  HuntLocation,
  Location,
  HuntObject
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const hunts = await Promise.all([
    Hunt.create({
      name: 'Hunt Friends & Family'
    }),
    Hunt.create({
      name: 'Hunt Bernie'
    }),
    Hunt.create({
      name: 'Hunt Treasure'
    }),
    Hunt.create({
      name: 'Hunt Lower East Side'
    })
  ])
  const users = await Promise.all([
    User.create({
      email: 'clark@clark.com',
      username: 'clark',
      password: '1234',
      huntId: 1
    }),
    User.create({
      email: 'bo@bo.com',
      username: 'bo',
      password: '1234',
      huntId: 2
    })
  ])
  const locations = await Promise.all([
    Location.create({
      latitude: 40.705289,
      longitude: -74.009205,
      riddle: 'We go to school here!',
      huntId: 1
    }),
    Location.create({
      latitude: 40.705289,
      longitude: -74.009205,
      riddle: 'We go to school here!',
      huntId: 2
    }),
    Location.create({
      latitude: 40.705381,
      longitude: -74.008427,
      riddle: 'Have some sushi',
      huntId: 2
    }),
    Location.create({
      latitude: 40.704566,
      longitude: -74.009894,
      riddle: 'Get fancy french pastry',
      huntId: 3
    }),
    Location.create({
      latitude: 40.705528,
      longitude: -74.010095,
      riddle: 'Go to market',
      huntId: 3
    }),
    Location.create({
      latitude: 40.721333,
      longitude: -73.983853,
      riddle: 'Where the pancakes live',
      huntId: 4
    }),
    Location.create({
      latitude: 40.722258,
      longitude: -73.983451,
      riddle: 'A place to feed your gum addiction',
      huntId: 4
    })
  ])
  const huntObjects = await Promise.all([
    HuntObject.create({
      name: 'Bernie head',
      source: 'http://www.gstatic.com/tv/thumb/persons/547987/547987_v9_ba.jpg'
    })
  ])

  const huntLocations = await Promise.all([
    HuntLocation.create({
      visited: false,
      userId: 1,
      locationId: 2
    }),
    HuntLocation.create({
      visited: false,
      userId: 1,
      locationId: 3
    }),
    HuntLocation.create({
      visited: false,
      userId: 2,
      locationId: 4
    }),
    HuntLocation.create({
      visited: false,
      userId: 2,
      locationId: 5
    })
  ])
  console.log(
    `seeded ${users.length} users, ${locations.length} locations, ${
      hunts.length
    } hunts, ${huntObjects.length} objects, and ${
      huntLocations.length
    } huntLocations`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
