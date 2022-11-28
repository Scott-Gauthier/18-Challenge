const connection = require('../../config/connection');
const { seedUser } = require('./user-seeds');
const { seedThought } = require('./thought-seeds');
const { seedReaction } = require('./Reaction-seeds');

const seedAll = async () => {
  connection.on('error', (err) => console.log(err));

  connection.once('open', async () => {
    console.log('connected');

    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');

    await seedThought();
    console.log('\n----- THOUGHTS SEEDED -----\n');

    // await seedReaction();
    // console.log('\n----- REACTION SEEDED -----\n');

    process.exit(0);
  });
};

seedAll();
