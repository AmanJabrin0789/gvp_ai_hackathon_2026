import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        roll_no: '',
        course: 'B.Tech', // Default
        semester: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('students/', formData);
            toast.success("Student added successfully!");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Failed to add student. Check roll number uniqueness.");
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
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

            <div className="card">
                <div style={{
                    marginBottom: '2rem',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        padding: '0.75rem',
                        background: 'var(--primary-100)',
                        borderRadius: '0.5rem',
                        color: 'var(--primary-600)'
                    }}>
                        <UserPlus size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Add New Student</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Create a new student profile in the system</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label className="label">Student Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Rahul Shah"
                            className="input-field"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label className="label">Roll Number</label>
                            <input
                                type="number"
                                placeholder="e.g. 101"
                                className="input-field"
                                value={formData.roll_no}
                                onChange={(e) => setFormData({ ...formData, roll_no: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Course</label>
                            <select
                                className="input-field"
                                value={formData.course}
                                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                            >
                                {['B.Tech', 'BCA', 'MCA', 'M.Tech', 'B.Sc', 'M.Sc'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="label">Semester</label>
                            <select
                                className="input-field"
                                value={formData.semester}
                                onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                    <option key={sem} value={sem}>Semester {sem}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                            <Save size={20} />
                            Save Student Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
