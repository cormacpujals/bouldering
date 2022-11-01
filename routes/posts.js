const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes start with '/posts'

// GET /posts (display all posts)
router.get('/', postsCtrl.index);
// GET /posts/new (display a form for entering a new post)
router.get('/new', ensureLoggedIn, postsCtrl.new);
// GET /posts/:id (display a "detail/show" page for a single post)
router.get('/:id', postsCtrl.show);
// POST /posts (handle the new form being submitted)
router.post('/', ensureLoggedIn, postsCtrl.create);
// GET /posts/edit/:id
// router.get('/edit/:id', ensureLoggedIn, postsCtrl.edit)
// PUT /posts/edit
// router.put('/:id', ensureLoggedIn, postsCtrl.update)
// DELETE /posts/:id
router.delete('/:id', ensureLoggedIn, postsCtrl.delete)


module.exports = router;
