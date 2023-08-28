import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import UserJokes from '../../components/UserJokes/UserJokes';
import { getUser } from '../../utilities/users-service';
import './Browsepage.css';

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
        <Container>


            {(userFavoriteJokes.length === 0 && filteredGlobalJokes.length === 0) && 
                <Row className="mt-4">
                    <Col>
                        <p>No jokes yet</p>
                    </Col>
                </Row>
            }

            {userFavoriteJokes.length > 0 && (
                <Row className="mt-4">
                    <Col>
                        <h2>Your Favorites 😎</h2>
                        <ListGroup>
                            {userFavoriteJokes.map(joke => (
                                <ListGroup.Item key={joke._id}>
                                    {joke.content} - by {joke.user.name}
                                    {String(joke.user._id) === String(user._id) && (
                                        <Button variant="danger" size="sm" className="delete-btn" onClick={() => handleDelete(joke._id)}>Delete</Button>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            )}

{filteredGlobalJokes.length > 0 && (
    <Row className="mt-4 align-items-center"> 
        <Col>
            <div className="d-flex align-items-center justify-content-between"> 
                <h2>Global Added Jokes 😹</h2>
                <UserJokes />
            </div>
            <ListGroup>
                {filteredGlobalJokes.map(joke => (
                    <ListGroup.Item key={joke._id}>
                        {joke.content} - by {joke.user.name}
                        {String(joke.user._id) === String(user._id) && (
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