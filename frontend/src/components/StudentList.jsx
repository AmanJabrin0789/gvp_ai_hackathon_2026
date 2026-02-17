import React, { useEffect, useState } from 'react';
import api from '../api';
import { Search, Download, Smartphone, Users, AlertTriangle, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    const fetchStudents = async () => {
        try {
            setLoading(true);
            let url = 'students/?';
            if (selectedCourse) url += `course=${selectedCourse}&`;
            if (selectedSemester) url += `semester=${selectedSemester}&`;

            const response = await api.get(url);
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
            setLoading(true);
            await api.post('generate-sample-data/');
            toast.success("Sample data generated!");
            fetchStudents();
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [selectedCourse, selectedSemester]);

    const downloadCSV = () => {
        if (students.length === 0) {
            toast.error("No students to export");
            return;
        }

        const headers = ["ID", "Roll No", "Name", "Course", "Semester", "Avg Marks", "Attendance %"];
        const rows = students.map(student => [
            student.id,
            student.roll_no,
            student.name,
            student.course || "B.Tech",
            student.semester,
            student.average_marks,
            student.attendance_percentage
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "students_list.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll_no.includes(searchTerm)
    );

    const totalStudents = students.length;
    const lowAttendanceCount = students.filter(s => s.attendance_percentage < 75).length;

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                        Student Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Overview of academic performance and attendance</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={downloadCSV} className="btn-secondary">
                        <Download size={20} />
                        <span>Export CSV</span>
                    </button>
                    <button onClick={generateData} className="btn-primary">
                        <Smartphone size={20} />
                        <span>Auto-Generate Data</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', color: 'white', border: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Students</p>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>{totalStudents}</h2>
                        </div>
                        <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.2)', borderRadius: '1rem', backdropFilter: 'blur(10px)' }}>
                            <Users size={28} color="white" />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ background: 'white', borderLeft: '4px solid var(--warning-500)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Low Attendance</p>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{lowAttendanceCount}</h2>
                            <p style={{ fontSize: '0.8rem', color: 'var(--warning-500)', fontWeight: 600 }}>Below 75% threshold</p>
                        </div>
                        <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '1rem' }}>
                            <AlertTriangle size={28} color="var(--warning-500)" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="glass-panel" style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by name or roll number..."
                            className="input-field"
                            style={{ paddingLeft: '3rem', background: 'white' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        className="input-field"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        style={{ minWidth: '150px', background: 'white' }}
                    >
                        <option value="">All Courses</option>
                        {['B.Tech', 'BCA', 'MCA', 'M.Tech', 'B.Sc', 'M.Sc'].map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <select
                        className="input-field"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        style={{ minWidth: '160px', background: 'white' }}
                    >
                        <option value="">All Semesters</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                            <option key={s} value={s}>Semester {s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Student Table View */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
                <div className="table-container" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <table className="clean-table" style={{ width: '100%' }}>
                        <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                            <tr style={{ background: 'var(--slate-50)' }}>
                                <th style={{ width: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>#</th>
                                <th style={{ width: '25%' }}>Student Name</th>
                                <th style={{ width: '15%' }}>Roll No</th>
                                <th style={{ width: '15%' }}>Course</th>
                                <th style={{ width: '20%' }}>Attendance</th>
                                <th style={{ width: '15%' }}>Performance</th>
                                <th style={{ width: '50px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id} style={{ transition: 'background 0.2s' }}>
                                    <td style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
                                        {index + 1}
                                    </td>
                                    <td>
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
                                            <span style={{ fontWeight: 600 }}>{student.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                                        {student.roll_no}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 500 }}>{student.course}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sem {student.semester}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ flex: 1, height: '6px', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${student.attendance_percentage}%`,
                                                    height: '100%',
                                                    background: student.attendance_percentage < 75 ? 'var(--danger-500)' : 'var(--success-500)',
                                                    borderRadius: '3px'
                                                }} />
                                            </div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '35px', textAlign: 'right', color: student.attendance_percentage < 75 ? 'var(--danger-500)' : 'var(--success-500)' }}>
                                                {student.attendance_percentage}%
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {student.average_marks ? (
                                                <span style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '0.5rem',
                                                    background: 'var(--primary-50)',
                                                    color: 'var(--primary-700)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600
                                                }}>
                                                    {student.performance_remark} ({student.average_marks.toFixed(1)})
                                                </span>
                                            ) : (
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>N/A</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={`/student/${student.id}`} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            color: 'var(--text-muted)',
                                            transition: 'all 0.2s'
                                        }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-input)'; e.currentTarget.style.color = 'var(--primary-600)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                                        >
                                            <ChevronRight size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredStudents.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <Users size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p style={{ fontSize: '1.1rem' }}>No students found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
