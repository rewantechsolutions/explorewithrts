import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiStar, 
  FiUsers, 
  FiClock, 
  FiBookOpen, 
  FiCheck, 
  FiLock, 
  FiUnlock, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiBriefcase, 
  FiShield, 
  FiCheckCircle, 
  FiArrowLeft, 
  FiPlay, 
  FiAward, 
  FiRefreshCw 
} from 'react-icons/fi'
import { courses } from '../data/courses'
import { useAuth } from '../context/AuthContext'

export default function CourseDetail() {
  const { id } = useParams()
  const course = courses.find(c => c.id === Number(id)) || courses[0]
  const { isAuthenticated, user, login } = useAuth()

  const storageKey = `enrolled_course_${course.id}`
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [studentData, setStudentData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    qualification: 'Undergraduate / College Student',
    experienceLevel: 'Beginner',
    learningGoal: '',
    agreeTerms: true
  })

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || ''
      }))
    }
  }, [user])

  // Check enrollment on load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        setIsEnrolled(true)
        setStudentData(parsed)
      } else {
        setIsEnrolled(false)
        setStudentData(null)
      }
    } catch (e) {
      console.error(e)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [course.id, storageKey])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleEnrollSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const enrolledObj = {
        ...formData,
        courseId: course.id,
        courseTitle: course.title,
        enrolledAt: new Date().toISOString()
      }

      try {
        localStorage.setItem(storageKey, JSON.stringify(enrolledObj))

        // Sync with user's general enrolled courses
        const existing = JSON.parse(localStorage.getItem('user_enrolled_courses') || '[]')
        if (!existing.some(c => c.id === course.id)) {
          existing.push({
            id: course.id,
            title: course.title,
            category: course.category,
            enrolledAt: new Date().toISOString(),
            progress: 0
          })
          localStorage.setItem('user_enrolled_courses', JSON.stringify(existing))
        }
      } catch (err) {
        console.error(err)
      }

      setStudentData(enrolledObj)
      setIsSubmitting(false)
      setShowSuccessScreen(true)

      // Transition to revealing the course overview
      setTimeout(() => {
        setIsEnrolled(true)
        setShowSuccessScreen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 900)
    }, 600)
  }

  const handleReset = () => {
    localStorage.removeItem(storageKey)
    setIsEnrolled(false)
    setStudentData(null)
    setShowSuccessScreen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // =========================================================================
  // STATE 0: NOT AUTHENTICATED -> BLOCK COURSE EXPLORATION STRICTLY
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="pt-20 sm:pt-24 pb-14 sm:pb-20 min-h-screen bg-gradient-to-b from-lightBg/50 via-white to-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-center">
          <div className="bg-gradient-to-r from-primary via-blue-600 to-indigo-700 p-6 sm:p-8 text-white relative">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl shadow-inner mb-3">
              <FiLock />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold mb-2">
              Authentication Required
            </span>
            <h1 className="text-xl sm:text-2xl font-bold">
              Sign In to Explore This Course
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-sm mx-auto leading-relaxed">
              Curriculum modules, syllabus breakdowns, and enrollments for <strong>{course.title}</strong> are locked.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Please sign in with your student or administrative account to unlock the full syllabus, instructor details, and lesson materials.
            </p>

            <div className="space-y-2.5">
              <Link
                to={`/login?redirect=${encodeURIComponent(`/courses/${course.id}`)}`}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FiUser size={16} />
                <span>Student Login</span>
              </Link>

              <Link
                to={`/login?role=admin&redirect=${encodeURIComponent(`/courses/${course.id}`)}`}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-darkNavy text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FiShield size={16} />
                <span>Admin Login</span>
              </Link>

              <button
                onClick={() => login('student', 'demo.student@explorewithrts.com', 'Demo Student')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FiCheckCircle size={15} />
                <span>1-Click Demo Sign-In (Instant Unlock)</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
              >
                <FiArrowLeft size={14} />
                <span>Back to All Courses</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // STATE 1: NOT ENROLLED -> ENTIRE OVERVIEW IS STRICTLY HIDDEN
  // Show ONLY the Enrollment Gatekeeper Form
  // =========================================================================
  if (!isEnrolled) {
    return (
      <div className="pt-20 sm:pt-24 pb-14 sm:pb-20 min-h-screen bg-gradient-to-b from-lightBg/50 via-white to-gray-50">
        <div className="container-custom px-3.5 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            to="/courses" 
            className="inline-flex items-center text-xs sm:text-sm font-semibold text-darkNavy/70 hover:text-primary mb-4 sm:mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-1.5 sm:mr-2 text-base" /> Back to All Courses
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-blue-100/80 overflow-hidden"
          >
            {/* Form Top Banner (Responsive padding & layout) */}
            <div className="bg-gradient-to-r from-darkNavy via-primary to-secondary p-5 sm:p-8 md:p-9 text-white">
              <div className="flex items-start sm:items-center gap-3 sm:gap-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/15 text-gold flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-inner mt-0.5 sm:mt-0">
                  <FiLock />
                </div>
                <div>
                  <span className="inline-block bg-gold/20 text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                    Step 1 • Enrollment Required
                  </span>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">Course Enrollment Form</h1>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                Course me enter karne aur <strong>"What You'll Learn"</strong> tatha <strong>Course Content (Modules)</strong> dekhne ke liye kripya yeh form bharein. Form submit karne se pehle course overview hidden rehta hai.
              </p>
            </div>

            {/* Locked Notice Bar */}
            <div className="bg-amber-50 border-b border-amber-200/80 px-4 sm:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-amber-900 font-medium">
              <span className="flex items-center gap-2">
                <FiLock className="text-amber-600 shrink-0" />
                <span>Status: <strong>Overview & Content Locked</strong></span>
              </span>
              <span className="text-primary font-semibold text-[11px] sm:text-xs">
                Unlocks immediately after submitting form
              </span>
            </div>

            {/* Success State / Loading */}
            {showSuccessScreen ? (
              <div className="p-6 sm:p-14 text-center py-14 sm:py-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-sm">
                  <FiCheck className="text-3xl sm:text-4xl stroke-[3]" />
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-darkNavy mb-2">Enrollment Verified!</h2>
                <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
                  Dhanyawad <span className="font-semibold text-primary">{formData.fullName}</span>! Aapka enrollment register ho gaya hai. Course overview aur syllabus khola ja raha hai...
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Opening Course Overview...
                </div>
              </div>
            ) : (
              /* The Form (Responsive inputs & grids) */
              <form onSubmit={handleEnrollSubmit} className="p-4 sm:p-7 md:p-8 space-y-4 sm:space-y-6">
                {/* Course preview badge (Responsive flex) */}
                <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-12 sm:w-16 sm:h-14 rounded-lg sm:rounded-xl object-cover shrink-0 shadow-sm"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">
                        {course.category}
                      </span>
                      <h3 className="text-xs sm:text-base font-bold text-darkNavy truncate">{course.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500 mt-0.5">
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.lessons || 24} Lessons</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-blue-100/70 shrink-0">
                    <div className="text-base sm:text-lg font-bold text-primary">₹{course.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-darkNavy mb-1 sm:mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Abhay Pratap Singh"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-darkNavy mb-1 sm:mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-darkNavy mb-1 sm:mb-1.5">
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Qualification */}
                  <div>
                    <label className="block text-xs font-bold text-darkNavy mb-1 sm:mb-1.5">
                      Highest Qualification
                    </label>
                    <div className="relative">
                      <FiAward className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                      >
                        <option value="Undergraduate / College Student">Undergraduate / College Student</option>
                        <option value="B.Tech / BCA / MCA / IT">B.Tech / BCA / MCA / IT</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Postgraduate Degree">Postgraduate Degree</option>
                        <option value="Diploma / School">Diploma / School</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Current Tech Level */}
                  <div>
                    <label className="block text-xs font-bold text-darkNavy mb-1 sm:mb-1.5">
                      Current Technical Level
                    </label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                      >
                        <option value="Beginner">Beginner (Starting from scratch)</option>
                        <option value="Intermediate">Intermediate (Basic programming knowledge)</option>
                        <option value="Advanced">Advanced (Looking for job / placement)</option>
                      </select>
                    </div>
                  </div>

                  {/* Learning Goal */}
                  <div>
                    <label className="block text-xs font-bold text-darkNavy mb-1 sm:mb-1.5">
                      Primary Learning Goal
                    </label>
                    <input
                      type="text"
                      name="learningGoal"
                      placeholder="e.g. Job Placement, Skill Upgrade"
                      value={formData.learningGoal}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Consent */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 shrink-0"
                  />
                  <span className="text-xs text-gray-600 leading-normal">
                    Main agree karta hu ki Rewan Tech Solutions mujhe is course ka schedule, study modules aur placement alerts bhej sakta hai.
                  </span>
                </label>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Enrollment...</span>
                      </>
                    ) : (
                      <>
                        <FiUnlock className="text-lg text-gold" />
                        <span>Submit Form & View Course Overview</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] sm:text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                    <FiShield className="text-emerald-500 text-sm shrink-0" />
                    <span>Bina form bhare overview nahi dikhega. Submit karte hi poora content unlock ho jayega.</span>
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // STATE 2: ENROLLED -> FULL COURSE OVERVIEW, "WHAT YOU'LL LEARN" & CONTENT
  // =========================================================================
  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-gray-50/50">
      
      {/* Enrolled Verified Notification Banner (Responsive wrap) */}
      <div className="bg-emerald-600 text-white py-2.5 px-3.5 sm:px-4">
        <div className="container-custom flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-base text-emerald-200 shrink-0" />
            <span className="leading-tight">
              Welcome, <strong>{studentData?.fullName || 'Student'}</strong>! Aap is course me enrolled hain. Course overview and content unlocked.
            </span>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-white/90 hover:text-white underline cursor-pointer self-start sm:self-auto shrink-0"
          >
            <FiRefreshCw className="text-xs" /> Re-open Form / Change Details
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-br from-darkNavy via-primary to-darkNavy text-white py-10 sm:py-16">
        <div className="container-custom px-4 sm:px-6">
          <Link to="/courses" className="inline-flex items-center text-xs sm:text-sm text-gray-300 hover:text-white mb-4">
            <FiArrowLeft className="mr-1.5" /> All Courses
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-gold/20 text-gold text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <FiUnlock className="text-xs" /> Overview Unlocked
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 max-w-3xl leading-tight break-words">
            {course.title}
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm text-gray-200">
            <span className="flex items-center gap-1.5"><FiStar className="text-gold" fill="currentColor" /> {course.rating} Rating</span>
            <span className="flex items-center gap-1.5"><FiUsers className="text-gold" /> {course.students.toLocaleString()} Students Enrolled</span>
            <span className="flex items-center gap-1.5"><FiClock className="text-gold" /> {course.duration}</span>
            <span className="flex items-center gap-1.5"><FiBookOpen className="text-gold" /> {course.lessons || 24} Lessons</span>
          </div>
        </div>
      </section>

      {/* Main Grid: What You'll Learn & Course Content */}
      <div className="container-custom px-3.5 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="lg:col-span-2 space-y-8 sm:space-y-10">
          
          {/* SECTION 1: WHAT YOU'LL LEARN */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                <FiCheckCircle />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider block">Core Competencies</span>
                <h2 className="text-xl sm:text-2xl font-bold text-darkNavy">What You'll Learn</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {(course.whatYouWillLearn || [
                'Master end-to-end industry architecture & tools',
                'Build and deploy real-world production-grade projects',
                'Earn verified Government & Industry Certification',
                'Guaranteed Placement & Resume building sessions',
                'Master coding interviews with AI Mock Simulations',
                'Lifetime access to all future lectures and material',
                '1-on-1 personalized mentorship by senior software engineers',
                'Active tech community & peer networking'
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3 p-3 rounded-xl bg-lightBg/40 border border-blue-50">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheck className="text-xs stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-darkNavy/80 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: COURSE CONTENT & MODULES */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 sm:mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                  <FiBookOpen />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider block">Structured Syllabus</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-darkNavy">Course Content & Curriculum</h2>
                </div>
              </div>
              <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full self-start sm:self-auto">
                {course.curriculum ? course.curriculum.length : 5} Comprehensive Modules
              </span>
            </div>

            <div className="space-y-3">
              {course.curriculum ? (
                course.curriculum.map((mod, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/40 transition-colors">
                    <div className="bg-lightBg/50 p-3.5 sm:p-4 font-semibold text-darkNavy flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-darkNavy truncate">{mod.module}</span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium text-gray-500 bg-white border px-2 sm:px-2.5 py-1 rounded-md shrink-0">
                        {mod.lessons} lessons
                      </span>
                    </div>
                    {mod.topics && (
                      <div className="p-3.5 sm:p-4 bg-white">
                        <ul className="space-y-2">
                          {mod.topics.map((t, tidx) => (
                            <li key={tidx} className="text-xs sm:text-sm text-gray-600 flex items-center justify-between gap-2">
                              <span className="flex items-center min-w-0 break-words">
                                <FiPlay className="mr-2 text-primary/70 shrink-0 text-xs" />
                                <span>{t}</span>
                              </span>
                              <span className="text-[10px] sm:text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium shrink-0">
                                Unlocked
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                ['Foundations & Development Setup', 'Core Concepts & Modern Frameworks', 'Database Architecture & Backend APIs', 'Production Projects & Case Studies', 'Placement Preparation & Interview Mastery'].map((mod, i) => (
                  <div key={i} className="bg-lightBg/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex justify-between items-center gap-2 border border-blue-50">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-xs sm:text-base text-darkNavy truncate">{mod}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-darkNavy/60 bg-white px-2 sm:px-2.5 py-1 rounded-md border shrink-0">
                      {(i + 1) * 6} lessons
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECTION 3: INSTRUCTOR & MENTOR DETAILS */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-darkNavy mb-1 sm:mb-2">Expert Instructor: {course.instructor}</h3>
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 sm:mb-3">Senior Industry Mentor • 8+ Years Experience</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Mentored hundreds of engineering students into top product companies. Direct mentorship, weekly doubts-clearing sessions, and career guidance included.
            </p>
          </div>
        </div>

        {/* Right Sticky Summary Card (Responsive styling) */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-6 border border-gray-100">
            <img src={course.image} alt={course.title} className="w-full aspect-video object-cover rounded-xl sm:rounded-2xl mb-4 shadow-sm" />
            <div className="mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
              <span className="text-sm text-darkNavy/40 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
            </div>

            {/* Enrolled Badge */}
            <div className="w-full bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl py-2.5 sm:py-3 px-4 text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 mb-3">
              <FiCheckCircle className="text-emerald-600 text-lg shrink-0" />
              <span>Enrollment Active</span>
            </div>

            <Link 
              to="/student-dashboard" 
              className="w-full btn-primary py-3 mb-3 text-center text-sm font-semibold flex items-center justify-center cursor-pointer min-h-[44px]"
            >
              Go to Student Dashboard
            </Link>

            <button 
              onClick={handleReset} 
              className="w-full text-xs text-gray-500 hover:text-red-600 py-1.5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FiRefreshCw className="text-xs" /> Edit / Re-enter Form
            </button>

            <div className="mt-5 space-y-2.5 text-xs text-darkNavy/70 pt-4 border-t border-gray-100">
              <p className="flex items-center gap-2"><FiAward className="text-primary shrink-0" /> Verified Certificate of completion</p>
              <p className="flex items-center gap-2"><FiPlay className="text-primary shrink-0" /> Lifetime access & recorded lectures</p>
              <p className="flex items-center gap-2"><FiCheckCircle className="text-primary shrink-0" /> Placement support & mock interviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
