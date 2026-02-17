from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from .models import Student, Attendance, Marks
from .serializers import StudentSerializer, AttendanceSerializer, MarksSerializer
import random
import datetime

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['semester', 'course']
    search_fields = ['name', 'roll_no']

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class MarksViewSet(viewsets.ModelViewSet):
    queryset = Marks.objects.all()
    serializer_class = MarksSerializer

@api_view(['POST'])
def generate_sample_data(request):
    """
    AI-Assisted Feature: Auto-generate sample student data with random attendance and marks.
    """
    first_names = ["Rahul", "Priya", "Amit", "Sneha", "Karan", "Anjali", "Rohan", "Meera", "Vikram", "Neha"]
    last_names = ["Shah", "Patel", "Sharma", "Verma", "Singh", "Gupta", "Kumar", "Joshi", "Mehta", "Reddy"]
    semesters = [1, 2, 3, 4, 5, 6, 7, 8]
    courses = ["B.Tech", "BCA", "MCA", "M.Tech", "B.Sc", "M.Sc"]
    subjects = ["Maths", "Physics", "Chemistry", "Computer Science", "English"]

    created_students = []

    for i in range(5):  # Create 5 random students
        roll_no = str(random.randint(1000, 9999))
        name = f"{random.choice(first_names)} {random.choice(last_names)}"
        semester = random.choice(semesters)
        course = random.choice(courses)
        
        # Avoid duplicate roll numbers
        if Student.objects.filter(roll_no=roll_no).exists():
            continue

        student = Student.objects.create(roll_no=roll_no, name=name, semester=semester, course=course)
        created_students.append(student.id)

        # Generate fake attendance (last 5 days)
        for j in range(5):
            date = datetime.date.today() - datetime.timedelta(days=j)
            is_present = random.choice([True, True, False]) # skewed towards present
            Attendance.objects.create(student=student, date=date, is_present=is_present)

        # Generate fake marks
        for subject in subjects:
            score = random.randint(30, 95)
            Marks.objects.create(student=student, subject=subject, score=score)

    return Response({"message": f"Successfully generated {len(created_students)} sample students logic-based AI assistance."})
