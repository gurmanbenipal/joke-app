import { Link, useLocation } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../../pages/App/App.css';

export default function NavBar({ user, setUser }) {
    const location = useLocation();

    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Link to="/" className="navbar-brand navbar-brand-custom">JokeApp</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto nav-links-custom">
                    {location.pathname !== '/browse' && <Link to="/browse" className="nav-link">Browse</Link>}
                    {location.pathname !== '/' && <Link to="/" className="nav-link">Home</Link>}
                </Nav>
                <Nav className="logout-button-custom">
                    {user ? (
                        <Button variant="outline-light" onClick={handleLogOut}>Log Out</Button>
                    ) : (
                        <Link to="/login">
                            <Button variant="outline-light">Log In</Button>
                        </Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
