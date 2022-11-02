const Post = require('../models/post');

module.exports = {
  create,
  delete: deleteComment,
}


function create(req, res) {
  Post.findById(req.params.id, function(err, post) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // We push an object with the data for the
    // review subdoc into Mongoose arrays
    post.comments.push(req.body);
    post.save(function(err) {
      // Step 5: Respond with a redirect because we've mutated data
      console.log(err);
      res.redirect(`/posts/${post._id}`);
    });
  });
}

function deleteComment(req, res, next) {
  // Note the cool "dot" syntax to query for a movie with a
  // review nested within an array
  Post.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  }).then(function(post) {
    if (!post) return res.redirect('/posts');
    post.comments.remove(req.params.id);
    post.save().then(function() {
      res.redirect(`/posts/${post._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}
