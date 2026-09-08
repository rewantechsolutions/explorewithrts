import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMenu,
  FiX,
  FiUser,
  FiShield,
  FiHome,
  FiBook,
  FiCompass,
  FiBriefcase,
  FiInfo,
  FiEdit3,
  FiHelpCircle,
  FiMail,
  FiChevronRight,
  FiChevronDown,
  FiLogOut,
  FiGrid
} from 'react-icons/fi'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { name: 'Home', path: '/', icon: FiHome },
  { name: 'Courses', path: '/courses', icon: FiBook },
  { name: 'Career Roadmap', path: '/career-roadmap', icon: FiCompass },
  { name: 'Jobs', path: '/jobs', icon: FiBriefcase },
  { name: 'About', path: '/about', icon: FiInfo },
  { name: 'Blog', path: '/blog', icon: FiEdit3 },
  { name: 'FAQ', path: '/faq', icon: FiHelpCircle },
  { name: 'Contact', path: '/contact', icon: FiMail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLoginDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setIsLoginDropdownOpen(false)
  }, [location])

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLogout = () => {
    logout()
    setIsLoginDropdownOpen(false)
    navigate('/')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.08)] border-b border-slate-200/80'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-100/80 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? 'h-15 sm:h-16 lg:h-18'
                : 'h-16 sm:h-18 lg:h-20'
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0 group hover:opacity-95 transition-opacity"
              aria-label="Explore With RTS Home"
            >
              <Logo variant="light" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 mx-2 xl:mx-4" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      relative px-2.5 xl:px-3.5 py-1.5 rounded-xl
                      text-[13px] xl:text-[14px] font-semibold tracking-normal
                      transition-all duration-200 whitespace-nowrap
                      ${
                        isActive
                          ? 'text-primary font-bold'
                          : 'text-darkNavy/75 hover:text-primary hover:bg-slate-100/70'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 35,
                        }}
                      />
                    )}
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Auth Actions & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Single Login Button with Dropdown (Desktop & Tablet) */}
              <div className="relative hidden md:block" ref={dropdownRef}>
                {!isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2 xl:px-5 xl:py-2.5
                        rounded-xl text-xs xl:text-sm font-semibold
                        text-white bg-gradient-to-r from-primary to-blue-600
                        hover:from-primary/95 hover:to-blue-700
                        shadow-sm hover:shadow-md transition-all duration-200
                        cursor-pointer
                      "
                      aria-expanded={isLoginDropdownOpen}
                      aria-haspopup="true"
                    >
                      <FiUser className="text-sm" />
                      <span>Login</span>
                      <FiChevronDown
                        className={`text-xs transition-transform duration-200 ${
                          isLoginDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu for Login Portals */}
                    <AnimatePresence>
                      {isLoginDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="
                            absolute right-0 mt-2 w-64
                            bg-white rounded-2xl shadow-xl
                            border border-slate-100 p-2.5 z-50
                          "
                        >
                          <div className="px-3 py-2 border-b border-slate-100 mb-1">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Choose Login Portal
                            </p>
                          </div>

                          {/* Student Login Button */}
                          <Link
                            to="/login"
                            onClick={() => setIsLoginDropdownOpen(false)}
                            className="
                              flex items-center gap-3 p-2.5 rounded-xl
                              hover:bg-primary/5 text-darkNavy hover:text-primary
                              transition-all duration-200 group
                            "
                          >
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <FiUser size={18} />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-xs sm:text-sm">Student Login</div>
                              <div className="text-[10px] text-slate-400">Access courses & roadmap</div>
                            </div>
                          </Link>

                          {/* Admin Login Button */}
                          <Link
                            to="/login?role=admin"
                            onClick={() => setIsLoginDropdownOpen(false)}
                            className="
                              flex items-center gap-3 p-2.5 rounded-xl
                              hover:bg-slate-100 text-darkNavy
                              transition-all duration-200 group
                            "
                          >
                            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-darkNavy group-hover:text-white transition-colors">
                              <FiShield size={18} />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-xs sm:text-sm">Admin Login</div>
                              <div className="text-[10px] text-slate-400">Faculty & staff panel</div>
                            </div>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Logged-In User Profile & Menu */
                  <div>
                    <button
                      onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                      className="
                        inline-flex items-center gap-2
                        px-3.5 py-1.5 xl:px-4 xl:py-2
                        rounded-xl text-xs xl:text-sm font-semibold
                        text-darkNavy bg-slate-100 hover:bg-slate-200/80
                        border border-slate-200 transition-all cursor-pointer
                      "
                    >
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                        {user.role === 'admin' ? <FiShield size={12} /> : <FiUser size={12} />}
                      </div>
                      <span className="max-w-[120px] truncate">{user.name}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                        {user.role}
                      </span>
                      <FiChevronDown size={14} className={isLoginDropdownOpen ? 'rotate-180' : ''} />
                    </button>

                    <AnimatePresence>
                      {isLoginDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="
                            absolute right-0 mt-2 w-56
                            bg-white rounded-2xl shadow-xl
                            border border-slate-100 p-2 z-50
                          "
                        >
                          <div className="px-3 py-2 border-b border-slate-100 mb-1">
                            <p className="text-xs font-bold text-darkNavy truncate">{user.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                          </div>

                          <Link
                            to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
                            onClick={() => setIsLoginDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-darkNavy hover:bg-slate-50 hover:text-primary transition-colors"
                          >
                            <FiGrid size={15} />
                            <span>My Dashboard</span>
                          </Link>

                          <Link
                            to="/courses"
                            onClick={() => setIsLoginDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-darkNavy hover:bg-slate-50 hover:text-primary transition-colors"
                          >
                            <FiBook size={15} />
                            <span>Explore Courses</span>
                          </Link>

                          <div className="border-t border-slate-100 my-1" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                          >
                            <FiLogOut size={15} />
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Mobile & Tablet Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="
                  lg:hidden
                  p-2 sm:p-2.5
                  rounded-xl
                  bg-slate-100/90
                  hover:bg-slate-200
                  text-darkNavy
                  border border-slate-200/70
                  shadow-2xs
                  transition-all duration-200
                  cursor-pointer
                  active:scale-95
                "
              >
                {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle accent border line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      </motion.nav>

      {/* Mobile Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-darkNavy/40 backdrop-blur-xs"
            />

            {/* Drawer Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="
                relative
                pt-20 sm:pt-22 pb-6
                px-4 sm:px-6
                bg-white/98
                backdrop-blur-2xl
                border-b border-slate-200
                shadow-2xl
                max-h-[90vh]
                overflow-y-auto
              "
            >
              <div className="max-w-md mx-auto space-y-4">
                {/* Nav Links List */}
                <div className="space-y-1 bg-slate-50/80 p-2 rounded-2xl border border-slate-100">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center justify-between
                          px-3.5 py-2.5 rounded-xl
                          text-sm font-medium
                          transition-all duration-200
                          ${
                            isActive
                              ? 'bg-primary text-white font-semibold shadow-xs'
                              : 'text-darkNavy/85 hover:bg-slate-200/60 hover:text-primary'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={16}
                            className={isActive ? 'text-white' : 'text-primary/75'}
                          />
                          <span>{link.name}</span>
                        </div>
                        <FiChevronRight
                          size={14}
                          className={isActive ? 'text-white/80' : 'text-slate-400'}
                        />
                      </Link>
                    )
                  })}
                </div>

                {/* Mobile Auth Actions */}
                {!isAuthenticated ? (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      Login Portals
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="
                          flex items-center justify-center gap-2
                          py-2.5 px-3
                          rounded-xl text-xs font-semibold
                          text-primary border border-primary/30
                          bg-white hover:bg-primary hover:text-white
                          shadow-2xs transition-all text-center
                        "
                      >
                        <FiUser size={15} />
                        <span>Student Login</span>
                      </Link>
                      <Link
                        to="/login?role=admin"
                        onClick={() => setIsOpen(false)}
                        className="
                          flex items-center justify-center gap-2
                          py-2.5 px-3
                          rounded-xl text-xs font-semibold
                          text-white bg-gradient-to-r from-primary to-blue-600
                          hover:from-primary/95 hover:to-blue-700
                          shadow-xs transition-all text-center
                        "
                      >
                        <FiShield size={15} />
                        <span>Admin Login</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <div className="font-bold text-xs text-darkNavy">{user.name}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{user.role} Account</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:underline"
                      >
                        <FiLogOut size={13} /> Logout
                      </button>
                    </div>
                    <Link
                      to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
                    >
                      <FiGrid size={14} /> My Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
