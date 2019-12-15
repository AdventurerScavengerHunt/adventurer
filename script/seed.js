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
    Hunt.bulkCreate([
      {
        name: 'Friends & Family'
      },
      {
        name: 'Financial District'
      },
      {
        name: 'Food Treasure'
      },
      {
        name: 'Lower East Side'
      },
      {
        name: 'Hudson Heights'
      },
      {
        name: 'Bay Ridge'
      }
    ])
  ])
  const users = await Promise.all([
    User.bulkCreate([
      {
        email: 'clark@clark.com',
        username: 'clark',
        password: '1234',
        huntId: 2
      },
      {
        email: 'bo@bo.com',
        username: 'bo',
        password: '1234',
        huntId: 3
      }
    ])
  ])
  const locations = await Promise.all([
    Location.bulkCreate([
      {
        latitude: 40.705289,
        longitude: -74.009205,
        riddle:
          'Friends, Fellows, who you may find\nWhere knowledge enters the mind!',
        huntId: 1
      },
      {
        latitude: 40.705289,
        longitude: -74.009205,
        riddle:
          'Friends, Fellows, who you may find\nWhere knowledge enters the mind!',
        huntId: 2
      },
      {
        latitude: 40.705381,
        longitude: -74.008427,
        riddle:
          'Fishy, tasty, round a corner\nNew cuisines are always born here!',
        huntId: 2
      },
      {
        latitude: 40.704566,
        longitude: -74.009894,
        riddle: "Get a fancy french pastry\nDon't have to be too hasty!",
        huntId: 3
      },
      {
        latitude: 40.705528,
        longitude: -74.010095,
        riddle: 'Go to market\nStay on Target',
        huntId: 3
      },
      {
        latitude: 40.721333,
        longitude: -73.983853,
        riddle: "Where the pancakes live\nThat belt loop's gotta give",
        huntId: 4
      },
      {
        latitude: 40.722258,
        longitude: -73.983451,
        riddle: 'A place to feed your gum addiction',
        huntId: 4
      },
      {
        latitude: 40.853274,
        longitude: -73.935133,
        riddle: 'Place of learning with sunken grounds',
        huntId: 5
      },
      {
        latitude: 40.853518,
        longitude: -73.934471,
        riddle: "Homer's favorite food\n'cross from fiery booms",
        huntId: 5
      },
      {
        latitude: 40.629992,
        longitude: -74.022723,
        riddle: 'Yummy and cheesy\nAnd oh so crispy!',
        huntId: 6
      }
    ])
  ])
  const huntObjects = await Promise.all([
    HuntObject.bulkCreate([
      {
        name: 'Bernie head',
        source:
          'http://www.gstatic.com/tv/thumb/persons/547987/547987_v9_ba.jpg'
      }
    ])
  ])

  const huntLocations = await Promise.all([
    HuntLocation.bulkCreate([
      {
        visited: false,
        userId: 1,
        locationId: 2
      },
      {
        visited: false,
        userId: 1,
        locationId: 3
      },
      {
        visited: false,
        userId: 2,
        locationId: 4
      },
      {
        visited: false,
        userId: 2,
        locationId: 5
      }
    ])
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
