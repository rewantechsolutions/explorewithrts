import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiBriefcase, FiClock, FiBookmark } from 'react-icons/fi'

const jobs = [
  { id: 1, title: 'Junior Full Stack Developer', company: 'TechCorp', location: 'Bangalore', type: 'Full-time', salary: '6-10 LPA', tags: ['React', 'Node.js'] },
  { id: 2, title: 'Data Analyst Intern', company: 'DataViz Inc', location: 'Remote', type: 'Internship', salary: '15-25k/mo', tags: ['Python', 'SQL'] },
  { id: 3, title: 'Frontend Developer', company: 'StartupXYZ', location: 'Gurugram', type: 'Full-time', salary: '8-12 LPA', tags: ['React', 'TypeScript'] },
  { id: 4, title: 'DevOps Engineer', company: 'CloudScale', location: 'Hyderabad', type: 'Full-time', salary: '10-15 LPA', tags: ['AWS', 'Docker'] },
  { id: 5, title: 'Digital Marketing Executive', company: 'BrandBoost', location: 'Mumbai', type: 'Full-time', salary: '4-7 LPA', tags: ['SEO', 'Ads'] },
  { id: 6, title: 'UI/UX Designer', company: 'DesignLab', location: 'Remote', type: 'Full-time', salary: '7-11 LPA', tags: ['Figma', 'Research'] },
]

export default function Jobs() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? jobs : jobs.filter(j => j.type === filter)

  return (
    <div className="pt-20 min-h-screen bg-lightBg/30">
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-16">
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Jobs & Internships</h1>
          <p className="text-white/80">Exclusive opportunities from our 300+ hiring partners</p>
        </div>
      </section>

      <div className="container-custom px-4 py-12">
        <div className="flex gap-2 mb-8">
          {['All', 'Full-time', 'Internship'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${filter === f ? 'bg-primary text-white' : 'bg-white text-darkNavy'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-premium transition-all border border-transparent hover:border-primary/20"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-darkNavy text-lg">{job.title}</h3>
                  <p className="text-primary font-medium text-sm">{job.company}</p>
                </div>
                <button className="p-2 hover:bg-lightBg rounded-lg text-darkNavy/40 hover:text-primary">
                  <FiBookmark size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-darkNavy/50 mb-4">
                <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>
                <span className="flex items-center gap-1"><FiBriefcase size={14} /> {job.type}</span>
                <span className="flex items-center gap-1"><FiClock size={14} /> {job.salary}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {job.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-lightBg text-primary text-xs rounded-full">{t}</span>
                  ))}
                </div>
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
