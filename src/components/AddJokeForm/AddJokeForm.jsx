import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function AddJokeForm() {

    // Create a state variable 'jokeContent' to hold the user's input joke.
    const [jokeContent, setJokeContent] = useState('');

    // Define the 'handleSubmit' function to be called when the form is submitted.
    const handleSubmit = async (event) => {
        
        // Stop the browser from automatically sending the form data
        event.preventDefault();

        // Check if the jokeContent is empty or just spaces.
        if (!jokeContent.trim()) {
            alert("Please type a joke before submitting");
            return;  
        }

        // Try to send the joke to the server.
        try {

            // Send a POST request to '/api/jokes/' with the joke content.
            const response = await fetch('/api/jokes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Get the token from local storage to verify the user's identity.
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({ content: jokeContent }) // Convert joke to JSON format.
            });
            
            // Convert the server's response to JSON format.
            const responseData = await response.json();
            
            // If the server responds with status 201, the joke was added successfully.
            if (response.status === 201) {
                // Clear the joke content for the next joke.
                setJokeContent(''); 
                alert("Your joke was added to Global personals!");
            } else {
                // If there was an issue, print the server's response and show an alert.
                console.error("Server response:", responseData);
                alert("There was an issue adding your joke");
            }
            
        } catch (error) {
            console.error("Error adding joke:", error);
            alert("There was an error");
        }
    };

    // Render the form.
    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group>
                <Form.Label>Your Joke:</Form.Label>
                {/* Render a textarea that shows the joke content and updates the state when changed. */}
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={jokeContent} 
                    onChange={(e) => setJokeContent(e.target.value)}
                    placeholder="Type your joke here"
                />
            </Form.Group>
             {/* Render a button to submit the form. */}
            <Button variant="primary" type="submit">Submit Joke</Button>
        </Form>
    );
}

// Export the 'AddJokeForm' component so it can be used in other parts of the application.
export default AddJokeForm;
