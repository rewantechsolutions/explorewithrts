import { useParams, Link } from 'react-router-dom'
import { FiStar, FiUsers, FiClock, FiBookOpen, FiCheck } from 'react-icons/fi'
import { courses } from '../data/courses'

export default function CourseDetail() {
  const { id } = useParams()
  const course = courses.find(c => c.id === Number(id)) || courses[0]

  return (
    <div className="pt-20 min-h-screen">
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-16">
        <div className="container-custom px-4">
          <p className="text-gold text-sm font-medium mb-2">{course.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">{course.title}</h1>
          <p className="text-white/80 mb-6 max-w-2xl">{course.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1"><FiStar className="text-gold" fill="currentColor" /> {course.rating} Rating</span>
            <span className="flex items-center gap-1"><FiUsers /> {course.students.toLocaleString()} Students</span>
            <span className="flex items-center gap-1"><FiClock /> {course.duration}</span>
            <span className="flex items-center gap-1"><FiBookOpen /> {course.lessons} Lessons</span>
          </div>
        </div>
      </section>

      <div className="container-custom px-4 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {['Master core technologies', 'Build real-world projects', 'Get industry certification', 'Placement assistance', 'Lifetime access', 'Community support'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-darkNavy/70">
                  <FiCheck className="text-green-500 shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Course Content</h2>
            <div className="space-y-2">
              {['Introduction & Setup', 'Core Concepts', 'Advanced Topics', 'Projects', 'Interview Prep'].map((mod, i) => (
                <div key={i} className="bg-lightBg rounded-xl p-4 flex justify-between items-center">
                  <span className="font-medium text-darkNavy">Module {i + 1}: {mod}</span>
                  <span className="text-sm text-darkNavy/50">{(i + 1) * 8} lessons</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-2xl shadow-premium p-6 border border-gray-100">
            <img src={course.image} alt={course.title} className="w-full aspect-video object-cover rounded-xl mb-4" />
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
              <span className="text-darkNavy/40 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
            </div>
            <button className="w-full btn-primary mb-3">Enroll Now</button>
            <button className="w-full btn-secondary">Add to Wishlist</button>
            <div className="mt-6 space-y-2 text-sm text-darkNavy/60">
              <p>✓ Lifetime access</p>
              <p>✓ Certificate of completion</p>
              <p>✓ Placement support</p>
              <p>✓ 30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
