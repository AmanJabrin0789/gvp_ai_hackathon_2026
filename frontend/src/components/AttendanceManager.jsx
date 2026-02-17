import React, { useEffect, useState } from 'react';
import api from '../api';
import { Calendar, CheckCircle, XCircle, UserCheck, Download, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AttendanceManager() {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState('B.Tech');
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [attendanceMap, setAttendanceMap] = useState({}); // Stores { studentId: 'Present' | 'Absent' }

    useEffect(() => {
        fetchStudents();
    }, [selectedCourse, selectedSemester]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await api.get(`students/?course=${selectedCourse}&semester=${selectedSemester}`);
            const studentData = Array.isArray(response.data) ? response.data : [];
            setStudents(studentData);

            // Initialize all students as 'Present' by default
            const initialAttendance = {};
            studentData.forEach(s => {
                initialAttendance[s.id] = 'Present';
            });
            setAttendanceMap(initialAttendance);

            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load students");
            setLoading(false);
        }
    };

    const toggleAttendance = (studentId) => {
        setAttendanceMap(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present'
        }));
    };

    const submitAttendance = async () => {
        try {
            const promises = Object.entries(attendanceMap).map(([studentId, status]) => {
                return api.post('attendance/', {
                    student: studentId,
                    date: date,
                    is_present: status === 'Present'
                });
            });

            await Promise.all(promises);
            toast.success("Attendance submitted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit attendance");
        }
    };

    const downloadCSV = () => {
        if (students.length === 0) {
            toast.error("No students to export");
            return;
        }

        const headers = ["Roll No", "Name", "Course", "Semester", "Date", "Status"];
        const rows = students.map(student => [
            student.roll_no,
            student.name,
            selectedCourse,
            selectedSemester,
            date,
            attendanceMap[student.id] || "Absent"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `attendance_${selectedCourse}_sem${selectedSemester}_${date}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Daily Attendance</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Mark and track student attendance records</p>
            </div>

            {/* Filter & Controls Panel */}
            <div className="glass-panel" style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Left: Filters */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <Filter size={18} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Filters:</span>
                    </div>

                    <select
                        className="input-field"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        style={{ padding: '0.6rem 1rem', width: 'auto', minWidth: '140px' }}
                    >
                        {['B.Tech', 'BCA', 'MCA', 'M.Tech', 'B.Sc', 'M.Sc'].map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <select
                        className="input-field"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
                        style={{ padding: '0.6rem 1rem', width: 'auto', minWidth: '140px' }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                            <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                    </select>

                    <div className="input-field" style={{ padding: '0.6rem 1rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} color="var(--primary-500)" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                color: 'var(--text-main)',
                                fontFamily: 'inherit',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem 1rem',
                        background: 'var(--primary-50)',
                        borderRadius: '2rem',
                        border: '1px solid var(--primary-100)'
                    }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-700)' }}>Quick Set:</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => {
                                    const newAttendance = {};
                                    students.forEach(s => newAttendance[s.id] = 'Present');
                                    setAttendanceMap(newAttendance);
                                    toast.success("All marked Present");
                                }}
                                className="btn-text"
                                style={{ fontSize: '0.8rem', color: 'var(--success-500)', fontWeight: 700 }}
                            >
                                All P
                            </button>
                            <div style={{ width: '1px', height: '16px', background: 'var(--primary-200)' }}></div>
                            <button
                                onClick={() => {
                                    const newAttendance = {};
                                    students.forEach(s => newAttendance[s.id] = 'Absent');
                                    setAttendanceMap(newAttendance);
                                    toast.success("All marked Absent");
                                }}
                                className="btn-text"
                                style={{ fontSize: '0.8rem', color: 'var(--danger-500)', fontWeight: 700 }}
                            >
                                All A
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance List */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
                <div className="table-container">
                    <table className="clean-table">
                        <thead>
                            <tr style={{ background: 'var(--slate-50)' }}>
                                <th style={{ width: '35%' }}>Student Name</th>
                                <th style={{ width: '20%' }}>Roll No</th>
                                <th style={{ width: '15%' }}>Semester</th>
                                <th style={{ textAlign: 'right', paddingRight: '2rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => {
                                const isPresent = attendanceMap[student.id] === 'Present';
                                return (
                                    <tr key={student.id} style={{ transition: 'background 0.2s' }}>
                                        <td style={{ fontWeight: 600 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
                                                    color: 'var(--primary-700)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700
                                                }}>
                                                    {student.name.charAt(0)}
                                                </div>
                                                {student.name}
                                            </div>
                                        </td>
                                        <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{student.roll_no}</td>
                                        <td>
                                            <span style={{
                                                background: 'var(--slate-100)',
                                                color: 'var(--slate-600)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                border: '1px solid var(--slate-200)'
                                            }}>
                                                Sem {student.semester}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: '2rem' }}>
                                            <button
                                                onClick={() => toggleAttendance(student.id)}
                                                style={{
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '2rem',
                                                    border: 'none',
                                                    background: isPresent ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: isPresent ? 'var(--success-500)' : 'var(--danger-500)',
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    fontWeight: 600,
                                                    minWidth: '110px',
                                                    justifyContent: 'center'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1.05)';
                                                    e.currentTarget.style.background = isPresent ? 'var(--success-500)' : 'var(--danger-500)';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                    e.currentTarget.style.background = isPresent ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
                                                    e.currentTarget.style.color = isPresent ? 'var(--success-500)' : 'var(--danger-500)';
                                                }}
                                            >
                                                {isPresent ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                                {isPresent ? 'Present' : 'Absent'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {students.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <UserCheck size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <p style={{ fontSize: '1.1rem' }}>No students found for <strong>{selectedCourse} - Semester {selectedSemester}</strong>.</p>
                        <p style={{ marginTop: '0.5rem' }}>Select a different course or semester to start marking attendance.</p>
                    </div>
                )}
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '2rem',
                gap: '1rem',
                position: 'sticky',
                bottom: '2rem',
                zIndex: 40
            }}>
                <button
                    onClick={downloadCSV}
                    className="btn-secondary"
                    style={{ background: 'white', boxShadow: 'var(--shadow-lg)' }}
                >
                    <Download size={20} />
                    Export CSV
                </button>
                <button
                    onClick={submitAttendance}
                    className="btn-primary"
                    style={{ boxShadow: 'var(--shadow-glow)' }}
                >
                    <CheckCircle size={20} />
                    Submit Attendance
                </button>
            </div>
        </div>
    );
}
