import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

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
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiMapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-darkNavy">Address</h3>
                <p className="text-sm text-darkNavy/60 mt-1">123 Tech Park, Sector 15, Gurugram, Haryana 122001</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiMail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-darkNavy">Email</h3>
                <p className="text-sm text-darkNavy/60 mt-1">support@rewantech.com</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiPhone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-darkNavy">Phone</h3>
                <p className="text-sm text-darkNavy/60 mt-1">+91 98765 43210</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-64">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.0365!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDInMTEuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                className="w-full h-full border-0"
                loading="lazy"
              />
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
