const fetch = require('node-fetch');
const Joke = require('../../models/joke');


module.exports = {
  fetchRandomJoke,
  postJoke,
  getAllJokes,
  deleteJoke
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

async function deleteJoke(req, res) {
    try {
        const jokeId = req.params.id;
        const joke = await Joke.findById(jokeId);

        // this jus makes sure the joke belongs to the user thats logged in, even tho there will be no delete button showed for them we still need to make sure our backend is protected
        if (!joke || String(joke.user) !== String(req.user._id)) {
            return res.status(400).send('You cant be deleting someone elses joke');
        }

        await joke.remove();
        res.status(200).send('Joke deleted successfully');

    } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}
