const express = require('express');
const router = express.Router();
const jokesCtrl = require('../../controllers/api/jokes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/search', jokesCtrl.fetchRandomJoke); 
router.post('/',  ensureLoggedIn, jokesCtrl.postJoke);
router.get('/browse', jokesCtrl.getAllJokes);
router.delete('/:id', ensureLoggedIn,jokesCtrl.deleteJoke)
router.post('/favorite', ensureLoggedIn, jokesCtrl.favoriteJoke);
module.exports = router;
