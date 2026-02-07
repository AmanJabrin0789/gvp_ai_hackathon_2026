import React, { useEffect, useState } from 'react';
import api from '../api';
import { Award, Save, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MarksManager() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('students/');
                setStudents(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load students");
            }
        };
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('marks/', {
                student: selectedStudent,
                subject_name: subject,
                marks_obtained: marks
            });
            toast.success("Marks added successfully");
            setSubject('');
            setMarks('');
        } catch (error) {
            console.error(error);
            toast.error("Failed to add marks");
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
                padding: '2rem 0',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(217, 70, 239, 0.1))',
                borderRadius: '1rem',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'var(--bg-card)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <GraduationCap size={32} color="var(--primary-500)" />
                </div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Performance Evaluation</h1>
                <p style={{ color: 'var(--text-muted)' }}>Record student grades and achievements</p>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label className="label">Select Student</label>
                        <select
                            className="input-field"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            required
                        >
                            <option value="">Choose a student...</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name} (Roll: {s.roll_no})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label className="label">Subject Name</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Data Structures"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Score (out of 100)</label>
                            <input
                                type="number"
                                className="input-field"
                                placeholder="0-100"
                                min="0"
                                max="100"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                    >
                        <Award size={20} />
                        Save Performance Record
                    </button>
                </form>
            </div>
        </div>
    );
}
