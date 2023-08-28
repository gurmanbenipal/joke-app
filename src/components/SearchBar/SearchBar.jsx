import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../pages/App/App.css';

export default function SearchBar({ setJokes }) {
  const [searchTerm, setSearchTerm] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/jokes/search?q=${searchTerm}`);
      const data = await response.json();
      console.log(data);
      setJokes(data);
    } catch (err) {
      console.error("Error fetching jokes:", err);
    }
  }

  return (
    <Form onSubmit={handleSearch} className="custom-search-form mb-3">
      <Form.Group>
        <Form.Control 
        className="custom-search-bar"
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Search (optional)"
        />
      </Form.Group>
      <Button variant="primary" type="submit">Get Jokes</Button>
    </Form>
);
}
