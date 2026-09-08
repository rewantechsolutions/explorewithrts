import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiLock, FiClock, FiAward, FiArrowRight } from 'react-icons/fi'

const careers = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'Data Scientist',
  'AI/ML Engineer',
  'DevOps Engineer',
  'Cloud Engineer',
  'Cyber Security Expert',
  'UI/UX Designer',
  'Digital Marketing Specialist',
]

const roadmaps = {
  'Full Stack Developer': [
    { title: 'Foundation Skills', items: ['HTML, CSS, JavaScript Basics', 'Git & GitHub', 'Problem Solving', 'Computer Fundamentals'], time: '4 weeks', status: 'completed' },
    { title: 'Core Technologies', items: ['React.js / Next.js', 'Node.js & Express', 'MongoDB / PostgreSQL', 'REST APIs'], time: '8 weeks', status: 'completed' },
    { title: 'Hands-On Projects', items: ['E-commerce Platform', 'Social Media App', 'Task Management System', 'Portfolio Website'], time: '6 weeks', status: 'current' },
    { title: 'Advanced Concepts', items: ['TypeScript', 'System Design Basics', 'Authentication (JWT)', 'Deployment & CI/CD'], time: '5 weeks', status: 'locked' },
    { title: 'Portfolio Building', items: ['3+ Production Projects', 'GitHub Profile Optimization', 'LinkedIn Branding', 'Personal Brand'], time: '3 weeks', status: 'locked' },
    { title: 'Mock Interviews', items: ['DSA Practice', 'System Design Rounds', 'HR Interview Prep', 'Behavioral Questions'], time: '4 weeks', status: 'locked' },
    { title: 'Internship Readiness', items: ['Resume Optimization', 'Apply to Internships', 'Networking', 'Open Source'], time: '3 weeks', status: 'locked' },
    { title: 'Job Readiness', items: ['Final Projects Review', 'Interview Marathon', 'Offer Negotiation', 'Onboarding Prep'], time: '2 weeks', status: 'locked' },
  ],
  'Data Analyst': [
    { title: 'Foundation Skills', items: ['Excel Advanced', 'SQL Basics', 'Statistics Fundamentals', 'Data Thinking'], time: '3 weeks', status: 'completed' },
    { title: 'Core Technologies', items: ['Python for Data', 'Pandas & NumPy', 'Power BI / Tableau', 'SQL Advanced'], time: '7 weeks', status: 'current' },
    { title: 'Hands-On Projects', items: ['Sales Dashboard', 'Customer Churn Analysis', 'Marketing Analytics', 'Financial Reports'], time: '5 weeks', status: 'locked' },
    { title: 'Advanced Concepts', items: ['A/B Testing', 'Predictive Analytics', 'ETL Basics', 'Business Storytelling'], time: '4 weeks', status: 'locked' },
    { title: 'Portfolio Building', items: ['5+ Case Studies', 'Dashboard Portfolio', 'GitHub + Kaggle', 'Blog Writing'], time: '3 weeks', status: 'locked' },
    { title: 'Mock Interviews', items: ['SQL Interviews', 'Case Study Rounds', 'Behavioral', 'Domain Knowledge'], time: '3 weeks', status: 'locked' },
    { title: 'Internship Readiness', items: ['Resume for Analysts', 'Apply Strategically', 'Networking', 'Freelance Projects'], time: '3 weeks', status: 'locked' },
    { title: 'Job Readiness', items: ['Final Review', 'Interview Practice', 'Offer Prep', 'First 90 Days'], time: '2 weeks', status: 'locked' },
  ],
}

// Default for other careers
const defaultRoadmap = roadmaps['Full Stack Developer']

export default function CareerRoadmap() {
  const [selected, setSelected] = useState('Full Stack Developer')
  const roadmap = roadmaps[selected] || defaultRoadmap

  const completed = roadmap.filter(r => r.status === 'completed').length
  const progress = Math.round((completed / roadmap.length) * 100)

  return (
    <div className="pt-20 min-h-screen bg-lightBg/30">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-16">
        <div className="container-custom px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold font-semibold mb-2">AI CAREER ROADMAP GENERATOR</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Your Personalized Path to Success</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Select your target role and get a complete step-by-step roadmap with skills, projects, and milestones.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-4 py-12">
        {/* Career Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-10">
          <h3 className="font-semibold text-darkNavy mb-4">Select Your Target Career</h3>
          <div className="flex flex-wrap gap-2">
            {careers.map((c) => (
              <button
                key={c}
                onClick={() => setSelected(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selected === c
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-lightBg text-darkNavy hover:bg-primary/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-darkNavy">{selected} Roadmap</h3>
              <p className="text-darkNavy/60 text-sm">Estimated Total Time: ~6-8 Months</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{progress}%</p>
              <p className="text-sm text-darkNavy/60">Completed</p>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
          
          <div className="space-y-6">
            {roadmap.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative bg-white rounded-2xl p-6 shadow-sm border-l-4 ${
                  stage.status === 'completed' ? 'border-green-500' :
                  stage.status === 'current' ? 'border-primary' : 'border-gray-200'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[29px] top-8 w-5 h-5 rounded-full border-4 border-white hidden md:block ${
                  stage.status === 'completed' ? 'bg-green-500' :
                  stage.status === 'current' ? 'bg-primary' : 'bg-gray-300'
                }`} />

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                        stage.status === 'current' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {stage.status === 'completed' ? <FiCheck /> : 
                         stage.status === 'current' ? i + 1 : <FiLock size={14} />}
                      </span>
                      <h4 className="font-bold text-darkNavy text-lg">{stage.title}</h4>
                      {stage.status === 'current' && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">In Progress</span>
                      )}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-2 mb-3">
                      {stage.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-darkNavy/70">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            stage.status === 'locked' ? 'bg-gray-300' : 'bg-primary'
                          }`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center md:items-end gap-2 text-sm text-darkNavy/50">
                    <span className="flex items-center gap-1"><FiClock size={14} /> {stage.time}</span>
                    {stage.status === 'completed' && (
                      <span className="flex items-center gap-1 text-green-600"><FiAward size={14} /> Unlocked</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-darkNavy/60 mb-4">Ready to start this roadmap?</p>
          <button className="btn-primary inline-flex items-center gap-2">
            Enroll in Related Courses <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
