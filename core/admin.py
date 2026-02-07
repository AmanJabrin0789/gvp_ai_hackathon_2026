from django.contrib import admin
from .models import Student, Attendance, Marks

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'roll_no', 'course', 'semester')
    search_fields = ('name', 'roll_no')
    list_filter = ('course', 'semester')

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'date', 'is_present')
    list_filter = ('date', 'is_present')
    search_fields = ('student__name', 'student__roll_no')

@admin.register(Marks)
class MarksAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'score')
    search_fields = ('student__name', 'subject')
    list_filter = ('subject',)
