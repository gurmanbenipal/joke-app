import { useState, useEffect } from 'react';
import UserJokes from '../../components/UserJokes/UserJokes';

export default function BrowsePage() {
    const [jokes, setJokes] = useState([]);

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
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
