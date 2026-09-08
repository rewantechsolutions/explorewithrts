import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiStar, FiUsers, FiBookOpen, FiAward, FiLock } from 'react-icons/fi'
import { categories, courses, testimonials, stats, partners } from '../data/courses'
import herobg from '../assets/herobg.jpg'
import herovideo from '../assets/herovideo.mp4'


import { useEffect, useState, useRef } from 'react'
import EnrollmentModal from '../components/EnrollmentModal'
import { useAuth } from '../context/AuthContext'
import {
  UserPlus,
  BookOpen,
  GraduationCap,
  Brain,
  FolderKanban,
  Award,
  Briefcase
} from "lucide-react"

const journeySteps = [
  { title: "Register", icon: UserPlus },
  { title: "Enroll", icon: BookOpen },
  { title: "Learn", icon: GraduationCap },
  { title: "Practice", icon: Brain },
  { title: "Projects", icon: FolderKanban },
  { title: "Certification", icon: Award },
  { title: "Placement", icon: Briefcase },
]

// Animated Counter
function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, value])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function Home() {
  const [enrollModalCourse, setEnrollModalCourse] = useState(null)
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const { isAuthenticated, openLoginModal } = useAuth()
  const navigate = useNavigate()

  const handleExploreCourses = (targetPath = '/courses') => {
    if (!isAuthenticated) {
      openLoginModal(targetPath)
    } else {
      navigate(targetPath)
    }
  }

  const handleEnrollClick = (course) => {
    if (!isAuthenticated) {
      openLoginModal(`/courses/${course.id}`)
      return
    }
    setEnrollModalCourse(course)
    setIsEnrollModalOpen(true)
  }

  return (
    <div className="overflow-hidden">
      {/* ========== HERO ========== */}
      <section
        className="relative min-h-screen flex items-center pt-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        
        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center px-4 py-16">
          {/* Left Content */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              India's Premier Career Transformation Platform
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-darkNavy leading-tight mb-6"
            >
              Transform Your Future With{' '}
              <span className="gradient-text">Industry-Ready Skills</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-darkNavy/70 mb-8 max-w-lg leading-relaxed">
              Learn from industry experts, build real projects, get AI-powered career guidance,
              and land your dream job with 95% placement success rate.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <button
                onClick={() => handleExploreCourses('/courses')}
                className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                {!isAuthenticated && <FiLock className="text-amber-200" size={16} />}
                <span>Explore Courses</span> <FiArrowRight />
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto cursor-pointer">
                <FiPlay /> Free Demo Class
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-gold">
                  {[1, 2, 3, 4, 5].map(i => (
                    <FiStar key={i} fill="currentColor" size={14} />
                  ))}
                </div>
                <p className="text-darkNavy/60 font-medium">Trusted by 10,000+ students</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="bg-darkNavy rounded-2xl p-3 shadow-2xl ring-1 ring-white/10">
                <div className="bg-gradient-to-br from-primary to-secondary rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src={herovideo} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <div className="relative z-10 text-center text-white p-8">
                    <FiBookOpen size={48} className="mx-auto mb-4 opacity-80" />
                    <p className="font-semibold text-lg">Live Interactive Learning</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 glass rounded-2xl p-4 shadow-premium border border-white/40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                    <FiUsers className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-darkNavy">10,000+</p>
                    <p className="text-xs text-darkNavy/60">Active Students</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 shadow-premium border border-white/40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gold/20 flex items-center justify-center">
                    <FiAward className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-darkNavy">AI Powered</p>
                    <p className="text-xs text-darkNavy/60">Career Tools</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                className="absolute top-1/2 -right-8 glass rounded-2xl px-4 py-2.5 shadow-premium border border-white/40"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="font-bold text-sm text-darkNavy">95% Success</p>
                    <p className="text-xs text-darkNavy/60">Placement Rate</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary via-darkNavy to-primary">
        <div className="absolute top-0 left-20 w-72 h-72 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-[120px]" />

        <div className="container-custom px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-gold text-sm font-semibold">
              Trusted By Thousands
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white tracking-tight">
              Numbers That Speak Success
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Transforming careers through world-class education and industry-focused training.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-4 sm:p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/10 to-transparent" />
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-5 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:bg-gold/20">
                    <Icon className="text-gold text-xl sm:text-3xl" />
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-1 sm:mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-white/70 font-medium text-xs sm:text-base">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-primary font-semibold mb-2 tracking-wide">
              EXPLORE CATEGORIES
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-darkNavy mb-4">
              Learn What Matters
            </motion.h2>
            <motion.p variants={fadeUp} className="text-darkNavy/60 max-w-2xl mx-auto">
              Choose from 12+ high-demand categories designed by industry experts
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <FiBookOpen size={20} />
                </div>
                <h3 className="font-semibold text-darkNavy mb-1.5 group-hover:text-primary transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-sm text-darkNavy/50">{cat.courses} Courses</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore <FiArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED COURSES ========== */}
      <section className="section-padding bg-slate-50/70">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <p className="text-primary font-semibold mb-2 tracking-wide">FEATURED COURSES</p>
              <h2 className="text-3xl md:text-4xl font-bold text-darkNavy">Most Popular Programs</h2>
            </div>
            <button
              onClick={() => handleExploreCourses('/courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
            >
              {!isAuthenticated && <FiLock size={14} className="text-amber-500" />}
              <span>View All Courses</span> <FiArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {courses.slice(0, 6).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/15"
              >
                <div
                  className="relative overflow-hidden aspect-[16/10] cursor-pointer"
                  onClick={() => handleExploreCourses(`/courses/${course.id}`)}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      !isAuthenticated ? 'filter blur-[1px]' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur rounded-lg text-xs font-semibold text-primary shadow-sm">
                    {course.category}
                  </div>
                  {!isAuthenticated && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-amber-500/90 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <FiLock size={11} />
                      <span>Locked</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3
                    onClick={() => handleExploreCourses(`/courses/${course.id}`)}
                    className="font-bold text-darkNavy mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    {course.title}
                  </h3>
                  <p className="text-sm text-darkNavy/55 mb-4">{course.instructor}</p>

                  <div className="flex items-center gap-3 text-sm text-darkNavy/50 mb-5">
                    <span className="flex items-center gap-1 font-medium text-darkNavy/70">
                      <FiStar className="text-gold" fill="currentColor" size={14} /> {course.rating}
                    </span>
                    <span className="text-darkNavy/30">•</span>
                    <span>{course.students.toLocaleString()} students</span>
                    <span className="text-darkNavy/30">•</span>
                    <span>{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
                      <span className="text-xs text-darkNavy/40 line-through">₹{course.originalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => handleEnrollClick(course)}
                      className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-secondary transition-colors duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY REWAN TECH (Premium) ========== */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Why Rewan Tech
              </p>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-darkNavy md:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-base text-darkNavy/60 md:text-lg">
              A complete learning ecosystem designed to take you from beginner to job-ready.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: '👨‍🏫', title: 'Industry Experts', desc: 'Learn from professionals working at top companies' },
              { icon: '🚀', title: 'Live Projects', desc: 'Build real-world projects for your portfolio' },
              { icon: '💼', title: 'Internship Opportunities', desc: 'Guaranteed internship with partner companies' },
              { icon: '🎯', title: 'Placement Assistance', desc: '100% placement support till you get hired' },
              { icon: '♾️', title: 'Lifetime Access', desc: 'Learn anytime with lifetime course access' },
              { icon: '📜', title: 'Certification', desc: 'Industry-recognized certificates' },
              { icon: '🤝', title: 'Community Support', desc: 'Join 10,000+ learner community' },
              { icon: '🧭', title: 'Career Guidance', desc: 'AI-powered personalized career mentoring' },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="group relative">
                <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)]">
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-primary/50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 ease-out group-hover:bg-primary/10" />

                  <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary/10 group-hover:shadow-md group-hover:shadow-primary/10">
                    <span className="select-none">{item.icon}</span>
                  </div>

                  <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-darkNavy transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-darkNavy/55">{item.desc}</p>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Learn more</span>
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== LEARNING PROCESS ========== */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-darkNavy via-primary to-darkNavy text-white">
        <div className="absolute top-0 left-20 w-72 h-72 bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-400/10 blur-[120px] rounded-full" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gold text-sm font-semibold">
              Your Career Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 tracking-tight">
              From Learning To Placement
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              A structured roadmap designed to transform beginners into industry-ready professionals.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-white/10 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-gold via-white to-gold rounded-full"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
              {journeySteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="group relative"
                  >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-gold/50 group-hover:shadow-[0_0_40px_rgba(255,215,0,0.2)] h-full flex flex-col items-center justify-center">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-gold to-yellow-400 text-darkNavy font-bold flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 text-sm sm:text-base">
                        {i + 1}
                      </div>
                      <Icon
                        className="mx-auto mb-2 sm:mb-3 text-gold text-xl sm:text-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                      />
                      <h3 className="font-semibold text-xs sm:text-base">{step.title}</h3>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold mb-2 tracking-wide">SUCCESS STORIES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-darkNavy">What Our Students Say</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-slate-50/80 rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:border-primary/15"
              >
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} fill="currentColor" size={14} />
                  ))}
                </div>
                <p className="text-sm text-darkNavy/70 mb-6 leading-relaxed">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100/80">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-darkNavy text-sm">{t.name}</p>
                    <p className="text-xs text-darkNavy/50">{t.course}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNERS ========== */}
      <section className="relative py-20 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 blur-3xl rounded-full" />

        <div className="container-custom px-4 text-center mb-12 relative z-10">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Trusted Partnerships
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-darkNavy mb-4">
            Our Collaboration Partners
          </h2>
          <p className="text-darkNavy/60 max-w-2xl mx-auto">
            Working together with industry-leading organizations to create innovative solutions and deliver exceptional results.
          </p>
        </div>

        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="relative overflow-hidden">
          <div className="partner-scroll flex gap-6 w-max">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="group min-w-[200px] h-20 px-8 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/30"
              >
                <span className="text-base md:text-lg font-semibold text-darkNavy/50 group-hover:text-primary transition-colors duration-300">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              Ready to Transform Your Career?
            </h2>
            <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg">
              Join 10,000+ students who have already started their journey to success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleExploreCourses('/courses')}
                className="btn-gold shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                {!isAuthenticated && <FiLock size={16} />}
                <span>Explore Courses</span>
              </button>
              <Link
                to="/career-roadmap"
                className="px-7 py-3.5 border-2 border-white/80 text-white font-semibold rounded-xl hover:bg-white hover:text-primary transition-all duration-300"
              >
                Get Free Career Roadmap
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Enrollment Modal */}
      <EnrollmentModal
        course={enrollModalCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  )
}