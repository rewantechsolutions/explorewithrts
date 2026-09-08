import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiExternalLink, FiNavigation } from 'react-icons/fi'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-20 min-h-screen bg-lightBg/30">
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-16">
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-white/80">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </section>

      <div className="container-custom px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiMapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-darkNavy">Address</h3>
                <p className="text-sm text-darkNavy/70 mt-1">SS-909,Sector-G,LDA Colony,(226012) Lucknow(U.P)</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiMail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-darkNavy">Official Emails</h3>
                <div className="mt-1 space-y-1">
                  <a href="mailto:contact@explorewithrts.com" className="text-sm text-primary hover:underline block font-medium">
                    contact@explorewithrts.com
                  </a>
                  <a href="mailto:info@explorewithrts.com" className="text-sm text-primary/85 hover:underline block">
                    info@explorewithrts.com
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiPhone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-darkNavy">Phone</h3>
                <a href="tel:+918545098444" className="text-sm text-primary hover:underline mt-1 block font-medium">
                  +91 8545098444
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="h-64 sm:h-72 w-full relative">
                <iframe
                  title="Rewan Tech Solutions Location - SS-909 Sector-G LDA Colony Lucknow"
                  src="https://maps.google.com/maps?q=SS-909%2C%20Sector-G%2C%20LDA%20Colony%2C%20Lucknow%2C%20Uttar%20Pradesh%20226012&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="p-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-darkNavy/70 font-medium flex items-center gap-1.5 truncate">
                  <FiMapPin className="text-primary shrink-0 text-sm" />
                  <span className="truncate">Sector-G, LDA Colony, Lucknow (226012)</span>
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=SS-909%2C+Sector-G%2C+LDA+Colony%2C+Lucknow%2C+Uttar+Pradesh+226012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary font-semibold hover:underline shrink-0 ml-2"
                >
                  <FiNavigation className="text-xs" />
                  <span>Open in Maps</span>
                  <FiExternalLink className="text-[10px]" />
                </a>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-sm space-y-4"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-darkNavy">Message Sent!</h3>
                <p className="text-darkNavy/60 mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-darkNavy mb-2">Send us a message</h3>
                {['name', 'email', 'phone'].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-darkNavy capitalize mb-1.5 block">{field}</label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/30"
                      required
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-darkNavy mb-1.5 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    required
                  />
                </div>
                <button type="submit" className="w-full btn-primary">Send Message</button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  )
}
