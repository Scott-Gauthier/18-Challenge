const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/test', (reg, res) => res.send(`API express routes working for user.`))

router.get('/', async (req, res) => {
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

router.get('/:id', async (req, res) => {

  User.findOne({ _id: req.params.id })
    .select('-__v')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));

});

router.post('/', async (req, res) => {
  User.create(req.body)
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => res.status(500).json(err));
});

router.put('/:id', async (req, res) => {

  User.findOneAndUpdate(
    { _id: req.params.id },
    { username: req.body.username,
      email: req.body.email, 
      $push: { friends: req.body.friends } },
    { runValidators: true, new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});

router.delete('/:id', async (req, res) => {
  User.findOneAndDelete(
    { _id: req.params.id },
    (err, result) => {
      if (result) {
        res.status(200).json({ message: `${result.username} deleted!`});
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});

module.exports = router;