import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <label>
                Your Joke:
                <textarea 
                    value={jokeContent} 
                    onChange={(e) => setJokeContent(e.target.value)}
                    placeholder="Type your joke here"
                ></textarea>
            </label>
            <button type="submit">Submit Joke</button>
        </form>
    );
}

export default AddJokeForm;
