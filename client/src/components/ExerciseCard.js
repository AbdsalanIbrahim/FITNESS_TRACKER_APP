import React from 'react';

function ExerciseCard({ exercise }) {
    return (
        <div className="exercise-card">
            <h3>{exercise.name}</h3>
            <p>Duration: {exercise.duration} mins</p>
            <p>Calories Burned: {exercise.calories_burned}</p>
            <p>Date: {new Date(exercise.date).toLocaleDateString()}</p>
        </div>
    );
}

export default ExerciseCard;
