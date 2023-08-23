import { Link } from "react-router-dom";

export default function UserJokes() {
    return (
        <>
            <Link to="/add-joke">
                <button>Add a Joke</button>
            </Link>
        </>
    );
}
