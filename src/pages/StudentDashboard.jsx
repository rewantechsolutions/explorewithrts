import { useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiHome, FiBook, FiAward, FiUser, FiBell, FiLogOut, FiMenu, FiX,
  FiTrendingUp, FiFileText, FiMessageSquare, FiBriefcase, FiDownload
} from 'react-icons/fi'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'

const sidebarLinks = [
  { name: 'Overview', icon: FiHome, path: '' },
  { name: 'My Courses', icon: FiBook, path: 'courses' },
  { name: 'Placement Readiness', icon: FiTrendingUp, path: 'placement' },
  { name: 'Resume Analyzer', icon: FiFileText, path: 'resume' },
  { name: 'Interview Simulator', icon: FiMessageSquare, path: 'interview' },
  { name: 'Certificates', icon: FiAward, path: 'certificates' },
  { name: 'Jobs', icon: FiBriefcase, path: 'jobs' },
  { name: 'Profile', icon: FiUser, path: 'profile' },
]

const readinessData = [
  { subject: 'Technical', A: 82, fullMark: 100 },
  { subject: 'Projects', A: 75, fullMark: 100 },
  { subject: 'Resume', A: 68, fullMark: 100 },
  { subject: 'Interview', A: 71, fullMark: 100 },
  { subject: 'Communication', A: 78, fullMark: 100 },
]

const radialData = [{ name: 'Overall', value: 74, fill: '#0A3D91' }]

