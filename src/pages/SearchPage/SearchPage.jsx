import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';

export default function SearchPage() {
    const [jokes, setJokes] = useState([]);

    return (
        <div>
            <SearchBar setJokes={setJokes} />
            <SearchResults jokes={jokes} />
        </div>
    );
}
