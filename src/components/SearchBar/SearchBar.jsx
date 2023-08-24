import { useState } from 'react';

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
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        placeholder="Search (optional)"
      />
      <button type="submit">Get Jokes</button>
    </form>
  );
}
