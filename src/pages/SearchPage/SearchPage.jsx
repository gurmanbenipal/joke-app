// Import the stuff we need
import { useState } from 'react'; 
import SearchBar from '../../components/SearchBar/SearchBar'; 
import SearchResults from '../../components/SearchResults/SearchResults';
import { useNavigate } from 'react-router-dom'; 
import '../../pages/App/App.css'; 

// This is our main function for the search page
export default function SearchPage() {
    // We're creating a place to store our jokes using the "useState" tool.
    const [jokes, setJokes] = useState([]); // Jokes will start as an empty list.

    // We're using the "useNavigate" tool to help us move to different pages.
    const navigate = useNavigate();

    // We're checking if a user is logged in by looking for a token in the browser storage.
    const user = localStorage.getItem('token');

    // This function helps us mark a joke as a favorite when the user clicks a button.
    function handleFavorite(joke) {
        // We're checking if the user isn't logged in.
        if (!user) {
            // If not logged in, we'll send the user to the login page.
            navigate('/login');
            // We stop here and don't do anything else.
            return; 
        }

        // If the user is logged in, we send a request to the server to mark the joke as a favorite.
        fetch('/api/jokes/favorite', {
            method: 'POST', // We're using the "POST" method to send data to the server.
            headers: {
                'Content-Type': 'application/json', // We're telling the server we're sending JSON data.
                'Authorization': `Bearer ${user}` // We're including the user's token to prove they're logged in.
            },
            body: JSON.stringify({ content: joke }) // We're sending the joke content to the server.
        })
        .then(response => {
            // We're checking if the server's response isn't all good.
            if (!response.ok) throw new Error(response.statusText);
            
            // We're checking the type of response we got from the server.
            const contentType = response.headers.get("content-type");
            // If it's JSON, we read the response as JSON.
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                // If not JSON, we read it as text.
                return response.text();
            }
        })
        .then(data => {
            // We're logging the data we got from the server to the console.
            console.log(data);
        });
    }

    // Here we start building our page by returning the content we want to show.
    return (
        <div>
            {/* We're putting a title at the top of the page. */}
            <h1 className="app-title">THE JOKE APP🤣</h1>
            {/* We're adding the search bar we imported earlier. */}
            <SearchBar setJokes={setJokes} />
            {/* We're showing the search results using the imported component. */}
            <SearchResults jokes={jokes} onFavorite={handleFavorite} user={user} />
        </div>
    );
}
