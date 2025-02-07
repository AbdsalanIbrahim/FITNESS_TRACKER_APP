import React, { useState } from 'react';

function AddExerciseForm() {
    const [exerciseData, setExerciseData] = useState({
        name: '',
        duration: '',
        calories_burned: '',
        user_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exerciseData)
        })
        .then(response => response.json())
        .then(newExercise => console.log('Added:', newExercise));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Exercise Name" value={exerciseData.name} onChange={(e) => setExerciseData({ ...exerciseData, name: e.target.value })} />
            <input type="number" placeholder="Duration (mins)" value={exerciseData.duration} onChange={(e) => setExerciseData({ ...exerciseData, duration: e.target.value })} />
            <input type="number" placeholder="Calories Burned" value={exerciseData.calories_burned} onChange={(e) => setExerciseData({ ...exerciseData, calories_burned: e.target.value })} />
            <input type="number" placeholder="User ID" value={exerciseData.user_id} onChange={(e) => setExerciseData({ ...exerciseData, user_id: e.target.value })} />
            <button type="submit">Add Exercise</button>
        </form>
    );
}

export default AddExerciseForm;