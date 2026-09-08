import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiSearch, FiFilter } from 'react-icons/fi'
import { courses, categories } from '../data/courses'
import explorecourses from '../assets/edulogo.png'

export default function Courses() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory
    return matchSearch && matchCat
  })

  return (
    <div className="pt-20 min-h-screen bg-lightBg/30">
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-16">
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-white/80 max-w-xl mx-auto">Industry-ready programs designed to transform your career</p>
        </div>
      </section>

      <div className="container-custom px-4 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-darkNavy/40" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${selectedCategory === 'All' ? 'bg-primary text-white' : 'bg-white text-darkNavy'}`}
            >
              All
            </button>
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-white text-darkNavy'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all card-hover"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 rounded-lg text-xs font-semibold text-primary">{course.category}</div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-darkNavy mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-darkNavy/60 mb-3">{course.instructor}</p>
                <div className="flex items-center gap-3 text-sm text-darkNavy/50 mb-4">
                  <span className="flex items-center gap-1"><FiStar className="text-gold" fill="currentColor" size={14} /> {course.rating}</span>
                  <span>•</span>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary"></span>
                    <span className="text-sm text-darkNavy/40 line-through ml-2"></span>
                  </div>
                  <Link to={`/courses/${course.id}`} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
