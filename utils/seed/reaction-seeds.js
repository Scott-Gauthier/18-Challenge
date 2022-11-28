const { User, Thought } = require('../../models');

const seedReaction = async () => {

  const data = await Thought.find({}).select('username');

  data.forEach((element) => {

    User.findOneAndUpdate(
      { username: element.username },
      { $push: { thoughts: element._id } },
      { runValidators: true, new: true }
    )
  });
}

module.exports = { seedReaction };
