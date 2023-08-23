const express = require('express');
const router = express.Router();
const jokesCtrl = require('../../controllers/api/jokes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const checkJWT = require('../../middleware/checkJWT');

router.get('/search', jokesCtrl.fetchRandomJoke); 
router.post('/', jokesCtrl.postJoke);
router.post('/post-joke-endpoint', checkJWT, jokesCtrl.postJoke);
module.exports = router;
