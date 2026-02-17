import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Save, ArrowLeft, BookOpen, Hash, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        roll_no: '',
        course: 'B.Tech',
        semester: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('students/', formData);
            toast.success(
                <div>
                    <b>Student Added!</b>
                    <div style={{ fontSize: '0.9rem' }}>{formData.name} has been enrolled in {formData.course}.</div>
                </div>,
                { duration: 4000 }
            );
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Failed to add student. Roll number might be duplicate.");
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '3rem' }}>
            <button
                onClick={() => navigate('/')}
                className="btn-text"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'var(--bg-input)'}
                onMouseOut={(e) => e.target.style.background = 'none'}
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)' }}>
                <div style={{
                    padding: '2.5rem',
                    background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        width: '4rem',
                        height: '4rem',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <UserPlus size={32} color="white" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>New Enrollment</h1>
                        <p style={{ opacity: 0.9, fontSize: '1rem' }}>Enter student details to create a new profile.</p>
                    </div>
                </div>

                <div style={{ padding: '2.5rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2.5rem' }}>

                        {/* Personal Info Section */}
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>Personal Information</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div>
                                    <label className="label" style={{ marginBottom: '0.75rem' }}>Full Name</label>
                                    <div className="input-with-icon" style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                            <UserPlus size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="e.g. Rahul Shah"
                                            className="input-field"
                                            style={{ paddingLeft: '3rem', height: '3.5rem', fontSize: '1rem' }}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label" style={{ marginBottom: '0.75rem' }}>Roll Number</label>
                                    <div className="input-with-icon" style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                            <Hash size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="e.g. 2024001"
                                            className="input-field"
                                            style={{ paddingLeft: '3rem', height: '3.5rem', fontSize: '1rem' }}
                                            value={formData.roll_no}
                                            onChange={(e) => setFormData({ ...formData, roll_no: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Must be unique for each student.</p>
                                </div>
                            </div>
                        </div>

                        {/* Academic Info Section */}
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>Academic Details</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div>
                                    <label className="label" style={{ marginBottom: '0.75rem' }}>Course / Program</label>
                                    <div className="input-with-icon" style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                            <GraduationCap size={18} />
                                        </div>
                                        <select
                                            className="input-field"
                                            style={{ paddingLeft: '3rem', height: '3.5rem', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                                            value={formData.course}
                                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                        >
                                            {['B.Tech', 'BCA', 'MCA', 'M.Tech', 'B.Sc', 'M.Sc', 'MBA', 'BBA'].map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="label" style={{ marginBottom: '0.75rem' }}>Current Semester</label>
                                    <div className="input-with-icon" style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                            <BookOpen size={18} />
                                        </div>
                                        <select
                                            className="input-field"
                                            style={{ paddingLeft: '3rem', height: '3.5rem', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                                            value={formData.semester}
                                            onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                                <option key={sem} value={sem}>Semester {sem}</option>
                                            ))}
                                        </select>
                                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{
                                    padding: '1rem 3rem',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                                }}
                            >
                                <Save size={22} />
                                <span>Complete Enrollment</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
