const { User, Thought } = require('../../models');

const seedThought = async () => {

  await Thought.insertMany(
    [
      {
        thoughtText: 'This is the greatest song in the world',
        username: 'Bob',
        reactions: [
          {
            reactionBody: 'Best song ever!',
            username: 'Dan'
          }
        ]
      },
      {
        thoughtText: '...Tribute.',
        username: 'Dan',
        reactions: [
          {
            reactionBody: 'Keeping it going.',
            username: 'Lyndsey'
          }
        ],
      },
      {
        thoughtText: 'Long time ago me and my brother Kyle here,',
        username: 'Lyndsey',
        reactions: [
          {
            reactionBody: 'Why stop there?',
            username: 'Scott'
          },
        ],
      },
      {
        thoughtText: 'We was hitchhiking down a long and lonesome road.',
        username: 'Scott',
        reactions: [
          {
            reactionBody: 'This is the best tribute.',
            username: 'Bob'
          }
        ],
      },
      {
        thoughtText: 'All of a sudden, There shined a shiny demon, In the middle of the road, And he said!',
        username: 'Bob',
        reactions: [
          {
            reactionBody: 'No, best tribute to a tribute!',
            username: 'Dan'
          }
        ],
      },
      {
        thoughtText: 'Why did we just sing Tribute by Tenacious D?!?!?! Lol',
        username: 'Dan',
        reactions: [
          {
            reactionBody: 'Man we need to get a life.',
            username: 'Lyndsey'
          }
        ],
      },
    ],
  )

    const datathought = await Thought.find({}).select('username');
   await  console.log(datathought);
  await datathought.forEach((element) => {

    User.findOneAndUpdate(
      { username: element.username },
      { $push: { thoughts: element.id } },
      { runValidators: false, new: true }
    )
  });

}

module.exports = { seedThought };
