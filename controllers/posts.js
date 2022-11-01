const Post = require('../models/post');

module.exports = {
  index,
  new: newPost,
  create,
  show,
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


// function create(req, res) {
//   const post = new Post(req.body);
//   // Assign the logged in user's id
//   req.body.userName = req.user.name;
//   req.body.userAvatar = req.user.avatar;
//   post.save(function(err) {
//     if (err) return res.redirect('/posts/new' /* or a path that displays a custom error */);
//     // Probably want to go to newly added post's show view
//     res.redirect(`/posts/${post.id}`);
//   });
// }


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
    res.render('posts/show', { name: 'Boulder Detail', post });
  });
}
