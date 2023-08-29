// Here, we're getting some stuff we need for our page.
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import UserJokes from '../../components/UserJokes/UserJokes';
import { getUser } from '../../utilities/users-service';
import './Browsepage.css';

// We're making a new component called "BrowsePage"
export default function BrowsePage() {
    // We're making spaces to store our favorite jokes and global jokes.
    const [userFavoriteJokes, setUserFavoriteJokes] = useState([]);
    const [globalAddedJokes, setGlobalAddedJokes] = useState([]);
    // Getting the current user's details.
    const user = getUser();

    // This bit happens automatically when our page loads up.
    useEffect(() => {
        // We're creating a function to get jokes.
        async function fetchJokes() {
            try {
                // We're asking our server for jokes.
                const response = await fetch('/api/jokes/browse', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // If the server says "nope", we complain.
                if (!response.ok) throw new Error('Failed to get jokes');
                // Otherwise, we take the jokes the server gave us.
                const data = await response.json();
                // If the data has our favorite jokes and global jokes, we store them.
                if (data.userFavoriteJokes && data.globalAddedJokes) {
                    setUserFavoriteJokes(data.userFavoriteJokes);
                    setGlobalAddedJokes(data.globalAddedJokes);
                } else {
                    // If something's weird, we write "error" 
                    console.error("errorrrr");
                }
            } catch (err) {
                // If anything breaks, we write that too
                console.error("Error fetching jokes:", err);
            }
        }

        // Now we run our joke grabbin function!
        fetchJokes();
    }, []);

    // This is a function that deletes a joke by its ID.
    async function handleDelete(id) {
        try {
            // We tell the server to delete a specific joke.
            const response = await fetch(`/api/jokes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            // If the server says "nope", we complain.
            if (!response.ok) throw new Error('Failed to delete joke');

            // We remove the joke from our stored jokes.
            setUserFavoriteJokes(prevJokes => prevJokes.filter(joke => joke._id !== id));
            setGlobalAddedJokes(prevJokes => prevJokes.filter(joke => joke._id !== id));

        } catch (err) {
            // If anything breaks, we write that in our diary.
            console.error("Error deleting joke:", err);
        }
    }

    // We're making a new list that only includes global jokes not in our favorites.
    const filteredGlobalJokes = globalAddedJokes.filter(
        globalJoke => !userFavoriteJokes.some(
            favJoke => favJoke._id === globalJoke._id
        )
    );

    // We're checking if a joke is "good" to display.
    const validJokes = (jokeArray) => jokeArray.filter(joke => joke && joke._id && joke.user && joke.user.name);

    // Now, we decide what our page will show.
    return (
        <Container>
            {/* If we don't have any jokes to show, display "No jokes yet". */}
            {(userFavoriteJokes.length === 0 && filteredGlobalJokes.length === 0) && 
                <Row className="mt-4">
                    <Col>
                        <p>No jokes yet</p>
                    </Col>
                </Row>
            }

            {/* If we have favorite jokes, display them with a title. */}
            {userFavoriteJokes.length > 0 && (
                <Row className="mt-4">
                    <Col>
                        <h2>Your Favorites 😎</h2>
                        {/* Here, we list out our favorite jokes. */}
                        <ListGroup>
                            {validJokes(userFavoriteJokes).map(joke => (
                                <ListGroup.Item key={joke._id}>
                                    {joke.content} - by {joke.user?.name}
                                    {/* If the joke is by us, show a delete button. */}
                                    {String(joke.user?._id) === String(user?._id) && (
                                        <Button variant="danger" size="sm" className="delete-btn" onClick={() => handleDelete(joke._id)}>Delete</Button>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            )}

            {/* If we have global jokes, display them with a title. */}
            {filteredGlobalJokes.length > 0 && (
                <Row className="mt-4 align-items-center"> 
                    <Col>
                        <div className="d-flex align-items-center justify-content-between"> 
                            <h2>Global Favorites & Personal Jokes 😹</h2>
                            {/* Display UserJokes component */}
                            <UserJokes />
                        </div>
                        {/* Here, we list out the global jokes. */}
                        <ListGroup>
                            {validJokes(filteredGlobalJokes).map(joke => (
                                <ListGroup.Item key={joke._id}>
                                    {joke.content} - by {joke.user?.name}
                                    {/* If the joke is by us, show a delete button. */}
                                    {String(joke.user?._id) === String(user?._id) && (
                                        <Button variant="danger" size="sm" className="delete-btn" onClick={() => handleDelete(joke._id)}>Delete</Button>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
