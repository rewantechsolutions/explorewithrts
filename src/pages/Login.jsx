import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiLock, FiMail } from 'react-icons/fi'

export default function Login() {
  const [searchParams] = useSearchParams()
  const isAdmin = searchParams.get('role') === 'admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock login
    if (isAdmin) {
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
        className="w-full max-w-md bg-white rounded-2xl shadow-premium p-8"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mb-4">
            R
          </div>
          <h1 className="text-2xl font-bold text-darkNavy">
            {isAdmin ? 'Admin Login' : 'Student Login'}
          </h1>
          <p className="text-darkNavy/60 text-sm mt-1">
            {isAdmin ? 'Access the admin panel' : 'Continue your learning journey'}
          </p>
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
          <button type="submit" className="w-full btn-primary">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-darkNavy/60 mt-6">
          Don't have an account?{' '}
          <Link to="/contact" className="text-primary font-medium hover:underline">Contact us</Link>
        </p>
        
        <div className="mt-4 text-center">
          <Link 
            to={isAdmin ? '/login' : '/login?role=admin'} 
            className="text-xs text-darkNavy/40 hover:text-primary"
          >
            {isAdmin ? 'Student Login →' : 'Admin Login →'}
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
