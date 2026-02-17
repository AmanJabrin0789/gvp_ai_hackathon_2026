import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LayoutDashboard, Users, UserPlus, ClipboardCheck, GraduationCap, Sparkles, Activity } from 'lucide-react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import AttendanceManager from './components/AttendanceManager';
import MarksManager from './components/MarksManager';
import StudentReport from './components/StudentReport';
import { ThemeProvider } from './context/ThemeContext';

function NavItem({ to, icon: Icon, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem',
        padding: '0.875rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        color: isActive ? 'var(--primary-600)' : 'var(--text-secondary)',
        background: isActive ? 'linear-gradient(90deg, var(--primary-50), white)' : 'transparent',
        borderLeft: isActive ? '4px solid var(--primary-600)' : '4px solid transparent', // Active indicator
        textDecoration: 'none',
        marginBottom: '0.5rem',
        fontWeight: isActive ? 600 : 500,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Icon size={22} color={isActive ? 'var(--primary-600)' : 'currentColor'} strokeWidth={isActive ? 2.5 : 2} />
      <span style={{ fontSize: '0.95rem' }}>{children}</span>

      {/* Subtle glow effect for active item */}
      {isActive && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '40%',
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1))',
          pointerEvents: 'none'
        }} />
      )}
    </Link>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Header */}
      <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, var(--primary-600), var(--accent-500))',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
            transform: 'rotate(-5deg)'
          }}>
            <Sparkles size={28} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }} className="text-gradient">
              SmartTrack
            </h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              AI Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
        <div style={{ marginBottom: '1rem', paddingLeft: '1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Menu
        </div>
        <NavItem to="/" icon={LayoutDashboard}>Dashboard</NavItem>
        <NavItem to="/attendance" icon={ClipboardCheck}>Attendance</NavItem>
        <NavItem to="/marks" icon={GraduationCap}>Performance</NavItem>
        <NavItem to="/students" icon={Users}>Students Directory</NavItem>

        <div style={{ marginTop: '2rem', marginBottom: '1rem', paddingLeft: '1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Actions
        </div>
        <NavItem to="/add-student" icon={UserPlus}>Add Student</NavItem>
      </nav>

      {/* Footer / Status */}
      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.4)' }}>
        <div style={{
          padding: '1rem',
          background: 'white',
          borderRadius: '1rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--primary-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={18} className="text-gradient" />
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>System Status</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Online & Syncing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          {/* Decorative Background Elements */}
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <Routes>
              <Route path="/" element={<StudentList />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/add-student" element={<StudentForm />} />
              <Route path="/attendance" element={<AttendanceManager />} />
              <Route path="/marks" element={<MarksManager />} />
              <Route path="/student/:id" element={<StudentReport />} />
            </Routes>
          </div>
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'white',
              color: 'var(--text-main)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: '0.75rem',
              padding: '1rem',
              fontSize: '0.9rem'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            }
          }}
        />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
