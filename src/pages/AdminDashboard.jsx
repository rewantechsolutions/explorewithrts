import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiUsers, FiBook, FiDollarSign, FiSettings, FiLogOut, FiMenu, FiX, FiBell } from 'react-icons/fi'

const links = [
  { name: 'Dashboard', icon: FiHome, id: 'dash' },
  { name: 'Students', icon: FiUsers, id: 'students' },
  { name: 'Courses', icon: FiBook, id: 'courses' },
  { name: 'Revenue', icon: FiDollarSign, id: 'revenue' },
  { name: 'Settings', icon: FiSettings, id: 'settings' },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [active, setActive] = useState('dash')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-darkNavy text-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <span className="font-bold text-lg">Admin Panel</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><FiX /></button>
        </div>
        <nav className="p-3 space-y-1">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => { setActive(l.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${active === l.id ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'}`}
            >
              <l.icon size={18} /> {l.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-white/10">
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}><FiMenu /></button>
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2"><FiBell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </header>

        <main className="p-6">
          <h2 className="text-2xl font-bold text-darkNavy mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Students', value: '10,245', change: '+12%' },
              { label: 'Active Courses', value: '48', change: '+3' },
              { label: 'Revenue (MTD)', value: '₹18.5L', change: '+8%' },
              { label: 'Placements', value: '156', change: '+22' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-sm text-darkNavy/50">{s.label}</p>
                <p className="text-2xl font-bold text-darkNavy mt-1">{s.value}</p>
                <p className="text-xs text-green-600 mt-1">{s.change} this month</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-darkNavy mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              {['New student enrolled in Full Stack Bootcamp', 'Payment received: ₹24,999', 'Certificate issued to Ananya Patel', 'New job posted: Frontend Developer'].map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-darkNavy/70">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
