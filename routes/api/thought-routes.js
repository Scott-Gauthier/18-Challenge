const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/test', (reg,res) => res.send(`API express routes working for thoughts.`))


router.get('/', async (req, res) => {
    Thought.find({}, (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ error: 'Something went wrong' });
        }
      });
});


router.get('/:id', async (req, res) => {

    Thought.findOne({ _id: req.params.id })
    .select('-__v')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));

});


router.post('/', async (req, res) => {
  Thought.create(req.body)
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => res.status(500).json(err));
});

router.put('/:id', async (req, res) => {
    console.log(req.body.reactions[0].reactionBody)
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { username: req.body.username,
          thoughtText: req.body.thoughtText, 
          $push: { reactions: { reactionBody: req.body.reactions[0].reactionBody,
                                username: req.body.reactions[0].username } } },
        { runValidators: true, new: true },
        // (err, result) => {
        //   if (result) {
        //     res.status(200).json(result);
        //     console.log(`Updated: ${result}`);
        //   } else {
        //     console.log('Uh Oh, something went wrong');
        //     res.status(500).json({ error: 'Something went wrong' });
        //   }
        // }
      );
      User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: req.params.id } },
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

    Thought.findOneAndDelete(
        { _id: req.params.id },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
          } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
          }
        }
      );

});

module.exports = router;