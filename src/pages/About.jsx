import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiAward,
  FiUsers,
  FiBookOpen,
  FiCheckCircle,
  FiTarget,
  FiCompass,
  FiArrowRight,
  FiShield,
  FiTrendingUp
} from 'react-icons/fi'

export default function About() {
  const stats = [
    { label: 'Enrolled Learners', value: '10,000+' },
    { label: 'Hiring Partners', value: '150+' },
    { label: 'Industry Mentors', value: '50+' },
    { label: 'Placement Rate', value: '94%' },
  ]

  const values = [
    {
      icon: FiTarget,
      title: 'Industry-Aligned Curriculum',
      desc: 'Syllabus designed directly with tech leaders and hiring managers to meet current industry demands.',
    },
    {
      icon: FiUsers,
      title: '1-on-1 Mentorship',
      desc: 'Regular doubt-clearing, code reviews, and career guidance from senior engineers and executives.',
    },
    {
      icon: FiAward,
      title: 'Guaranteed Practical Exposure',
      desc: 'Build capstone projects, live client simulations, and verifiable portfolio pieces for interviews.',
    },
    {
      icon: FiTrendingUp,
      title: 'Dedicated Placement Cell',
      desc: 'Comprehensive resume reviews, mock technical interviews, and direct referral drives to top tech firms.',
    },
  ]

  return (
    <div className="pt-20 min-h-screen bg-lightBg/20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-darkNavy text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold mb-4">
            <FiCompass className="text-amber-300" />
            <span>Empowering Next-Gen Tech Talent</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            About Explore With RTS
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Rewan Tech Solutions is dedicated to bridging the gap between theoretical education and real-world tech careers through mentorship, hands-on development, and direct hiring networks.
          </p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100">
          {stats.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">{item.value}</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Our Purpose</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-darkNavy">
              Transforming Ambitious Students into In-Demand Engineers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded under Rewan Tech Solutions, Explore With RTS focuses on high-impact tech training in Full-Stack Web Development, Data Analytics, Artificial Intelligence, and Cloud Computing.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our vision is to democratize high-quality tech education, ensuring every student has access to the tools, mentorship, and career opportunities required to thrive in modern global companies.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-emerald-600 shrink-0" size={18} />
                <span className="text-sm font-semibold text-darkNavy">Live interactive coding sessions & project sprints</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-emerald-600 shrink-0" size={18} />
                <span className="text-sm font-semibold text-darkNavy">100% placement assistance & hiring drive invites</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-emerald-600 shrink-0" size={18} />
                <span className="text-sm font-semibold text-darkNavy">Industry-certified credentials recognized worldwide</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-3xl p-8 border border-primary/20 relative">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg">
                RTS
              </div>
              <h3 className="text-lg font-bold text-darkNavy">Our Core Commitment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                "We don’t just teach syntax — we train you to think like an engineer, architect scalable software, and present yourself confidently in high-stakes job interviews."
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-darkNavy">Rewan Tech Solutions</div>
                  <div className="text-[11px] text-slate-400">LDA Colony, Lucknow, India</div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Contact Us</span>
                  <FiArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Why Choose Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-darkNavy mt-1">Built Around Student Success</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:shadow-md hover:bg-white hover:border-primary/20 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-darkNavy mb-2">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
