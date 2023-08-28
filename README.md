# THE JOKE APP 🤣

Welcome to The Joke App! This application lets you search for jokes using an Api. Not only can you search for jokes, but you can also favorite and even add your own!. By logging in, view your favorite jokes and add some for others to check out.

## Features 🎭
- Search for hilarious jokes using a comprehensive API.
- Save your favorite jokes to a favorites list.
- Got a joke of your own? Add it and share it with the world!
- Access and manage your own jokes anytime.
- Browse jokes added by other comedy enthusiasts without logging in.

## Technologies Used 👨🏻‍💻
<img src="tech/atom.png" alt="REACT" width="35" height="35"> <img src="tech/html-5.png" alt="HTML5" width="50" height="45"> <img src="tech/css-3.png" alt="CSS" width="50" height="45"> <img src="tech/js.png" alt="JS" width="35" height="35"> <img src="tech/Visual_Studio_Code_1.35_icon.svg.png" alt="VS CODE" width="35" height="35"> <img src="tech/github-sign.png" alt="GIT HUB" width="35" height="35"> <img src="tech/node-js.png" alt="NODE JS" width="35" height="35"> <img src="tech/heroku.png" alt="HEROKU" width="35" height="35"> <img src="tech/pngwing.com.png" alt="MONGO" width="35" height="35"> <img src="tech/pngwing.com-2.png" alt="EXPRESS JS" width="55" height="40">

## Getting Started 🚀

1. [CLICK HERE TO START LAUGHING!](https://joke-app-81e6e8c2bc16.herokuapp.com/)
2. Sign in to add or favorite jokes.
3. Explore a vast collection of jokes using the search feature.
4. [ Trello Link ](https://trello.com/b/1uzHQtUK/joke-app)

## Application Instructions 📘

1. Without signing in:
   - Use the search bar to find and enjoy various jokes.
   - Explore jokes added or favorited by other users.
2. Sign in for a personalized experience.
3. Find a joke you love? Click 'Add to Favorites' to keep it close.
4. Feeling witty? Add your own joke and let others enjoy your humor.
5. Manage your personal collection and favorites anytime you want.

## Screenshots 📸

## Search Page
<img src="screenshots/Screenshot 2023-08-28 at 3.49.31 PM.png" alt="search page" width="500" height="400">

## After you search!
<img src="screenshots/Screenshot 2023-08-28 at 3.51.01 PM.png" alt="searching" width="500" height="400">

## Browse Page
<img src="screenshots/Screenshot 2023-08-28 at 3.51.34 PM.png" alt="browse page" width="500" height="400">

## Add Joke Page
<img src="screenshots/Screenshot 2023-08-28 at 3.51.40 PM.png" alt="add joke page" width="500" height="400">

## LogIn Page
<img src="screenshots/Screenshot 2023-08-28 at 4.43.53 PM.png" alt="login page" width="500" height="400">

## SignUp Page
<img src="screenshots/Screenshot 2023-08-28 at 4.43.59 PM.png" alt="signup page" width="500" height="400">


## CODE PREVIEW! 🔬 (SEARCHING FOR A JOKE USING AN API) 

```javascript
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
```

## Upcoming Features 🌟
- Categories to search jokes by genre (Dad jokes, tech jokes, etc.)
- Option to comment on and rate jokes added by others.
- Share your favorite jokes on social media platforms.
- Daily joke notifications to brighten your day.

## Data credits 📜

- [ Joke Data ](https://v2.jokeapi.dev/joke/Any?safe-mode): JokeAPI provides a vast collection of curated jokes from various genres and categories.

Please feel free to submit any bug reports or feedback. Enjoy your time with The Joke App, and remember, laughter is the best medicine! 😄🎉