const fetch = require('node-fetch');
const Joke = require('../../models/joke');


module.exports = {
  fetchRandomJoke,
  postJoke,
  getAllJokes
};


async function fetchRandomJoke(req, res) {
    const searchTerm = req.query.q; 
  
    try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/Any?safe-mode&contains=${searchTerm}`);
      const data = await response.json();
  
      if (data && data.joke) {
        res.json({ joke: data.joke });
      } else if (data && data.setup && data.delivery) { 
        res.json({ setup: data.setup, delivery: data.delivery });
      } else {
        res.status(400).json({ error: "Can't fetch 400" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching from the joke API" });
    }
  }
  
  async function postJoke(req, res) {
    try {
        const joke = new Joke({
            content: req.body.content,
            user: req.user._id
        });
        await joke.save();
        res.status(201).json(joke);
    } catch (error) {
        console.error("Error while saving joke:", error);
        res.status(500).json({ error: "Can't save the joke" });
    }
}

async function getAllJokes(req, res) {
    try {
        const jokes = await Joke.find()
         .populate('user', 'name')
         .sort({ '_id': -1 }); 
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ error: "Can't fetch jokes" });
    }
}
