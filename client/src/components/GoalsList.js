import React, { useState, useEffect } from 'react';

function GoalsList() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/goals')
            .then(response => response.json())
            .then(data => setGoals(data));
    }, []);

    return (
        <div>
            <h2>Fitness Goals 🎯</h2>
            {goals.length > 0 ? (
                goals.map(goal => (
                    <div key={goal.id} className="goal-card">
                        <h3>{goal.goal_type}</h3>
                        <p>Target: {goal.goal_value}</p>
                        <p>User ID: {goal.user_id}</p>
                    </div>
                ))
            ) : (
                <p>No goals found.</p>
            )}
        </div>
    );
}

export default GoalsList;
