import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AIMentor from './components/AIMentor'
import LoginModal from './components/LoginModal'
import Home from './pages/Home'
import Courses from './pages/Courses'
import About from './pages/About'
import Blog from './pages/Blog'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import CareerRoadmap from './pages/CareerRoadmap'
import Jobs from './pages/Jobs'
import CourseDetail from './pages/CourseDetail'

function AppContent() {
  const location = useLocation()
  const isDashboard = location.pathname.includes('dashboard') || location.pathname.includes('admin')

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-dashboard/*" element={<StudentDashboard />} />
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            <Route path="/career-roadmap" element={<CareerRoadmap />} />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
      <AIMentor />
      <LoginModal />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
