import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Go up one level to find styles.css

function Navbar() {
    return (
        <nav className="navbar">
            <h2>🏋️‍♂️ Fitness Tracker</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/exercises">Exercises</Link></li>
                <li><Link to="/goals">Goals</Link></li>
                <li><Link to="/users">Users</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
