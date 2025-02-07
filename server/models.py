from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

class User(db.Model, SerializerMixin):
    """User model to store user information."""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False) 

    exercises = db.relationship('Exercise', backref='user', lazy=True)
    goals = db.relationship('Goal', backref='user', lazy=True)

    exercise_names = association_proxy('exercises', 'name')

    def __repr__(self):
        return f"<User {self.username}>"

    def to_dict(self):
        """Custom to_dict method to avoid recursion."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'exercises': [exercise.to_dict() for exercise in self.exercises],
            'goals': [goal.to_dict() for goal in self.goals]
        }

class Exercise(db.Model, SerializerMixin):
    """Exercise model to store exercise details."""
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Float, nullable=False)
    calories_burned = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Exercise {self.name} for User {self.user_id}>"

    def to_dict(self):
        """Custom to_dict method for Exercise to avoid including user details."""
        return {
            'id': self.id,
            'name': self.name,
            'duration': self.duration,
            'calories_burned': self.calories_burned,
            'date': self.date,
            'user_id': self.user_id
        }

class Goal(db.Model, SerializerMixin):
    """Goal model to store fitness goals of the user."""
    __tablename__ = 'goals'
    id = db.Column(db.Integer, primary_key=True)
    goal_type = db.Column(db.String(50), nullable=False)
    goal_value = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Goal {self.goal_type} for User {self.user_id}>"

    def to_dict(self):
        """Custom to_dict method for Goal to avoid including user details."""
        return {
            'id': self.id,
            'goal_type': self.goal_type,
            'goal_value': self.goal_value,
            'user_id': self.user_id
        }
