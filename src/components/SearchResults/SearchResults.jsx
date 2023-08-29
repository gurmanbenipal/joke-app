// Importing wtv component gotta have from the React Bootstrap library
import { Button } from 'react-bootstrap';

// Defining a component to display search results
export default function SearchResults({ jokes, onFavorite, user }) {
    // A function to handle marking a joke as favorite
    const handleFavorite = (joke) => {
        // We're calling the "onFavorite" function passed from the parent component
        // to mark the joke as favorite on the server.
        onFavorite(joke);

        // If the user is logged in, show an alert that the joke has been added to favorites.
        if (user) {
            window.alert("Joke has been added to Global favorites!");
        } else if(!user){
            window.alert("Please Login to favorite jokes!");
        }
    }

    // Building the display for the search results
    return (
        <div className="mb-3">
            {/* We're checking the structure of the "jokes" object */}
            {jokes && jokes.joke ? 
                // If the joke is in a certain structure, we display it
                <>
                    <p>{jokes.joke}</p>
                    {/* We're adding a "Favorite" button with a click event */}
                    <Button variant="success" onClick={() => handleFavorite(jokes.joke)}>Favorite</Button>
                </> :
                // If the structure is different, we display a different version
                jokes && jokes.setup ?
                <>
                    <p>{jokes.setup}</p>
                    <p>{jokes.delivery}</p>
                    <Button variant="success" onClick={() => handleFavorite(`${jokes.setup} ${jokes.delivery}`)}>Favorite</Button>
                </> :
                // If the structure doesn't match either of the above, we show a message
                <p>Click Get Jokes!</p>
            }
        </div>
    );
}
