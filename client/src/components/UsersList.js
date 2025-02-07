import React, { useState, useEffect } from 'react';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div>
            <h2>Users 👤</h2>
            {users.length > 0 ? (
                users.map(user => (
                    <div key={user.id} className="user-card">
                        <h3>{user.username}</h3>
                        <p>Email: {user.email}</p>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default UsersList;
