import React, { useEffect, useState } from 'react';
import api from '../api';
import { Calendar, CheckCircle, XCircle, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AttendanceManager() {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState('B.Tech');
    const [selectedSemester, setSelectedSemester] = useState(1);

    useEffect(() => {
        fetchStudents();
    }, [selectedCourse, selectedSemester]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            // Client-side filtering for better UX with small data, or assume API handles it if large
            // For now, let's fetch all and filter client-side as per current architecture pattern in this file,
            // OR use the new API filters. Let's use API filters for efficiency.
            const response = await api.get(`students/?course=${selectedCourse}&semester=${selectedSemester}`);
            setStudents(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load students");
            setLoading(false);
        }
    };

    const markAttendance = async (studentId, status) => {
        try {
            await api.post('attendance/', {
                student: studentId,
                date: date,
                status: status
            });
            toast.success(`Marked as ${status}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to mark attendance");
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Daily Attendance</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Mark attendance for all students</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        className="input-field"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        style={{ padding: '0.5rem', width: 'auto' }}
                    >
                        {['B.Tech', 'BCA', 'MCA', 'M.Tech', 'B.Sc', 'M.Sc'].map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <select
                        className="input-field"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
                        style={{ padding: '0.5rem', width: 'auto' }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                            <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                    </select>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        background: 'var(--bg-card)',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)'
                    }}>
                        <Calendar size={20} color="var(--primary-500)" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-main)',
                                outline: 'none',
                                fontFamily: 'inherit',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table className="clean-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll No</th>
                                <th>Semester</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{student.roll_no}</td>
                                    <td>
                                        <span style={{
                                            background: 'var(--primary-100)',
                                            color: 'var(--primary-700)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}>
                                            Sem {student.semester}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                            <button
                                                onClick={() => markAttendance(student.id, 'Present')}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    padding: '0.5rem 1rem',
                                                    border: '1px solid var(--success-500)',
                                                    background: 'rgba(16, 185, 129, 0.1)',
                                                    color: 'var(--success-500)',
                                                    borderRadius: '0.5rem',
                                                    cursor: 'pointer',
                                                    fontWeight: 500,
                                                    transition: 'all 0.2s'
                                                }}
                                                className="hover:bg-green-500/20"
                                            >
                                                <CheckCircle size={16} /> Present
                                            </button>
                                            <button
                                                onClick={() => markAttendance(student.id, 'Absent')}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    padding: '0.5rem 1rem',
                                                    border: '1px solid var(--danger-500)',
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    color: 'var(--danger-500)',
                                                    borderRadius: '0.5rem',
                                                    cursor: 'pointer',
                                                    fontWeight: 500,
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <XCircle size={16} /> Absent
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
