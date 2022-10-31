const Post = require('../models/posts');

module.exports = {
  index,
};

function index(req, res) {
  Post.find({}, function(err, posts) {
    res.render('posts/index', { title: 'All Boulders', posts });
  });
}
