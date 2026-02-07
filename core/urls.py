from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, AttendanceViewSet, MarksViewSet, generate_sample_data

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'marks', MarksViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate_sample_data/', generate_sample_data, name='generate_sample_data'),
]
