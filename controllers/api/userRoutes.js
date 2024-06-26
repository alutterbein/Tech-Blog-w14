const router = require('express').Router();
const { User } = require('../../models');

// get all users
router.get("/", (req, res) => {
User.findAll({
  attributes: { exclude: ['password'] },
})
 .then(dbUserData => res.json(dbUserData))
 .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// new user
router.post('/signup', async (req, res) => {
  try {
    const newUser = new User();
newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password =  req.body.password;
    const dbUserData = await newUser.save();

req.session.save(() => {
  req.session.user_id = dbUserData.id;
  req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
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
// login route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
