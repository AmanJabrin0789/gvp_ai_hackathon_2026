================================================================================
SMART ATTENDANCE SYSTEM - AI-POWERED STUDENT MANAGEMENT
================================================================================

PROJECT OVERVIEW
-----------------
The Smart Attendance System is a modern web application designed to streamline student
attendance tracking and performance management. It features a premium, light-themed
User Interface (React) connected to a robust backend (Django REST Framework).

KEY FEATURES
------------
1.  **Dashboard & Directory**:
    -   Responsive Grid Layout for student cards.
    -   Real-time Search by Name or Roll Number.
    -   Visualize Attendance % and performance metrics.

2.  **Course Management**:
    -   Manage students across multiple courses (B.Tech, BCA, MCA, etc.).
    -   Filter attendance records by specific Course and Semester.

3.  **Premium Light UI**:
    -   Clean, distraction-free interface using 'Inter' typography.
    -   Soft shadows, modern gradients, and semantic status colors.
    -   No dark mode for consistent professional aesthetics.

4.  **Backend Integration**:
    -   Full Django Admin integration for managing Students, Attendance, and Marks.
    -   REST API endpoints for seamless frontend communication.
    -   Includes a script (`reset_db_script.py`) to seed demo data.

5.  **Parent Messaging System**:
    -   Automated notifications sent to parents for daily attendance updates.
    -   Real-time alerts for student marks and performance reports.
    -   Direct communication channel for important school announcements.

TECH STACK
----------
-   **Frontend**: React.js, Vite, React Router, Lucide Icons, Axios.
-   **Backend**: Django, Django REST Framework, Django Filter.
-   **Database**: SQLite (Default).

--------------------------------------------------------------------------------
SETUP INSTRUCTIONS
--------------------------------------------------------------------------------

PREREQUISITES:
-   Python 3.8+
-   Node.js 14+

1.  BACKEND SETUP (Django)
    ----------------------
    a.  Navigate to the project root:
        `cd d:\jangoenvironment\smart_attendance`

    b.  Create a virtual environment (optional but recommended):
        `python -m venv venv`
        `venv\Scripts\activate` (Windows)

    c.  Install dependencies:
        `pip install django djangorestframework django-cors-headers django-filter`

    d.  Apply database migrations:
        `python manage.py makemigrations`
        `python manage.py migrate`

    e.  (Optional) Reset DB & Load Demo Data:
        `python reset_db_script.py`

    f.  Run the server:
        `python manage.py runserver`
        > Server runs at http://127.0.0.1:8000/

2.  FRONTEND SETUP (React)
    ----------------------
    a.  Open a new terminal and navigate to frontend:
        `cd d:\jangoenvironment\smart_attendance\frontend`

    b.  Install dependencies:
        `npm install`

    c.  Run the development server:
        `npm run dev`
        > App runs at http://localhost:5173/

--------------------------------------------------------------------------------
API ENDPOINTS
--------------------------------------------------------------------------------
-   List Students:      GET  /api/students/
-   Create Student:     POST /api/students/
-   Mark Attendance:    POST /api/attendance/
-   Add Marks:          POST /api/marks/

ADMIN PANEL
-----------
Access the Django Admin panel to manage data directly:
URL: http://127.0.0.1:8000/admin/
(Create a superuser first with: `python manage.py createsuperuser`)
================================================================================
