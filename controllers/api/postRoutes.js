const router = require('express').Router();
const { Posts, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');


// all posts with a username
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// one post by ID with assoc username & comments
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comments,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    if (!postData) { res.status(404).json({ message: 'No post found with this id!' });
    return; }
    res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Posts.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
if (!updatePost)
    {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(updatePost);
    } catch (err) {
    res.status(400).json(err);
  }
});



// delete post and comments attached
router.delete('/:id', withAuth, async (req, res) => {

  try {
    await Comments.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    const deletePost = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
