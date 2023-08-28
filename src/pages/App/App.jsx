import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthPage from '../AuthPage/AuthPage';
import SearchPage from '../SearchPage/SearchPage';
import BrowsePage from '../BrowsePage/BrowsePage';
import AddJokePage from '../AddJokePage/AddJokePage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
    const [user, setUser] = useState(getUser());

    return (
        <main className="App">
            <NavBar user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/add-joke" element={user ? <AddJokePage /> : <AuthPage setUser={setUser} />} />
                <Route path="/login" element={<AuthPage setUser={setUser} />} />
            </Routes>
        </main>
    );
}
