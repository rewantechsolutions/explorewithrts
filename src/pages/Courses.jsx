import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiStar,
  FiSearch,
  FiLock,
  FiUser,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiUnlock,
  FiBookOpen
} from 'react-icons/fi'
import { courses, categories } from '../data/courses'
import EnrollmentModal from '../components/EnrollmentModal'
import { useAuth } from '../context/AuthContext'

export default function Courses() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [enrollModalCourse, setEnrollModalCourse] = useState(null)
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  
  const { isAuthenticated, user, openLoginModal, login } = useAuth()
  const navigate = useNavigate()

  const handleEnrollClick = (course) => {
    if (!isAuthenticated) {
      openLoginModal(`/courses/${course.id}`)
      return
    }
    setEnrollModalCourse(course)
    setIsEnrollModalOpen(true)
  }

  const handleCardClick = (course) => {
    if (!isAuthenticated) {
      openLoginModal(`/courses/${course.id}`)
      return
    }
    navigate(`/courses/${course.id}`)
  }

  const handleQuickUnlock = () => {
    login('student', 'demo.student@explorewithrts.com', 'Demo Student')
  }

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory
    return matchSearch && matchCat
  })

  return (
    <div className="pt-20 min-h-screen bg-lightBg/30 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent opacity-40 pointer-events-none" />
        <div className="container-custom px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold mb-3">
            {isAuthenticated ? (
              <>
                <FiUnlock className="text-emerald-300" />
                <span>Curriculum Unlocked for {user.name}</span>
              </>
            ) : (
              <>
                <FiLock className="text-amber-300" />
                <span>Authentication Required to Explore</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">
            Explore Our Courses
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Industry-ready programs designed to transform your career with hands-on live training
          </p>
        </div>
      </section>

      <div className="container-custom px-3.5 sm:px-4 py-8 sm:py-12">
        {/* ================================================================= */}
        {/* LOGIN GATE NOTICE: If NOT logged in, display prominent lock notice */}
        {/* ================================================================= */}
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-500/10 border-2 border-primary/20 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-xs"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                  <FiLock size={26} />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                    Login Required
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-darkNavy">
                    Sign in to Explore Course Curriculums & Enroll
                  </h2>
                  <p className="text-xs sm:text-sm text-darkNavy/70 mt-1 max-w-xl leading-relaxed">
                    Courses and syllabus materials are reserved for registered users. Please sign in with your 
                    <strong> Student</strong> or <strong>Admin</strong> account to access syllabus breakdowns, live lectures, and admission.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto shrink-0">
                <Link
                  to="/login?redirect=/courses"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FiUser size={16} />
                  <span>Student Login</span>
                </Link>

                <Link
                  to="/login?role=admin&redirect=/courses"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-darkNavy text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FiShield size={16} />
                  <span>Admin Login</span>
                </Link>

                <button
                  onClick={handleQuickUnlock}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Quick Demo Sign-In"
                >
                  <FiCheckCircle size={15} />
                  <span>1-Click Demo</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Logged In Status Banner */
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <FiUnlock size={20} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-emerald-900">
                  Welcome, {user.name}! Full Course Access Active
                </p>
                <p className="text-xs text-emerald-700">
                  You are authenticated as <span className="font-semibold uppercase">{user.role}</span>. You can freely explore any course syllabus and enroll.
                </p>
              </div>
            </div>
            <Link
              to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-emerald-800 border border-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors shrink-0"
            >
              <span>Go to Dashboard</span>
              <FiArrowRight size={14} />
            </Link>
          </motion.div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-darkNavy/40" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 text-base sm:text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/30 bg-white shadow-2xs"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-white text-darkNavy border border-gray-100 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-primary text-white'
                    : 'bg-white text-darkNavy border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleCardClick(course)}
              className={`
                group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-premium
                transition-all duration-300 flex flex-col justify-between border border-gray-100
                relative cursor-pointer
                ${!isAuthenticated ? 'hover:border-amber-300' : 'hover:border-primary/30'}
              `}
            >
              <div>
                {/* Image Container with Lock or Category overlay */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isAuthenticated ? 'group-hover:scale-105' : 'filter blur-[1px]'
                    }`}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 rounded-lg text-xs font-semibold text-primary shadow-xs">
                    {course.category}
                  </div>

                  {/* Lock Indicator when unauthenticated */}
                  {!isAuthenticated && (
                    <div className="absolute inset-0 bg-darkNavy/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4 text-center transition-all group-hover:bg-darkNavy/50">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 text-white">
                        <FiLock size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                        Login to Explore
                      </span>
                      <span className="text-[11px] text-white/80 mt-0.5">Click to sign in</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-darkNavy mb-2 group-hover:text-primary transition-colors text-base line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-darkNavy/60 mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-darkNavy/50 mb-4">
                    <span className="flex items-center gap-1">
                      <FiStar className="text-gold" fill="currentColor" size={14} /> {course.rating}
                    </span>
                    <span>•</span>
                    <span>{course.students.toLocaleString()} students</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
                    <span className="text-xs text-darkNavy/40 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to={`/courses/${course.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 bg-slate-100 text-darkNavy hover:bg-primary/10 hover:text-primary text-xs font-semibold rounded-xl transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEnrollClick(course)
                          }}
                          className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-secondary transition-colors cursor-pointer shadow-xs"
                        >
                          Enroll
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openLoginModal(`/courses/${course.id}`)
                        }}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        <FiLock size={12} />
                        <span>Unlock</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        course={enrollModalCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  )
}
