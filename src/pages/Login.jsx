import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiLock, FiMail, FiShield, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [searchParams] = useSearchParams()
  const isAdmin = searchParams.get('role') === 'admin'
  const redirect = searchParams.get('redirect')
  const { login } = useAuth()
  
  const [email, setEmail] = useState(isAdmin ? 'admin@explorewithrts.com' : 'student@explorewithrts.com')
  const [password, setPassword] = useState('password123')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(isAdmin ? 'admin' : 'student', email)

    if (redirect) {
      navigate(redirect)
    } else if (isAdmin) {
      navigate('/admin-dashboard')
    } else {
      navigate('/student-dashboard')
    }
  }

  const handleQuickLogin = (roleToLogin) => {
    const defaultEmail = roleToLogin === 'admin' ? 'admin@explorewithrts.com' : 'student@explorewithrts.com'
    login(roleToLogin, defaultEmail)
    if (redirect) {
      navigate(redirect)
    } else if (roleToLogin === 'admin') {
      navigate('/admin-dashboard')
    } else {
      navigate('/student-dashboard')
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-lightBg to-blue-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-premium p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md">
            {isAdmin ? <FiShield size={26} /> : <FiUser size={26} />}
          </div>
          <h1 className="text-2xl font-bold text-darkNavy">
            {isAdmin ? 'Admin Portal Login' : 'Student Portal Login'}
          </h1>
          <p className="text-darkNavy/60 text-sm mt-1">
            {isAdmin ? 'Access administrative controls and management' : 'Login to explore courses and unlock learning materials'}
          </p>
          {redirect && (
            <div className="mt-3 inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-full font-medium">
              🔒 Login required to access {redirect}
            </div>
          )}
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6 text-sm font-semibold">
          <Link
            to={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'}
            className={`py-2 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              !isAdmin ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-darkNavy'
            }`}
          >
            <FiUser size={15} /> Student
          </Link>
          <Link
            to={redirect ? `/login?role=admin&redirect=${encodeURIComponent(redirect)}` : '/login?role=admin'}
            className={`py-2 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              isAdmin ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-darkNavy'
            }`}
          >
            <FiShield size={15} /> Admin
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-darkNavy mb-1.5 block">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-darkNavy/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-darkNavy mb-1.5 block">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-darkNavy/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full btn-primary py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer">
            <span>Sign In as {isAdmin ? 'Admin' : 'Student'}</span>
            <FiArrowRight />
          </button>
        </form>

        {/* Quick Demo Sign-in Button */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => handleQuickLogin(isAdmin ? 'admin' : 'student')}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <FiCheckCircle size={14} className="text-emerald-600" />
            <span>1-Click Quick Demo Sign In</span>
          </button>
        </div>

        <p className="text-center text-sm text-darkNavy/60 mt-6">
          Don't have an account?{' '}
          <Link to="/contact" className="text-primary font-medium hover:underline">Contact us</Link>
        </p>
      </motion.div>
    </div>
  )
}
