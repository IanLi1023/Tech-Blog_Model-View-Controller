const router = require('express').Router();
const { Comment } = require('../../../models');
const auth = require('../../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(e => {
        console.log(e);
        res.status(500).json(e);
      });
});

router.post('/', auth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(e => {
        console.log(e);
        res.status(400).json(e);
      });
  }
});

router.delete('/:id', auth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(e => {
          console.log(e);
          res.status(500).json(e);
        });
});

module.exports = router;