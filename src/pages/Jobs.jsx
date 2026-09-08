import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiSearch,
  FiCheckCircle,
  FiExternalLink,
  FiSend,
  FiX
} from 'react-icons/fi'

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [applyingJob, setApplyingJob] = useState(null)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: 'Fresher / Entry-Level',
  })

  const jobListings = [
    {
      id: 1,
      title: 'Junior Full-Stack Developer',
      company: 'TechCorp Solutions',
      location: 'Lucknow / Hybrid',
      type: 'Full-time',
      salary: '₹4.5 - 7.0 LPA',
      posted: '2 days ago',
      tags: ['React.js', 'Node.js', 'MongoDB', 'Express'],
      description: 'Looking for an enthusiastic MERN stack developer with strong foundational JavaScript and RESTful API skills.',
    },
    {
      id: 2,
      title: 'Frontend React Engineer',
      company: 'Innovate AI Labs',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹6.0 - 9.5 LPA',
      posted: '3 days ago',
      tags: ['React', 'Tailwind CSS', 'TypeScript', 'Redux'],
      description: 'Build fast, responsive web interfaces and design system components for our high-growth AI SaaS products.',
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      company: 'FinMetrics Analytics',
      location: 'Noida / Hybrid',
      type: 'Internship',
      salary: '₹20,000 / month (Stipend)',
      posted: '1 day ago',
      tags: ['Python', 'SQL', 'Power BI', 'Excel'],
      description: 'Assist our data science team in data cleaning, exploratory data analysis, and building executive dashboards.',
    },
    {
      id: 4,
      title: 'Python & AI Engineer (Trainee)',
      company: 'Nexus Cognitive Systems',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      salary: '₹5.5 - 8.5 LPA',
      posted: 'Just now',
      tags: ['Python', 'PyTorch', 'LangChain', 'FastAPI'],
      description: 'Work alongside senior AI researchers implementing Retrieval-Augmented Generation (RAG) models and LLM wrappers.',
    },
    {
      id: 5,
      title: 'DevOps & Cloud Intern',
      company: 'CloudScale Infra',
      location: 'Remote',
      type: 'Internship',
      salary: '₹18,000 / month (Stipend)',
      posted: '4 days ago',
      tags: ['Docker', 'AWS', 'Linux', 'CI/CD'],
      description: 'Learn and assist in setting up containerized workflows, AWS microservices, and monitoring alerts.',
    },
    {
      id: 6,
      title: 'Digital Marketing & SEO Executive',
      company: 'GrowthPulse Media',
      location: 'Lucknow (Onsite)',
      type: 'Full-time',
      salary: '₹3.5 - 5.0 LPA',
      posted: '5 days ago',
      tags: ['SEO', 'Google Ads', 'Content Strategy', 'Analytics'],
      description: 'Drive organic search rankings and run targeted paid ad campaigns for multi-channel business clients.',
    },
  ]

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchesType = selectedType === 'All' || job.type === selectedType
    return matchesSearch && matchesType
  })

  const handleApply = (e) => {
    e.preventDefault()
    setApplicationSubmitted(true)
    setTimeout(() => {
      setApplicationSubmitted(false)
      setApplyingJob(null)
      setApplicantData({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        experience: 'Fresher / Entry-Level',
      })
    }, 2000)
  }

  return (
    <div className="pt-20 min-h-screen bg-lightBg/20 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-darkNavy text-white py-14 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 mb-3">
            <FiBriefcase />
            <span>Exclusive Placement Cell & Hiring Drives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            Explore With RTS Job Board
          </h1>
          <p className="text-sm sm:text-base text-blue-100/80 max-w-xl mx-auto">
            Direct job opportunities and paid internships curated for RTS learners and tech graduates.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role, company, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Full-time', 'Internship'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    <FiBriefcase size={18} />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    job.type === 'Full-time' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-primary'
                  }`}>
                    {job.type}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-darkNavy group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="text-xs font-semibold text-slate-500 mt-1">{job.company}</div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-50">
                  <span className="flex items-center gap-1"><FiMapPin size={13} /> {job.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600"><FiDollarSign size={13} /> {job.salary}</span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{job.posted}</span>
                <button
                  onClick={() => setApplyingJob(job)}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkNavy/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
            >
              <FiX size={18} />
            </button>

            {applicationSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <FiCheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold text-darkNavy">Application Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Your profile for <strong>{applyingJob.title}</strong> at <strong>{applyingJob.company}</strong> has been shared with the hiring manager.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Direct Candidate Referral</span>
                <h3 className="text-lg sm:text-xl font-bold text-darkNavy mt-1">
                  Apply for {applyingJob.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{applyingJob.company} • {applyingJob.location}</p>

                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={applicantData.name}
                      onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={applicantData.email}
                        onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={applicantData.phone}
                        onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">GitHub / Portfolio / LinkedIn Link</label>
                    <input
                      type="url"
                      placeholder="https://github.com/yourhandle"
                      value={applicantData.portfolio}
                      onChange={(e) => setApplicantData({ ...applicantData, portfolio: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiSend size={15} />
                    <span>Submit Application</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
