const Post = require('../models/post');

module.exports = {
  index,
  new: newPost,
  create,
  show,
  edit,
  update,
  delete: deletePost,
};

function index(req, res) {
  Post.find({}, function(err, posts) {
    res.render('posts/index', { title: 'All Boulders', posts });
  });
}

function newPost(req, res) {
  const validGrades = Post.schema.path('grade').enumValues;
  res.render('posts/new', {title: 'Add Boulder', validGrades });
}

function create (req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  const post = new Post(req.body);
  post.save(function(err) {
    console.log(err);
    if (err) return res.redirect('/posts/new');
    res.redirect("/posts");
  });
}

function show(req, res) {
  Post.findById(req.params.id, function(err, post) {
    console.log(err);
    res.render('posts/show', { post });
  });
}

function edit(req, res) {
  const validGrades = Post.schema.path('grade').enumValues;
  Post.findOne({_id: req.params.id, user: req.user._id}, function(err, post) {
    if (err || !post) return res.redirect('/posts');
    res.render('posts/edit', { post, validGrades });
  });
}

function update(req, res) {
  Post.findOneAndUpdate(
    {_id: req.params.id, user: req.user._id},
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    {new: true},
    function(err, post) {
      if (err || !post) return res.redirect('/posts');
      res.redirect(`/posts/${post._id}`);
    }
  );
}

function deletePost(req, res) {
  Post.findOneAndDelete(
    // Ensue that the post was created by the logged in user
    {_id: req.params.id, user: req.user._id}, function(err) {
      // Deleted post, so must redirect to index
      console.log(err);
      res.redirect('/posts');
    }
  );
}
