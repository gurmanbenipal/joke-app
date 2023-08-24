import { useState, useEffect } from 'react';
import UserJokes from '../../components/UserJokes/UserJokes';
import { getUser } from '../../utilities/users-service';

export default function BrowsePage() {
    const [jokes, setJokes] = useState([]);
    const user = getUser();

    useEffect(() => {
        async function fetchJokes() {
            try {
                const response = await fetch('/api/jokes/browse');
                if (!response.ok) throw new Error('Failed to fetch jokes');

                const data = await response.json();
                setJokes(data);
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
            setJokes(jokes => jokes.filter(joke => joke._id !== id));
        } catch (err) {
            console.error("Error deleting joke:", err);
        }
    }

    if (jokes.length === 0) {
        return (
            <div>
                <h1>User Jokes</h1>
                <UserJokes />
                <p>No jokes yet</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>User Jokes</h1>
                <UserJokes />
                <ul>
                    {jokes.map(joke => (
                        <li key={joke._id}>
                            {joke.content} - by {joke.user.name}
                            {String(joke.user._id) === String(user._id) && (
                                <button onClick={() => handleDelete(joke._id)}>Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
