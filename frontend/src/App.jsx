import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LayoutDashboard, Users, UserPlus, ClipboardCheck, GraduationCap, Sparkles, Moon, Sun } from 'lucide-react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import AttendanceManager from './components/AttendanceManager';
import MarksManager from './components/MarksManager';
import StudentReport from './components/StudentReport';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function NavItem({ to, icon: Icon, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`nav-item ${isActive ? 'active' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        transition: 'all 0.2s',
        color: isActive ? 'var(--primary-600)' : 'var(--text-muted)',
        backgroundColor: isActive ? 'var(--primary-50)' : 'transparent',
        border: isActive ? '1px solid var(--primary-100)' : '1px solid transparent',
        textDecoration: 'none',
        marginBottom: '0.5rem'
      }}
    >
      <Icon size={20} color={isActive ? 'var(--primary-600)' : 'currentColor'} />
      <span style={{ fontWeight: 500 }}>{children}</span>
    </Link>
  );
}

function Sidebar() {

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'var(--bg-sidebar)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
      transition: 'background 0.3s ease'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            padding: '0.5rem',
            background: 'linear-gradient(135deg, var(--primary-600), var(--primary-500))',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
          }}>
            <Sparkles size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
              SmartTrack
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>AI ATTENDANCE SYSTEM</p>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        <NavItem to="/" icon={LayoutDashboard}>Dashboard</NavItem>
        <NavItem to="/add-student" icon={UserPlus}>Add Student</NavItem>
        <NavItem to="/attendance" icon={ClipboardCheck}>Attendance</NavItem>
        <NavItem to="/marks" icon={GraduationCap}>Performance</NavItem>
        <NavItem to="/students" icon={Users}>Students Directory</NavItem>
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>


        <div style={{
          padding: '1rem',
          background: 'var(--bg-input)',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              marginTop: '6px',
              boxShadow: '0 0 8px #10b981'
            }} />
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>System Status</p>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>AI Engine Online</p>
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
        <main style={{
          flex: 1,
          marginLeft: '260px',
          padding: '2rem',
          position: 'relative',
          overflowX: 'hidden',
          backgroundColor: 'var(--bg-body)',
          minHeight: '100vh',
          transition: 'background-color 0.3s ease'
        }}>
          {/* Background decorative elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '500px',
            background: 'radial-gradient(circle at 50% 0%, var(--primary-500), transparent 70%)',
            opacity: 0.05,
            pointerEvents: 'none'
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
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
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
