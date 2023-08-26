const express = require('express');
const router = express.Router();
const jokesCtrl = require('../../controllers/api/jokes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/search', jokesCtrl.fetchRandomJoke); 
router.post('/', jokesCtrl.postJoke);
router.get('/browse', jokesCtrl.getAllJokes);
router.delete('/:id',jokesCtrl.deleteJoke)
router.post('/favorite', jokesCtrl.favoriteJoke);
module.exports = router;
