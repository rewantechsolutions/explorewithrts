import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiUser, FiShield, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, redirectAfterLogin, login } = useAuth()
  const navigate = useNavigate()

  if (!isLoginModalOpen) return null

  const handleSelectRole = (role) => {
    closeLoginModal()
    const targetUrl = role === 'admin'
      ? `/login?role=admin&redirect=${encodeURIComponent(redirectAfterLogin || '/courses')}`
      : `/login?redirect=${encodeURIComponent(redirectAfterLogin || '/courses')}`
    navigate(targetUrl)
  }

  const handleQuickDemoLogin = () => {
    login('student', 'rahul.student@explorewithrts.com', 'Rahul Verma')
    closeLoginModal()
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="absolute inset-0 bg-darkNavy/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-700 p-6 text-white relative">
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold mb-2">
              <FiLock size={12} /> Authentication Portal
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">Sign In to Continue</h3>
            <p className="text-white/80 text-xs sm:text-sm mt-1">
              Select your portal account to explore courses and learning materials.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Student Login Option */}
            <button
              onClick={() => handleSelectRole('student')}
              className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-primary/50 bg-slate-50/50 hover:bg-primary/5 transition-all duration-200 group flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                  <FiUser size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-darkNavy text-base group-hover:text-primary transition-colors flex items-center gap-2">
                    Student Login
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Learning</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Explore courses, syllabi, track roadmap progress, and access learning tools.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                <FiArrowRight size={16} />
              </div>
            </button>

            {/* Admin Login Option */}
            <button
              onClick={() => handleSelectRole('admin')}
              className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-100 transition-all duration-200 group flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-darkNavy group-hover:text-white transition-all">
                  <FiShield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-darkNavy text-base group-hover:text-darkNavy transition-colors flex items-center gap-2">
                    Admin Login
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold">Faculty / Staff</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Manage course modules, enrollments, reports, and administrative controls.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white text-slate-600 flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                <FiArrowRight size={16} />
              </div>
            </button>

            {/* Quick Demo Access */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiCheckCircle size={15} />
                <span>Quick Demo Sign-In as Student (Instant Unlock)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
