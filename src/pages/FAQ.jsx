import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { faqs } from '../data/courses'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <div className="pt-20 min-h-screen bg-lightBg/30">
      <section className="bg-gradient-to-br from-primary to-darkNavy text-white py-16">
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-white/80">Everything you need to know about Rewan Tech Solutions</p>
        </div>
      </section>

      <div className="container-custom px-4 py-12 max-w-3xl">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-darkNavy pr-4">{faq.question}</span>
                <span className="text-primary shrink-0">
                  {open === i ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-darkNavy/70 text-sm leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
