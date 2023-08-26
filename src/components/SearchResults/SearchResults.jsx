export default function SearchResults({ jokes, onFavorite }) {
    return (
      <div>
        {jokes && jokes.joke ? 
          <>
            <p>{jokes.joke}</p>
            <button onClick={() => onFavorite(jokes.joke)}>Favorite</button>
          </> :
          jokes && jokes.setup ?
          <>
            <p>{jokes.setup}</p>
            <p>{jokes.delivery}</p>
            <button onClick={() => onFavorite(`${jokes.setup} ${jokes.delivery}`)}>Favorite</button>
          </> :
          <p>Click Get Jokes!</p>
        }
      </div>
    );
}
