const express = require('express');
const router = express.Router();
const jokesCtrl = require('../../controllers/api/jokes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/search', jokesCtrl.fetchRandomJoke); 

module.exports = router;
