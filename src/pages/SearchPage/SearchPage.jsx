import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';

export default function SearchPage() {
    const [jokes, setJokes] = useState([]);

    function handleFavorite(joke) {
        fetch('/api/jokes/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({ content: joke })
        })
        .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(data => {
            console.log(data);
        })
        
    }
    

    return (
        <div>
            <SearchBar setJokes={setJokes} />
            <SearchResults jokes={jokes} onFavorite={handleFavorite} />
        </div>
    );
}
