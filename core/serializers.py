from rest_framework import serializers
from .models import Student, Attendance, Marks
from django.db.models import Avg

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marks
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    attendance_percentage = serializers.SerializerMethodField()
    average_marks = serializers.SerializerMethodField()
    performance_remark = serializers.SerializerMethodField()
    attendance_warning = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'roll_no', 'name', 'semester', 'attendance_percentage', 'average_marks', 'performance_remark', 'attendance_warning']

    def get_attendance_percentage(self, obj):
        total_days = obj.attendance_records.count()
        if total_days == 0:
            return 0
        present_days = obj.attendance_records.filter(is_present=True).count()
        return round((present_days / total_days) * 100, 2)

    def get_average_marks(self, obj):
        avg = obj.marks_records.aggregate(Avg('score'))['score__avg']
        return round(avg, 2) if avg is not None else 0

    def get_attendance_warning(self, obj):
        percentage = self.get_attendance_percentage(obj)
        if percentage < 75:
            return "⚠ Attendance Shortage (< 75%)"
        return "Good Attendance"

    def get_performance_remark(self, obj):
        avg_marks = self.get_average_marks(obj)
        if avg_marks >= 75:
            return "Good"
        elif 50 <= avg_marks < 75:
            return "Average"
        else:
            return "Needs Improvement"
