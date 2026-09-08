import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiShield,
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiTrendingUp,
  FiLogOut,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiSearch,
  FiFilter
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { courses } from '../data/courses'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const stats = [
    { label: 'Active Students', value: '1,420', change: '+12% this month', icon: FiUsers, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Course Catalog', value: `${courses.length} Programs`, change: 'All active', icon: FiBookOpen, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Total Enrollments', value: '3,890', change: '+28% Q3', icon: FiTrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Partner Referrals', value: '142 Placed', change: '94% success rate', icon: FiShield, color: 'text-amber-600 bg-amber-50' },
  ]

  const recentEnrollments = [
    { id: 'ENR-904', student: 'Aarav Sharma', email: 'aarav.sharma@example.com', course: 'Full Stack Web Development Bootcamp', date: 'Sep 08, 2026', amount: '₹24,999', status: 'Approved' },
    { id: 'ENR-903', student: 'Pooja Verma', email: 'pooja.verma@example.com', course: 'AI & Machine Learning Mastery', date: 'Sep 07, 2026', amount: '₹29,999', status: 'Approved' },
    { id: 'ENR-902', student: 'Rohan Gupta', email: 'rohan.gupta@example.com', course: 'Data Analytics with Python & Power BI', date: 'Sep 06, 2026', amount: '₹19,999', status: 'Pending' },
    { id: 'ENR-901', student: 'Simran Kaur', email: 'simran.kaur@example.com', course: 'UI/UX Design Masterclass', date: 'Sep 05, 2026', amount: '₹14,999', status: 'Approved' },
    { id: 'ENR-900', student: 'Aditya Singh', email: 'aditya.singh@example.com', course: 'Cyber Security & Ethical Hacking', date: 'Sep 04, 2026', amount: '₹27,999', status: 'Approved' },
  ]

  const filteredEnrollments = recentEnrollments.filter(
    (e) =>
      e.student.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase())
  )

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-100/70 pb-16">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-white/10 text-white flex items-center justify-center text-xl font-bold border border-white/15">
              <FiShield />
            </div>
            <div>
              <div className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                Admin Console
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Faculty & Administration Panel
              </h1>
              <p className="text-xs text-slate-400">
                Logged in as {user?.name || 'Administrator'} ({user?.email || 'admin@explorewithrts.com'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student-dashboard"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              Switch to Student View
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FiLogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">{s.change}</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                <div className="text-xs font-medium text-slate-500 mt-1">{s.label}</div>
              </div>
            )
          })}
        </div>

        {/* Recent Enrollments Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Student Admissions</h2>
              <p className="text-xs text-slate-500">Live feed of applicants enrolling in programs.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search enrollments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-5">Enrollment ID</th>
                  <th className="py-3.5 px-5">Student</th>
                  <th className="py-3.5 px-5">Enrolled Course</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Fee Amount</th>
                  <th className="py-3.5 px-5">Admission Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnrollments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-slate-500 font-semibold">{item.id}</td>
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900">{item.student}</div>
                      <div className="text-[11px] text-slate-400">{item.email}</div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-slate-700 max-w-xs truncate">{item.course}</td>
                    <td className="py-3.5 px-5 text-slate-500">{item.date}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{item.amount}</td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.status === 'Approved' ? <FiCheckCircle size={11} /> : <FiClock size={11} />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
