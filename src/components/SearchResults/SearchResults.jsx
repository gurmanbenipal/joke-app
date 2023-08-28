import { Button } from 'react-bootstrap';

export default function SearchResults({ jokes, onFavorite, user }) {
    const handleFavorite = (joke) => {
        onFavorite(joke);
        if (user) {
            window.alert("Joke has been added to Global favorites!");
        }
    }

    return (
      <div className="mb-3">
        {jokes && jokes.joke ? 
          <>
            <p>{jokes.joke}</p>
            <Button variant="success" onClick={() => handleFavorite(jokes.joke)}>Favorite</Button>
          </> :
          jokes && jokes.setup ?
          <>
            <p>{jokes.setup}</p>
            <p>{jokes.delivery}</p>
            <Button variant="success" onClick={() => handleFavorite(`${jokes.setup} ${jokes.delivery}`)}>Favorite</Button>
          </> :
          <p>Click Get Jokes!</p>
        }
      </div>
    );
}
