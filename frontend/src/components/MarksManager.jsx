import React, { useEffect, useState } from 'react';
import api from '../api';
import { Award, Save, GraduationCap, BookOpen, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MarksManager() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('students/');
                setStudents(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load students");
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('marks/', {
                student: selectedStudent,
                subject: subject,
                score: marks
            });
            toast.success("Marks added successfully");
            setSubject('');
            setMarks('');
            setSelectedStudent('');
        } catch (error) {
            console.error(error);
            toast.error("Failed to add marks");
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '2rem' }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)',
                    transform: 'rotate(-5deg)'
                }}>
                    <GraduationCap size={32} color="var(--primary-600)" strokeWidth={2.5} />
                </div>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Performance Evaluation</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Record student grades and academic achievements</p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>

                    {/* Student Select */}
                    <div>
                        <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} /> Select Student
                        </label>
                        <select
                            className="input-field"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            required
                            style={{ fontSize: '1rem', padding: '1rem' }}
                        >
                            <option value="">Choose a student...</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name} (Roll: {s.roll_no})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Subject */}
                        <div>
                            <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <BookOpen size={16} /> Subject Name
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Data Structures"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                style={{ padding: '1rem' }}
                            />
                        </div>

                        {/* Marks */}
                        <div>
                            <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Award size={16} /> Score
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="0-100"
                                    min="0"
                                    max="100"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                    required
                                    style={{ padding: '1rem', paddingRight: '3rem' }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)',
                                    fontWeight: 600
                                }}>
                                    /100
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            justifyContent: 'center',
                            padding: '1rem',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                        }}
                    >
                        <Save size={22} />
                        Save Performance Record
                    </button>
                </form>
            </div>
        </div>
    );
}
