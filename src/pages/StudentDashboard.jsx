import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiBookOpen,
  FiPlay,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiUser,
  FiLogOut,
  FiChevronRight,
  FiExternalLink,
  FiDownload
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { courses } from '../data/courses'

export default function StudentDashboard() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('courses')

  // Sample enrolled courses for demonstration
  const enrolledCourses = [
    {
      ...courses[0],
      progress: 68,
      lastWatched: 'Module 4: React Custom Hooks & Performance',
      nextClass: 'Today, 7:00 PM (Live Doubt Session)',
    },
    {
      ...courses[1],
      progress: 35,
      lastWatched: 'Module 2: Scikit-Learn Classification Models',
      nextClass: 'Tomorrow, 6:00 PM',
    },
  ]

  const upcomingLiveSessions = [
    {
      id: 1,
      title: 'Full Stack Sprint: Building Production Microservices',
      instructor: 'Rahul Sharma',
      time: 'Today, 7:00 PM - 8:30 PM',
      status: 'Live Soon',
    },
    {
      id: 2,
      title: 'System Design Interview AMA & Resume Workshop',
      instructor: 'Dr. Priya Mehta',
      time: 'Thursday, 6:00 PM - 7:30 PM',
      status: 'Scheduled',
    },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 pb-16">
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-blue-700 to-darkNavy text-white py-10 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-2xl font-bold backdrop-blur-xs">
              <FiUser />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-semibold tracking-wider uppercase mb-1">
                Student Portal
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Welcome back, {user?.name || 'Student'}!
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/80">
                {user?.email || 'student@explorewithrts.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/courses"
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <FiBookOpen size={14} />
              <span>Browse Catalog</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FiLogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            My Learning ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'live'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Live Classes ({upcomingLiveSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Certificates & Badges
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 rounded-md bg-primary/10">
                          {course.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-darkNavy mt-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500">Instructor: {course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-primary">{course.progress}%</span>
                        <span className="text-[10px] text-slate-400 block">Completed</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1 mb-4">
                      <div className="text-slate-500">
                        <span className="font-semibold text-darkNavy">Recent:</span> {course.lastWatched}
                      </div>
                      <div className="text-emerald-700 font-medium">
                        <span className="font-semibold">Next:</span> {course.nextClass}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/courses/${course.id}`}
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <FiPlay size={13} />
                      <span>Resume Course</span>
                    </Link>
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
                    >
                      Syllabus Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Live Classes */}
        {activeTab === 'live' && (
          <div className="space-y-4">
            {upcomingLiveSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <FiCalendar size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
                      {session.status}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-darkNavy mt-1">{session.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">By {session.instructor} • {session.time}</p>
                  </div>
                </div>

                <button
                  onClick={() => alert('Live class link will activate 15 minutes before the session starts.')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                >
                  <FiPlay size={14} />
                  <span>Join Classroom</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Certificates */}
        {activeTab === 'certificates' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <FiAward size={32} />
            </div>
            <h3 className="text-lg font-bold text-darkNavy">Certificate of Completion</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Complete 100% of your course video modules and submit all milestone capstone projects to unlock your accredited certificate from Rewan Tech Solutions.
            </p>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Overall Curriculum Progress:</span>
                <span>52%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '52%' }} />
              </div>
              <p className="text-[11px] text-slate-400">Target unlock date: 48% remaining</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
