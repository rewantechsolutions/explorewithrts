import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiShield } from 'react-icons/fi'
import logo from "../assets/logo.png";


const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Career Roadmap', path: '/career-roadmap' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
 <motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.5 }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-white/20"
      : "bg-transparent"
  }`}
>
      <div className="container-custom">
       <div className="h-20 sm:h-18 md:h-20 lg:h-24 flex items-center justify-between"> 
          {/* Logo */}
<Link
  to="/"
  className="flex items-center flex-shrink-0"
>
  <img
    src={logo}
    alt="Rewan Tech Solutions"
    className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[150px] xl:w-[200px] h-auto object-contain"
  />
</Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
  key={link.path}
  to={link.path}
  className={`
    relative px-4 py-2 rounded-xl
    text-sm font-semibold
    transition-all duration-300
    group overflow-hidden
    ${
      location.pathname === link.path
        ? "text-primary"
        : "text-darkNavy/80 hover:text-primary"
    }
  `}
>
  {location.pathname === link.path && (
    <motion.div
      layoutId="navbar-active"
      className="absolute inset-0 bg-primary/10 rounded-xl"
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    />
  )}

  <span className="relative z-10">
    {link.name}
  </span>

  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
</Link>
      ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
           <Link
  to="/login"
  className="
    hidden md:flex
    items-center gap-2
    px-5 py-2.5
    rounded-xl
    border border-primary/20
    bg-white/60
    backdrop-blur
    text-primary
    hover:bg-primary
    hover:text-white
    transition-all duration-300
  "
>
  <FiUser />
  Student Login
</Link>
          <Link
  to="/login?role=admin"
  className="
    hidden md:flex
    items-center gap-2
    px-5 py-2.5
    rounded-xl
    bg-gradient-to-r
    from-primary
    to-secondary
    text-white
    shadow-lg
    hover:scale-105
    hover:shadow-2xl
    transition-all duration-300
  "
>
  <FiShield />
  Admin
</Link> 
          </div>

          {/* Mobile Toggle */}
        <button
  onClick={() => setIsOpen(!isOpen)}
  className="
    lg:hidden
    p-3
    rounded-xl
    bg-white/80
    backdrop-blur-lg
    border border-white/30
    shadow-md
    hover:scale-105
    transition-all
  "
>
  {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
</button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
           className="
            lg:hidden
            bg-white/95
            backdrop-blur-2xl
            border-t
            border-gray-100
             shadow-2xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                className={`
  block
  px-4
  py-3
  rounded-2xl
  font-medium
  transition-all duration-300
  ${
    location.pathname === link.path
      ? "bg-primary text-white shadow-lg"
      : "hover:bg-primary/10 hover:text-primary"
  }
`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-primary border border-primary rounded-xl"
                >
                  <FiUser size={16} /> Student Login
                </Link>
                <Link
                  to="/login?role=admin"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium bg-primary text-white rounded-xl"
                >
                  <FiShield size={16} /> Admin Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </motion.nav>
  )
}
