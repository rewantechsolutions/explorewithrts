import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/courses'

export default function Blog() {
  return (
    <div className="pt-20 min-h-screen bg-lightBg/30">
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-16">
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Latest Insights</h1>
          <p className="text-white/80">Career tips, tech trends, and success stories</p>
        </div>
      </section>
      <div className="container-custom px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all card-hover group"
            >
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-darkNavy/50 mb-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-bold text-darkNavy mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-darkNavy/60 mb-4">{post.excerpt}</p>
                <Link to="#" className="text-sm font-medium text-primary hover:underline">Read More →</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
