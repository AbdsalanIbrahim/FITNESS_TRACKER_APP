from flask import Flask, jsonify, request
from flask_cors import CORS
from config import db
from models import User, Exercise, Goal

app = Flask(__name__)
CORS(app)  

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitness_tracker.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  


@app.route('/users', methods=['GET'])
def get_users():
    """Fetch all users."""
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Fetch a single user by ID."""
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict())
    return jsonify({"error": "User not found"}), 404

@app.route('/users', methods=['POST'])
def create_user():
    """Create a new user."""
    data = request.json
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201


@app.route('/exercises', methods=['GET'])
def get_exercises():
    """Fetch all exercises."""
    exercises = Exercise.query.all()
    return jsonify([exercise.to_dict() for exercise in exercises])

@app.route('/exercises/<int:user_id>', methods=['GET'])
def get_exercises_by_user(user_id):
    """Fetch exercises for a specific user."""
    exercises = Exercise.query.filter_by(user_id=user_id).all()
    return jsonify([exercise.to_dict() for exercise in exercises])

@app.route('/exercises', methods=['POST'])
def create_exercise():
    """Create a new exercise."""
    data = request.json
    new_exercise = Exercise(
        name=data['name'],
        duration=data['duration'],
        calories_burned=data['calories_burned'],
        user_id=data['user_id']
    )
    db.session.add(new_exercise)
    db.session.commit()
    return jsonify(new_exercise.to_dict()), 201

@app.route('/exercises/<int:exercise_id>', methods=['DELETE'])
def delete_exercise(exercise_id):
    """Delete an exercise by its ID."""
    exercise = Exercise.query.get(exercise_id)
    if exercise:
        db.session.delete(exercise)
        db.session.commit()
        return jsonify({"message": "Exercise deleted"}), 200
    return jsonify({"error": "Exercise not found"}), 404


@app.route('/goals', methods=['GET'])
def get_goals():
    """Fetch all goals."""
    goals = Goal.query.all()
    return jsonify([goal.to_dict() for goal in goals])

@app.route('/goals/<int:user_id>', methods=['GET'])
def get_goals_by_user(user_id):
    """Fetch goals for a specific user."""
    goals = Goal.query.filter_by(user_id=user_id).all()
    return jsonify([goal.to_dict() for goal in goals])

@app.route('/goals', methods=['POST'])
def create_goal():
    """Create a new goal."""
    data = request.json
    new_goal = Goal(goal_type=data['goal_type'], goal_value=data['goal_value'], user_id=data['user_id'])
    db.session.add(new_goal)
    db.session.commit()
    return jsonify(new_goal.to_dict()), 201


if __name__ == '__main__':
    app.run(debug=True)
