import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiUser, FiSearch, FiArrowRight, FiTag } from 'react-icons/fi'

export default function Blog() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const articles = [
    {
      id: 1,
      title: 'How to Crack Full-Stack Engineering Interviews in 2026',
      excerpt: 'Comprehensive step-by-step roadmap covering system design, MERN stack DSA, and mock interview preparations.',
      category: 'Career Advice',
      author: 'Rahul Sharma',
      date: 'Aug 24, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Top 7 AI & Machine Learning Trends Every Developer Should Master',
      excerpt: 'From Large Language Models and fine-tuning to vector databases and agentic workflows.',
      category: 'AI & Tech',
      author: 'Dr. Priya Mehta',
      date: 'Aug 18, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Why Real-World Capstone Projects Trump Certificates in Hiring',
      excerpt: 'Hiring managers share what stands out on GitHub repositories and how to architect deployable products.',
      category: 'Placement Tips',
      author: 'Amit Verma',
      date: 'Aug 12, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Transitioning from Non-Tech to High-Paying Developer Roles',
      excerpt: 'Inspirational journeys of RTS students who switched careers into software development and data analysis.',
      category: 'Success Stories',
      author: 'Neha Patel',
      date: 'Jul 29, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    },
  ]

  const categories = ['All', 'Career Advice', 'AI & Tech', 'Placement Tips', 'Success Stories']

  const filtered = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCategory === 'All' || a.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="pt-20 min-h-screen bg-lightBg/20 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-darkNavy text-white py-14 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Insights & Resources</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2 mb-3">Explore RTS Tech Blog</h1>
          <p className="text-sm sm:text-base text-blue-100/80 max-w-xl mx-auto">
            Practical guides, interview strategies, and engineering deep-dives curated by our faculty.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-xs font-bold text-primary shadow-xs">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><FiCalendar size={13} /> {item.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FiClock size={13} /> {item.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-darkNavy group-hover:text-primary transition-colors line-clamp-2 mb-3">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-slate-50 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {item.author[0]}
                  </div>
                  <span className="text-xs font-semibold text-darkNavy">{item.author}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <FiArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
