import React from 'react';
import Chatbot from './Chatbot';
import './styles.css';

function App() {
    return (
        <div className="App">

            {/* Navbar */}
            <nav className="navbar">

                <div className="logo">
                    🤖 Gemini AI
                </div>

                <ul className="nav-links">
                    <li>Home</li>
                    <li>About</li>
                    <li>Features</li>
                    <li>Contact</li>
                </ul>

            </nav>

            {/* Chatbot */}
            <Chatbot />

        </div>
    );
}

export default App;