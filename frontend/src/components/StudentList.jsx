import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { User, Users, Activity, AlertTriangle, Book, Download, RefreshCw, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await api.get('students/');
            if (Array.isArray(response.data)) {
                setStudents(response.data);
            } else {
                console.error("API did not return an array", response.data);
                setStudents([]);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load students");
            setLoading(false);
        }
    };

    const generateData = async () => {
        try {
            const toastId = toast.loading("Generating AI-driven sample data...");
            await api.post('generate_sample_data/');
            toast.success("Successfully generated sample data!", { id: toastId });
            fetchStudents();
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate data");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        Student Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage attendance and performance records</p>
                </div>
                <button
                    onClick={generateData}
                    className="btn-primary"
                    style={{ gap: '0.5rem' }}
                >
                    <Smartphone size={20} />
                    <span>Auto-Generate Data (AI)</span>
                </button>
            </div>

            <div className="search-bar-container" style={{ marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Search by Name or Roll Number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                    style={{ padding: '0.75rem', fontSize: '1rem' }}
                />
            </div>

            <div className="dashboard-grid">
                {students.filter(student =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.roll_no.includes(searchTerm)
                ).map(student => (
                    <Link to={`/student/${student.id}`} key={student.id} className="card" style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.25rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}>
                                {student.name.charAt(0)}
                            </div>
                            <span className={`badge ${student.performance_remark === 'Good' ? 'badge-success' :
                                student.performance_remark === 'Average' ? 'badge-warning' :
                                    'badge-danger'
                                }`}>
                                {student.performance_remark}
                            </span>
                        </div>

                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{student.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                            Roll No: {student.roll_no} • Sem: {student.semester}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Activity size={16} color="var(--success-500)" /> Attendance
                                    </span>
                                    <span style={{ fontWeight: 600 }}>{student.attendance_percentage}%</span>
                                </div>
                                <div style={{ height: '0.375rem', background: 'var(--border-color)', borderRadius: '9999px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            borderRadius: '9999px',
                                            width: `${student.attendance_percentage}%`,
                                            backgroundColor: student.attendance_percentage >= 75 ? 'var(--success-500)' :
                                                student.attendance_percentage >= 50 ? 'var(--warning-500)' : 'var(--danger-500)',
                                            transition: 'width 1s ease-in-out'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Book size={16} color="var(--primary-400)" /> Avg Marks
                                    </span>
                                    <span style={{ fontWeight: 600 }}>{student.average_marks}</span>
                                </div>
                                <div style={{ height: '0.375rem', background: 'var(--border-color)', borderRadius: '9999px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            borderRadius: '9999px',
                                            width: `${Math.min(student.average_marks, 100)}%`,
                                            backgroundColor: 'var(--primary-400)',
                                            transition: 'width 1s ease-in-out'
                                        }}
                                    />
                                </div>
                            </div>

                            {student.attendance_warning && student.attendance_warning.includes("Shortage") && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.5rem',
                                    padding: '0.5rem',
                                    borderRadius: '0.25rem',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    border: '1px solid rgba(239, 68, 68, 0.1)',
                                    color: 'var(--danger-500)',
                                    fontSize: '0.75rem'
                                }}>
                                    <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                                    <span>{student.attendance_warning}</span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}

                {students.filter(student =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.roll_no.includes(searchTerm)
                ).length === 0 && (
                        <div style={{
                            gridColumn: '1 / -1',
                            padding: '4rem',
                            textAlign: 'center',
                            borderRadius: '1rem',
                            border: '1px dashed var(--border-color)',
                            background: 'var(--bg-card)'
                        }}>
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '50%',
                                background: 'var(--bg-input)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto'
                            }}>
                                <Users size={32} color="var(--text-muted)" />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>No students found</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '24rem', margin: '0 auto 1.5rem auto' }}>
                                Get started by adding a new student or generating sample data.
                            </p>
                            <button onClick={generateData} className="btn-primary">
                                Generate Sample Data
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
}
