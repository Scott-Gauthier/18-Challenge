const { user } = require('../models');

if (collection.length === 0) {
  return user.insertMany(
    [
      { name: 'Produce' },
      { name: 'Dairy' },
      { name: 'Meat' },
      { name: 'Wine' },
      { name: 'Wine' },
      { name: 'Wine' },
      { name: 'Flowers' },
    ],
    (insertError) =>
      insertError ? handleError(insertError) : console.log('Inserted')
  );
}
return console.log('Already populated');

module.exports = seedUser;
