from config import app, db  
from models import User, Exercise, Goal
from faker import Faker
import random

fake = Faker()

def seed_users(n=5):
    """Seeds Users into the database."""
    users = []
    for _ in range(n):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password()  
        )
        db.session.add(user)
        users.append(user)

    db.session.commit()
    print(f"{n} Users added.")
    return users

def seed_exercises(users, n=10):
    """Seeds Exercises, associating them with Users."""
    for _ in range(n):
        user = random.choice(users)  
        exercise = Exercise(
            name=fake.word(),
            duration=fake.random_int(min=10, max=60),
            calories_burned=fake.random_int(min=50, max=500),
            user_id=user.id  
        )
        db.session.add(exercise)

    db.session.commit()
    print(f"{n} Exercises added.")

def seed_goals(users, n=5):
    """Seeds Goals, associating them with Users."""
    for _ in range(n):
        user = random.choice(users)  
        goal = Goal(
            goal_type=fake.word(),
            goal_value=fake.random_int(min=50, max=200),
            user_id=user.id  
        )
        db.session.add(goal)

    db.session.commit()
    print(f"{n} Goals added.")

def main():
    with app.app_context():  
        db.create_all()  
        users = seed_users(5)
        seed_exercises(users, 10)
        seed_goals(users, 5)

if __name__ == '__main__':
    main()
