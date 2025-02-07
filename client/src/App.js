import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExerciseList from './components/ExerciseList';
import AddExerciseForm from './components/AddExerciseForm';
import GoalsList from './components/GoalsList';
import UsersList from './components/UsersList';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercises" element={<ExerciseList />} />
                <Route path="/add-exercise" element={<AddExerciseForm />} />
                <Route path="/goals" element={<GoalsList />} />
                <Route path="/users" element={<UsersList />} />
            </Routes>
        </Router>
    );
}

export default App;
