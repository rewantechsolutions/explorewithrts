import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiLock,
  FiUser,
  FiMail,
  FiPhone,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
  FiCheck
} from 'react-icons/fi'

const EnrollmentModal = ({ course, isOpen, onClose }) => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: 'Undergraduate / College Student',
    experienceLevel: 'Beginner',
    learningGoal: '',
    agreeTerms: true
  })

  if (!isOpen || !course) return null

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const dataToSave = {
        ...formData,
        courseId: course.id,
        courseTitle: course.title,
        enrolledAt: new Date().toISOString()
      }

      try {
        // Save enrollment per course
        localStorage.setItem(`enrolled_course_${course.id}`, JSON.stringify(dataToSave))

        // Also add to student dashboard list
        const existingList = JSON.parse(localStorage.getItem('user_enrolled_courses') || '[]')
        if (!existingList.some(c => c.id === course.id)) {
          existingList.push({
            id: course.id,
            title: course.title,
            category: course.category,
            enrolledAt: new Date().toISOString(),
            progress: 0
          })
          localStorage.setItem('user_enrolled_courses', JSON.stringify(existingList))
        }
      } catch (err) {
        console.error(err)
      }

      setIsSubmitting(false)
      setIsSuccess(true)

      // Transition into course overview
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        navigate(`/courses/${course.id}`)
      }, 900)
    }, 600)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-darkNavy/70 backdrop-blur-sm"
        />

        {/* Modal Dialog with responsive max-height and flex-col scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-blue-50"
        >
          {/* Header (Sticky at top of modal) */}
          <div className="bg-gradient-to-r from-darkNavy via-primary to-secondary p-4 sm:p-6 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FiX className="text-xl" />
            </button>

            <div className="flex items-center gap-3 pr-10">
              <div className="w-10 h-10 rounded-xl bg-white/15 text-gold flex items-center justify-center text-xl shrink-0">
                <FiLock />
              </div>
              <div>
                <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200">
                  Course Entry Form
                </span>
                <h3 className="text-lg sm:text-2xl font-bold leading-tight">Enroll in Course</h3>
              </div>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-md leading-snug">
              Course me enter karne aur full overview dekhne ke liye kripya apni details bharein.
            </p>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="p-6 sm:p-10 text-center py-12 sm:py-16 overflow-y-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FiCheck className="text-3xl stroke-[3]" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-darkNavy mb-2">Enrollment Verified!</h4>
              <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto mb-5 leading-relaxed">
                Dhanyawad <span className="font-semibold text-primary">{formData.fullName}</span>! Aapka enrollment form submit ho chuka hai. Course overview khol rahe hain...
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                Redirecting to Course Overview...
              </div>
            </div>
          ) : (
            /* Enrollment Form (Scrollable body) */
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Selected Course summary (Responsive flex) */}
              <div className="bg-blue-50/70 rounded-xl p-3 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wide block">
                      {course.category}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-darkNavy truncate">{course.title}</h5>
                    <span className="text-[11px] text-gray-500">Duration: {course.duration}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-blue-100/60 shrink-0">
                  <div className="text-sm sm:text-base font-bold text-primary">₹{course.price?.toLocaleString()}</div>
                  {course.originalPrice && (
                    <div className="text-[11px] text-gray-400 line-through">₹{course.originalPrice?.toLocaleString()}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-darkNavy mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Abhay Pratap Singh"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-darkNavy mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-darkNavy mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                    />
                  </div>
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-xs font-bold text-darkNavy mb-1">
                    Highest Qualification
                  </label>
                  <div className="relative">
                    <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-base sm:text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="Undergraduate / College Student">Undergraduate / College Student</option>
                      <option value="B.Tech / BCA / MCA">B.Tech / BCA / MCA</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Diploma / School">Diploma / School</option>
                    </select>
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-xs font-bold text-darkNavy mb-1">
                    Current Level
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-base sm:text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="Beginner">Beginner (No coding background)</option>
                      <option value="Intermediate">Intermediate (Know basics)</option>
                      <option value="Advanced">Advanced (Job preparation)</option>
                    </select>
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-xs font-bold text-darkNavy mb-1">
                    Primary Goal
                  </label>
                  <input
                    type="text"
                    name="learningGoal"
                    placeholder="e.g. Placement, Skill Upgrade"
                    value={formData.learningGoal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-base sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  />
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 shrink-0"
                />
                <span className="text-[11px] text-gray-600 leading-tight">
                  Main confirm karta hu ki di gayi details sahi hain aur Rewan Tech Solutions mujhe is course ka schedule WhatsApp/Email par bhej sakta hai.
                </span>
              </label>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer min-h-[44px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying & Enrolling...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Form & Enter Course</span>
                      <FiArrowRight className="text-base" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-2.5 text-center">
                  <FiShield className="text-emerald-500 text-xs shrink-0" />
                  <span>Submit karte hi course ka complete overview aur modules open ho jayenge.</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default EnrollmentModal
