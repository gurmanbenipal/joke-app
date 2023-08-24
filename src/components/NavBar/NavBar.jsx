import { Link, useLocation } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  const location = useLocation();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      {location.pathname !== '/browse' && (
        <>
          <Link to="/browse">Browse</Link>
          &nbsp; | &nbsp;
        </>
      )}
      {location.pathname !== '/' && (
        <>
          <Link to="/">Home</Link>
          &nbsp;&nbsp; | &nbsp;&nbsp;
        </>
      )}
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}
