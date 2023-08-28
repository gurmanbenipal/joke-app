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
    <Navbar.Brand href="/" className="navbar-brand-custom">JokeApp</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-links-custom">
            {location.pathname !== '/browse' && <Nav.Link href="/browse">Browse</Nav.Link>}
            {location.pathname !== '/' && <Nav.Link href="/">Home</Nav.Link>}
        </Nav>
        <Nav className="logout-button-custom">
            <Button variant="outline-light" onClick={handleLogOut}>Log Out</Button>
        </Nav>
    </Navbar.Collapse>
</Navbar>

  );
}
