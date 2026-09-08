import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-20">
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Rewan Tech Solutions</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Empowering the next generation of tech professionals with industry-ready skills and AI-powered career tools.
          </p>
        </div>
      </section>
      <div className="container-custom px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-darkNavy mb-4">Our Mission</h2>
            <p className="text-darkNavy/70 leading-relaxed mb-6">
              At Rewan Tech Solutions, we believe every student deserves access to world-class education and career guidance. 
              We've built a complete Career Transformation Platform that goes beyond traditional LMS — combining expert-led courses, 
              AI career tools, placement support, and a thriving community.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '10,000+', l: 'Students Trained' },
                { n: '2,500+', l: 'Placements' },
                { n: '300+', l: 'Hiring Partners' },
                { n: '95%', l: 'Success Rate' },
              ].map((s, i) => (
                <div key={i} className="bg-lightBg rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{s.n}</p>
                  <p className="text-sm text-darkNavy/60">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-xl font-bold text-darkNavy">Building Careers Since 2020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