function Overview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-darkNavy">Welcome back, Rahul! 👋</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Courses Enrolled', value: '3', icon: '📚', color: 'bg-blue-50' },
          { label: 'Lessons Completed', value: '47', icon: '✅', color: 'bg-green-50' },
          { label: 'XP Points', value: '2,450', icon: '⭐', color: 'bg-yellow-50' },
          { label: 'Learning Streak', value: '12 🔥', icon: '🔥', color: 'bg-orange-50' },
        ].map((s, i) => (
          <div key={i} className={`${s.color} rounded-2xl p-5`}>
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-bold text-darkNavy mt-2">{s.value}</p>
            <p className="text-sm text-darkNavy/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-darkNavy mb-4">Continue Learning</h3>
        <div className="space-y-4">
          {[
            { title: 'Full Stack Web Development', progress: 65, next: 'React Hooks Deep Dive' },
            { title: 'Data Analytics with Python', progress: 40, next: 'Pandas Advanced' },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-lightBg/50 rounded-xl">
              <div className="flex-1">
                <p className="font-semibold text-darkNavy">{c.title}</p>
                <p className="text-sm text-darkNavy/50">Next: {c.next}</p>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <span className="text-sm font-bold text-primary">{c.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlacementReadiness() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-darkNavy">Placement Readiness Dashboard</h2>
        <p className="text-darkNavy/60">Track your job readiness score and improve systematically</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Overall Score */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <h3 className="font-semibold text-darkNavy mb-4">Overall Job Ready Score</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={10} background />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-4xl font-extrabold text-primary -mt-8">74%</p>
          <p className="text-sm text-darkNavy/50 mt-1">Good Progress</p>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-darkNavy mb-4">Skills Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={readinessData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <Radar name="Score" dataKey="A" stroke="#0A3D91" fill="#0A3D91" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Technical Skills', score: 82, color: 'text-green-600' },
          { label: 'Projects', score: 75, color: 'text-blue-600' },
          { label: 'Resume', score: 68, color: 'text-orange-600' },
          { label: 'Interview', score: 71, color: 'text-purple-600' },
          { label: 'Communication', score: 78, color: 'text-cyan-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.score}%</p>
            <p className="text-xs text-darkNavy/60 mt-1">{s.label}</p>
            <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full">
              <div className="h-full bg-primary rounded-full" style={{ width: `${s.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-darkNavy mb-4">Personalized Improvement Suggestions</h3>
        <div className="space-y-3">
          {[
            { priority: 'High', text: 'Improve Resume ATS Score – Add more keywords related to React and Node.js', action: 'Analyze Resume' },
            { priority: 'Medium', text: 'Complete 2 more projects to boost Project Score to 85%+', action: 'View Projects' },
            { priority: 'Medium', text: 'Practice 5 more mock interviews focusing on System Design', action: 'Start Interview' },
            { priority: 'Low', text: 'Join community discussions to improve communication score', action: 'Join Community' },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-lightBg/50 rounded-xl">
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                r.priority === 'High' ? 'bg-red-100 text-red-600' :
                r.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-600'
              }`}>{r.priority}</span>
              <div className="flex-1">
                <p className="text-sm text-darkNavy">{r.text}</p>
              </div>
              <button className="text-xs font-medium text-primary hover:underline whitespace-nowrap">{r.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResumeAnalyzer() {
  const [analyzed, setAnalyzed] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-darkNavy">AI Resume Analyzer</h2>
        <p className="text-darkNavy/60">Upload your resume for ATS score and improvement suggestions</p>
      </div>

      {!analyzed ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center border-2 border-dashed border-gray-200">
          <FiFileText size={48} className="mx-auto text-primary mb-4" />
          <h3 className="font-bold text-darkNavy mb-2">Upload Your Resume</h3>
          <p className="text-sm text-darkNavy/50 mb-6">PDF or DOCX (Max 5MB)</p>
          <button 
            onClick={() => setAnalyzed(true)}
            className="btn-primary"
          >
            Upload & Analyze
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'ATS Score', value: '72%', color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Resume Quality', value: '68%', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Keyword Match', value: '65%', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} rounded-2xl p-6 text-center`}>
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-darkNavy/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-darkNavy mb-4">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'MongoDB', 'REST API', 'TypeScript', 'Docker', 'AWS', 'CI/CD'].map((k) => (
                  <span key={k} className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-full">{k}</span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-darkNavy mb-4">Recommended Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['System Design', 'GraphQL', 'Redis', 'Kubernetes', 'Jest', 'Agile'].map((k) => (
                  <span key={k} className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">{k}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-darkNavy mb-4">Improvement Suggestions</h3>
            <ul className="space-y-2 text-sm text-darkNavy/70">
              <li className="flex gap-2"><span className="text-primary">•</span> Add quantifiable achievements (e.g., "Improved performance by 40%")</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Include more technical keywords from the job description</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Strengthen the Projects section with tech stack details</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Add a Professional Summary at the top</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Consider adding relevant certifications</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function InterviewSimulator() {
  const [started, setStarted] = useState(false)
  const categories = ['HR Interview', 'Technical Interview', 'Frontend Interview', 'Backend Interview', 'Data Analytics', 'DevOps']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-darkNavy">AI Interview Simulator</h2>
        <p className="text-darkNavy/60">Practice interviews with real-time AI feedback</p>
      </div>

      {!started ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setStarted(true)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-premium hover:border-primary border border-transparent transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <FiMessageSquare size={20} />
              </div>
              <h3 className="font-bold text-darkNavy">{cat}</h3>
              <p className="text-sm text-darkNavy/50 mt-1">15-20 questions • ~30 min</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-darkNavy">Technical Interview • Question 3/15</h3>
            <button onClick={() => setStarted(false)} className="text-sm text-darkNavy/50 hover:text-primary">End Session</button>
          </div>
          
          <div className="bg-lightBg rounded-xl p-6">
            <p className="text-lg font-medium text-darkNavy">
              Explain the difference between REST and GraphQL. When would you choose one over the other?
            </p>
          </div>

          <textarea
            placeholder="Type your answer here..."
            className="w-full h-32 p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />

          <div className="flex gap-3">
            <button className="btn-primary">Submit Answer</button>
            <button className="btn-secondary">Skip</button>
          </div>

          {/* Mock Feedback */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-darkNavy mb-3">Previous Answer Feedback</h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <p className="text-xl font-bold text-green-600">78%</p>
                <p className="text-xs text-darkNavy/50">Technical</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <p className="text-xl font-bold text-blue-600">82%</p>
                <p className="text-xs text-darkNavy/50">Communication</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <p className="text-xl font-bold text-purple-600">75%</p>
                <p className="text-xs text-darkNavy/50">Confidence</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const [active, setActive] = useState('')

  return (
    <div className="min-h-screen bg-lightBg/30 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">R</div>
            <span className="font-bold text-darkNavy">Student Portal</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><FiX /></button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { setActive(link.path); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active === link.path ? 'bg-primary text-white' : 'text-darkNavy/70 hover:bg-lightBg'
              }`}
            >
              <link.icon size={18} />
              {link.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={20} />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 hover:bg-lightBg rounded-lg">
              <FiBell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/40?img=12" alt="" className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium hidden sm:block">Rahul Sharma</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {active === '' && <Overview />}
          {active === 'placement' && <PlacementReadiness />}
          {active === 'resume' && <ResumeAnalyzer />}
          {active === 'interview' && <InterviewSimulator />}
          {active === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold text-darkNavy mb-6">My Courses</h2>
              <p className="text-darkNavy/60">Your enrolled courses will appear here.</p>
            </div>
          )}
          {active === 'certificates' && (
            <div>
              <h2 className="text-2xl font-bold text-darkNavy mb-6">Certificates</h2>
              <p className="text-darkNavy/60">Your earned certificates will appear here.</p>
            </div>
          )}
          {active === 'jobs' && (
            <div>
              <h2 className="text-2xl font-bold text-darkNavy mb-6">Job Applications</h2>
              <p className="text-darkNavy/60">Track your job applications here.</p>
            </div>
          )}
          {active === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-darkNavy mb-6">Profile Settings</h2>
              <p className="text-darkNavy/60">Update your profile information.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
