import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function AddJokeForm() {
    const [jokeContent, setJokeContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!jokeContent.trim()) {
            alert("Please type a joke before submitting");
            return;
        }

        try {
            const response = await fetch('/api/jokes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({ content: jokeContent })
            });
            

            const responseData = await response.json();
            if (response.status === 201) {
                setJokeContent(''); 
                alert("Your joke was added!");
            } else {
                console.error("Server response:", responseData);
                alert("There was an issue addin ur joke");
            }
            
        } catch (error) {
            console.error("Error adding joke:", error);
            alert("There was an error");
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group>
                <Form.Label>Your Joke:</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={jokeContent} 
                    onChange={(e) => setJokeContent(e.target.value)}
                    placeholder="Type your joke here"
                />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Joke</Button>
        </Form>
    );
}

export default AddJokeForm;
