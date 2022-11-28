const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/test', (reg, res) => res.send(`API express routes working for relating seed tables.`))

router.post('/', async (req, res) => {

});

router.get('/', async (req, res) => {
  var response;
  const data = await Thought.find({}).select('username');

  console.log(data);
data.forEach((element) => {
    
  User.findOneAndUpdate(
    { username: element.username },
    { $push: { thoughts: element._id } },
    { runValidators: true, new: true }
  )
  .then((data) =>
      console.log
    )
  })
  res.json(response)

});
module.exports = router;