const router = require('express').Router();
const { user } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await user.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).json(userData);

    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {

    const userData = await user.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email !!!! or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/new', async (req, res) => {
  const userDataCheck = await user.findOne({ where: { email: req.body.email } });
  if (userDataCheck) {
    res
      .status(400)
      .json({ message: 'Account already exists. Please create a new account.'});
    return;
  } else {
    console.log(req.body)
  const {email, password } = req.body;
  // If all the required properties are present
  if (email && password) {
    // Variable for the object we will save
    const newUser = {
      email,
      password,
    };
    console.log(newUser)  
    user.create(newUser)
    .then((newUser) => {
      console.log(newUser);
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
    ;
    const response = {
      status: 'success',
      body: newUser,
    };
    console.log(response)
    //res.status(201).json(response);
  } else {
    //res.status(500).json('Error in posting review');
  }
}
});

router.get('/:id', async (req, res) => {
  //route is for test purposes.
  const id = req.params.id.toLowerCase();
  let contentDataRaw = await content.findAll({
    where: {
      id: id,
    },
    include: [{ model: user.scope('password')},{ model: comment}],

  });

contentDataRaw = contentDataRaw.map((content) => content.get({ plain: true})) //

  res.status(200).json({content: contentDataRaw})

});
module.exports = router;