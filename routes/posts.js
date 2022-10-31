const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes start with '/movies'

// GET /movies (display all movies)
router.get('/', postsCtrl.index);
// // GET /movies/new (display a form for entering a new movie)
// router.get('/new', ensureLoggedIn, postsCtrl.new);
// // GET /movies/:id (display a "detail/show" page for a single movie)
// router.get('/:id', postsCtrl.show);
// // POST /movies (handle the new form being submitted)
// router.post('/', ensureLoggedIn, postsCtrl.create);

module.exports = router;
