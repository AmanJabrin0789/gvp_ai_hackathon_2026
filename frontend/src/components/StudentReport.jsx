import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { User, Activity, Book, ArrowLeft, Download, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentReport() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`students/${id}/`);
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load student report");
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const downloadReport = () => {
        toast.success("Downloading report...");
        // Placeholder for download logic
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    if (!student) return <div style={{ textAlign: 'center', padding: '2rem' }}>Student not found</div>;

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/')}
                className="btn-text"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{
                            width: '5rem',
                            height: '5rem',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            {student.name.charAt(0)}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{student.name}</h1>
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                                <span>Roll No: {student.roll_no}</span>
                                <span>•</span>
                                <span>Semester {student.semester}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={downloadReport} className="btn-primary" style={{ background: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                        <Download size={18} /> Export Report
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', color: 'var(--success-500)' }}>
                            <Activity size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem' }}>Attendance Overview</h3>
                    </div>

                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                            {student.attendance_percentage}%
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>Total Attendance</p>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span>Progress</span>
                            <span style={{ color: student.attendance_percentage >= 75 ? 'var(--success-500)' : 'var(--danger-500)' }}>
                                {student.attendance_percentage >= 75 ? 'Excellent' : 'Needs Improvement'}
                            </span>
                        </div>
                        <div style={{ height: '0.5rem', background: 'var(--bg-input)', borderRadius: '1rem', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${student.attendance_percentage}%`,
                                background: student.attendance_percentage >= 75 ? 'var(--success-500)' : 'var(--danger-500)',
                                borderRadius: '1rem'
                            }} />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '0.5rem', color: 'var(--primary-400)' }}>
                            <Book size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem' }}>Academic Performance</h3>
                    </div>

                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                            {student.average_marks}
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>Average Score</p>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span>Performance</span>
                            <span>{student.performance_remark}</span>
                        </div>
                        <div style={{ height: '0.5rem', background: 'var(--bg-input)', borderRadius: '1rem', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${Math.min(student.average_marks, 100)}%`,
                                background: 'var(--primary-400)',
                                borderRadius: '1rem'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
