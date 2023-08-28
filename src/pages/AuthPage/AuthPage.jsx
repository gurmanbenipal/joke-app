import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Container, Button } from 'react-bootstrap';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <Container>
      <Button onClick={() => setShowSignUp(!showSignUp)} variant="warning">
            {showSignUp ? 'Log In' : 'Sign Up'}
        </Button>

        { showSignUp ? 
          <div>
            <h1>SignUp</h1>
            <SignUpForm setUser={setUser} />
          </div>
          :
          <div>
            <h1>Login</h1>
            <LoginForm setUser={setUser} />
          </div>
        }
      </Container>
    </main>
  );
}