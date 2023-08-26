import { useState, useEffect } from 'react';
import UserJokes from '../../components/UserJokes/UserJokes';
import { getUser } from '../../utilities/users-service';

export default function BrowsePage() {
    const [userFavoriteJokes, setUserFavoriteJokes] = useState([]);
    const [globalAddedJokes, setGlobalAddedJokes] = useState([]);
    const user = getUser();

    useEffect(() => {
        async function fetchJokes() {
            try {
                const response = await fetch('/api/jokes/browse', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
        
                if (!response.ok) throw new Error('Failed to get jokes');
                const data = await response.json();
                if (data.userFavoriteJokes && data.globalAddedJokes) {
                    setUserFavoriteJokes(data.userFavoriteJokes);
                    setGlobalAddedJokes(data.globalAddedJokes);
                } else {
                    console.error("errorrrr");
                }
            } catch (err) {
                console.error("Error fetching jokes:", err);
            }
        }
    
        fetchJokes();
    }, []);

async function handleDelete(id) {
    try {
        const response = await fetch(`/api/jokes/${id}`, {
            method: 'DELETE',
            headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
    
        if (!response.ok) throw new Error('Failed to delete joke');
    
        setUserFavoriteJokes(prevJokes => prevJokes.filter(joke => joke._id !== id));
    
        setGlobalAddedJokes(prevJokes => prevJokes.filter(joke => joke._id !== id));
    
    } catch (err) {
        console.error("Error deleting joke:", err);
    }
}
    
    
    const filteredGlobalJokes = globalAddedJokes.filter(
        globalJoke => !userFavoriteJokes.some(
            favJoke => favJoke._id === globalJoke._id
        )
    );

return (
    <div>
        <UserJokes />

        {(userFavoriteJokes.length === 0 && filteredGlobalJokes.length === 0) && <p>No jokes yet</p>}

        {userFavoriteJokes.length > 0 && (
            <>
                    <h2>Your Favorites</h2>
                    <ul>
                        {userFavoriteJokes.map(joke => (
                        <li key={joke._id}>
                                {joke.content} - by {joke.user.name}
                                {String(joke.user._id) === String(user._id) && (
                                    <button onClick={() => handleDelete(joke._id)}>Delete</button>
                                )}
                            </li>
                ))}
                 </ul>
                </>
            )}

        {filteredGlobalJokes.length > 0 && (
                <>
                <h2>Global Added Jokes</h2>
                 <ul>
                    {filteredGlobalJokes.map(joke => (
                            <li key={joke._id}>
                                {joke.content} - by {joke.user.name}
                                {String(joke.user._id) === String(user._id) && (
                                <button onClick={() => handleDelete(joke._id)}>Delete</button>
                                )}
                            </li>
                        ))}
                </ul>
            </>
            )}
    </div>
    );
}
