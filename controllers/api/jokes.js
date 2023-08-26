const fetch = require('node-fetch');
const Joke = require('../../models/joke');

module.exports = {
    fetchRandomJoke,
    postJoke,
    getAllJokes,
    deleteJoke,
    favoriteJoke
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
            res.status(400).json({ error: "Can't grab joke" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error grab from the joke API" });
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
        console.error("Error while saving joke");
        res.status(500).json({ error: "Can't save the joke" });
    }
}

async function getAllJokes(req, res) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        const userFavoriteJokes = await Joke.find({ favoritedBy: req.user._id }).populate('user', 'name');


        if (!userFavoriteJokes) {
            return res.status(404).json({ error: "Favorite jokes not found" });
        }

        const globalAddedJokes = await Joke.find()
            .populate('user', 'name')
            .sort({ '_id': -1 });

        if (!globalAddedJokes) {
            return res.status(404).json({ error: "Global jokes not found" });
        }

        res.json({
            userFavoriteJokes: userFavoriteJokes,
            globalAddedJokes: globalAddedJokes
        });
    } catch (error) {
        console.error("Error in getAllJokes:", error);
        res.status(500).json({ error: "Can't fetch jokes" });
    }
}




async function deleteJoke(req, res) {
    try {
        const jokeId = req.params.id;
        const joke = await Joke.findById(jokeId);
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

async function favoriteJoke(req, res) {
    try {
        const jokeContent = req.body.content;

        let joke = await Joke.findOne({ content: jokeContent });

        if (!joke) {
            joke = new Joke({ content: jokeContent, user: req.user._id });
        }
        
        if(!joke.favoritedBy.includes(req.user._id)) {
            joke.favoritedBy.push(req.user._id);
        }
        
        
        await joke.save();

        res.status(200).json({ message: 'Joke marked as favorite' });

    } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}
