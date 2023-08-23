import { Link } from "react-router-dom";

export default function UserJokes() {
    return (
        <>
            <p>No jokes yet</p>
            <Link to="/add-joke">
                <button>Add a Joke</button>
            </Link>
        </>
    );
}
