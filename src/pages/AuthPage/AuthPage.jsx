import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Container, Button, Row, Col } from 'react-bootstrap';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <Container>
        <Row className="align-items-center mt-4"  >
          <Col>
            <h1>{showSignUp ? 'SignUp' : 'Login'}</h1>
          </Col>
          <Col xs="auto">
            <Button onClick={() => setShowSignUp(!showSignUp)} variant="warning" >
              {showSignUp ? 'Log In' : 'Sign Up'}
            </Button>
          </Col>
        </Row>

        {showSignUp ? 
          <div>
            <SignUpForm setUser={setUser} />
          </div>
          :
          <div>
            <LoginForm setUser={setUser} />
          </div>
        }
      </Container>
    </main>
  );
}
