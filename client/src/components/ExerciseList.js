import { useEffect, useState } from "react";

function ExerciseList() {
    const [exercises, setExercises] = useState([]);
    const [newExercise, setNewExercise] = useState({
        name: "",
        duration: "",
        calories_burned: "",
        user_id: 1,  // assuming a default user ID
    });
    const [editingExercise, setEditingExercise] = useState(null);

    // Fetch exercises from the backend
    useEffect(() => {
        fetch("http://localhost:5000/exercises")
            .then((res) => res.json())
            .then((data) => setExercises(data))
            .catch((err) => console.error("Error fetching exercises:", err));
    }, []);

    // Function to handle new exercise submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExercise) {
            // Update an existing exercise
            fetch(`http://localhost:5000/exercises/${editingExercise.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExercise),
            })
                .then((res) => res.json())
                .then((data) => {
                    setExercises(exercises.map((exercise) =>
                        exercise.id === editingExercise.id ? data : exercise
                    ));
                    setNewExercise({ name: "", duration: "", calories_burned: "", user_id: 1 });
                    setEditingExercise(null);
                })
                .catch((err) => console.error("Error updating exercise:", err));
        } else {
            // Add a new exercise
            fetch("http://localhost:5000/exercises", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExercise),
            })
                .then((res) => res.json())
                .then((data) => {
                    setExercises([...exercises, data]);
                    setNewExercise({ name: "", duration: "", calories_burned: "", user_id: 1 });
                })
                .catch((err) => console.error("Error adding exercise:", err));
        }
    };

    // Function to handle deleting an exercise
    const handleDelete = (exerciseId) => {
        fetch(`http://localhost:5000/exercises/${exerciseId}`, {
            method: "DELETE",
        })
            .then(() => {
                setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
            })
            .catch((err) => console.error("Error deleting exercise:", err));
    };

    // Function to handle editing an exercise
    const handleEdit = (exercise) => {
        setEditingExercise(exercise);
        setNewExercise({
            name: exercise.name,
            duration: exercise.duration,
            calories_burned: exercise.calories_burned,
            user_id: exercise.user_id,
        });
    };

    return (
        <div>
            <h2>Exercise List 🏋️</h2>
            {exercises.length > 0 ? (
                exercises.map((exercise) => (
                    <div key={exercise.id} style={{ marginBottom: "10px" }}>
                        <h4>{exercise.name}</h4>
                        <p>{exercise.duration} mins - {exercise.calories_burned} kcal</p>
                        <button onClick={() => handleEdit(exercise)}>Edit</button>
                        <button onClick={() => handleDelete(exercise.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No exercises found.</p>
            )}

            <h3>{editingExercise ? "Edit Exercise" : "Add New Exercise"}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Duration (mins)"
                    value={newExercise.duration}
                    onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Calories Burned"
                    value={newExercise.calories_burned}
                    onChange={(e) => setNewExercise({ ...newExercise, calories_burned: e.target.value })}
                    required
                />
                <button type="submit">{editingExercise ? "Update Exercise" : "Add Exercise"}</button>
            </form>
        </div>
    );
}

export default ExerciseList;
