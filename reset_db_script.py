import os
import django
import random
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_attendance.settings')
django.setup()

from core.models import Student, Attendance, Marks

def reset_and_seed():
    print("Deleting existing data...")
    Student.objects.all().delete()
    # Attendance and Marks will be deleted via cascade

    print("Creating demo data...")
    students_data = [
        {"name": "Aarav Patel", "roll_no": "1001", "course": "B.Tech", "semester": 3},
        {"name": "Ishita Sharma", "roll_no": "1002", "course": "BCA", "semester": 1},
        {"name": "Rohan Gupta", "roll_no": "1003", "course": "B.Tech", "semester": 5},
        {"name": "Sneha Singh", "roll_no": "1004", "course": "MCA", "semester": 2},
    ]

    for data in students_data:
        student = Student.objects.create(**data)
        print(f"Created {student}")

        # Add some attendance
        for i in range(5):
             date = datetime.date.today() - datetime.timedelta(days=i)
             Attendance.objects.create(student=student, date=date, is_present=True)

        # Add some marks
        Marks.objects.create(student=student, subject="Mathematics", score=random.randint(70, 95))
        Marks.objects.create(student=student, subject="Computer Science", score=random.randint(75, 98))

    print("Done! Added 4 demo students.")

if __name__ == '__main__':
    reset_and_seed()
