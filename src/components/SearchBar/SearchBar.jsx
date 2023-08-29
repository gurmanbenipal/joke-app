// Importing stuff we need from libraries
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Importing a stylesheet to make the search bar look cool
import '../../pages/App/App.css';

// Creating a "SearchBar" component
export default function SearchBar({ setJokes }) {
  // Using state to remember what the user is typing
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle searching when "Get Jokes" button is clicked
  async function handleSearch(e) {
    // Preventing the default behavior of the form, we dont want it to reload
    e.preventDefault();

    // Trying to fetch jokes from the server based on user's search
    try {
      // Sending a request to the server to get jokes using search term
      const response = await fetch(`/api/jokes/search?q=${searchTerm}`);
      // Converting the response data to JSON format
      const data = await response.json();
      // Logging the response data to console for review
      console.log(data);
      // Updating the jokes with the fetched data
      setJokes(data);
    } catch (err) {
      // Handling errors by showing a message to the user
      console.error("Error fetching jokes:", err);
    }
  }

  // Building the search bar component
  return (
    // Creating a form that triggers handleSearch when submitted
    <Form onSubmit={handleSearch} className="custom-search-form mb-3">
      <Form.Group>
        {/* Creating an input field for users to type their search */}
        <Form.Control 
          className="custom-search-bar"
          type="text" 
          // Displaying what the user is typing using state
          value={searchTerm} 
          // Updating the state as the user types
          onChange={e => setSearchTerm(e.target.value)} 
          placeholder="Search (optional)"
        />
      </Form.Group>
      {/* Adding a "Get Jokes" button */}
      <Button variant="primary" type="submit">Get Jokes</Button>
    </Form>
  );
}
