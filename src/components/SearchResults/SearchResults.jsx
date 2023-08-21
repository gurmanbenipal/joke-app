export default function SearchResults({ jokes }) {
    return (
      <div>
        {jokes && jokes.joke ? 
          <p>{jokes.joke}</p> : 
          jokes && jokes.setup ?
          <>
            <p>{jokes.setup}</p>
            <p>{jokes.delivery}</p>
          </> :
          <p>No jokes found!</p>
        }
      </div>
    );
  }
  