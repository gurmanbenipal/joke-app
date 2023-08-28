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
        //here we use fetch to get the joke from the api 
        const response = await fetch(`https://v2.jokeapi.dev/joke/Any?safe-mode&contains=${searchTerm}`);
        //now we convert the data into a json format so we can use it easily
        const data = await response.json();
        //if our joke is a one lines then we will show that
        if (data && data.joke) {
            res.json({ joke: data.joke });
        //if its a whole setup with a punchline , then we will show that
        } else if (data && data.setup && data.delivery) { 
            res.json({ setup: data.setup, delivery: data.delivery });
        //in case we cant get any joke data then we'll jus be like "cant grab joke"
        } else {
            res.status(400).json({ error: "Can't grab joke" });
        }
    //if we had any errors during the whole process then we'll throw in an error
    } catch (error) {
        res.status(500).json({ error: "Error grab from the joke API" });
    }
}

//this function will let us save our jokes
async function postJoke(req, res) {
    try {
        //here we create a new joke with the content and the user who created it
        const joke = new Joke({
            content: req.body.content,
            user: req.user._id
        });
    //we save our joke
        await joke.save();
        res.status(201).json(joke);
    //in case we had an error then we show an appropriate error
    } catch (error) {
        console.error("Error while saving joke");
        res.status(500).json({ error: "Can't save the joke" });
    }
}
//this function will display all the jokes on our browse page
async function getAllJokes(req, res) {
    try {
        //here we check if we know whos tryin to see the jokes, if we know then well look up their fav list or else we show nth
        const userFavoriteJokes = req.user ? await Joke.find({ favoritedBy: req.user._id })
        .populate('user', 'name') : [];
        //now we're getting all jokes that people have added. We're also getting the names of the people who added them and sorting the jokes with the newest ones first
        const globalAddedJokes = await Joke.find()
            .populate('user', 'name')
            .sort({ '_id': -1 });
        //If there are no global jokes, we tell em "Global jokes not found"
        if (!globalAddedJokes) {
            return res.status(404).json({ error: "Global jokes not found" });
        }
        //otherwise we send back both the person's favorite jokes and all the jokes that have been added
        res.json({
            userFavoriteJokes: userFavoriteJokes,
            globalAddedJokes: globalAddedJokes
        });
    } catch (error) {
        console.error("Error in getAllJokes:", error);
        res.status(500).json({ error: "Can't fetch jokes" });
    }
}




//this function helps us delete our saved jokes
async function deleteJoke(req, res) {
    try {
        //We're getting the joke's ID from the person's request
        const jokeId = req.params.id;
        //We're looking up the joke using that ID
        const joke = await Joke.findById(jokeId);
        //We're checking two things here If we found the joke and if the person asking to delete it is the one who added it. If not, we tell them, "You can't be deleting someone else's joke"
        if (!joke || String(joke.user) !== String(req.user._id)) {
            return res.status(400).send('You cant be deleting someone elses joke');
        }
        //If it's their joke, we delete it. also we let em know its gone jus in case they wonderin
        await joke.remove();
        res.status(200).send('Joke deleted successfully');
    } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}

async function favoriteJoke(req, res) {
    try {
        //We get the joke's content from the person's request
        const jokeContent = req.body.content;
        //We tryna to find that joke in our list
        let joke = await Joke.findOne({ content: jokeContent });

        //If we didn't find it, we create a new one
        if (!joke) {
            joke = new Joke({ content: jokeContent, user: req.user._id });
        }
        //If the person hasn't already marked it as a favorite, we add them to the list of people who favorited the joke
        if(!joke.favoritedBy.includes(req.user._id)) {
            joke.favoritedBy.push(req.user._id);
        }
        //Then we save the joke, either with the new favorite mark or as a new joke
        
        await joke.save();

        res.status(200).json({ message: 'Joke marked as favorite' });

    } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}
