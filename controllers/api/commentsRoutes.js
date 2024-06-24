const router = require('express').Router();
const { Comments } = require('../models');
const withAuth = require('../utils/auth');


// new comment

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
     ...req.body,
      user_id: req.session.user_id,
    });
res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/', async (req, res) => {

//     res.render('homepage');
// });


// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['username', 'ASC']], //this used to say 'name', 'ASC' what is ASC?
//     });
// // changed all instances of" project " from the mini project to " Posts " (no quotes in actual code)
//     const users = userData.map((Posts) => Posts.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;