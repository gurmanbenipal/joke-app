import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function UserJokes() {
    return (
        <div className="mb-4"> 
            <Link to="/add-joke">
            <Button className="btn-favorite" variant="primary">Add a Joke</Button>

            </Link>
        </div>
    );
}
