import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminApp from './pages/AdminApp';
import UserApp from './pages/UserApp';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/adminapp" element={<AdminApp />} />
                    <Route path="/userapp" element={<UserApp />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
