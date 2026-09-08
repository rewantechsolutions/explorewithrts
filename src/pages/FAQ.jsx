import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiHelpCircle, FiMail, FiPhone, FiMessageCircle } from 'react-icons/fi'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      q: 'Who can enroll in Explore With RTS courses?',
      a: 'Our courses are designed for college students, working professionals, and career switchers. We offer programs starting from absolute beginner fundamentals up to advanced production engineering.',
    },
    {
      q: 'Are the training sessions live or pre-recorded?',
      a: 'All our core bootcamps feature live interactive classes led by industry practitioners, complemented with lifetime recorded lecture backups, code repositories, and assignments.',
    },
    {
      q: 'How does the placement assistance support work?',
      a: 'Our placement cell provides resume remodeling, mock technical interviews, 1-on-1 career coaching, portfolio auditing, and direct referrals to over 150+ hiring partners.',
    },
    {
      q: 'Will I get an accredited certificate upon completion?',
      a: 'Yes, after completing all course assignments and the final capstone project submission, you receive an industry-recognized certificate from Rewan Tech Solutions with verifiable credentials.',
    },
    {
      q: 'Can I pay the course fee in installments (EMI)?',
      a: 'Yes! We offer flexible no-cost EMI options and flexible installment plans to ensure high-quality tech training remains accessible to everyone.',
    },
    {
      q: 'What happens if I miss a live class?',
      a: 'Every live session is recorded and uploaded to the student portal within 24 hours along with class notes, slides, and code walkthroughs. You can also book 1-on-1 doubt clearing slots.',
    },
    {
      q: 'Do you offer offline classroom sessions or is it online only?',
      a: 'We offer hybrid learning! We have interactive online classes for students worldwide and physical center support at our Lucknow (LDA Colony) office.',
    },
  ]

  return (
    <div className="pt-20 min-h-screen bg-lightBg/20 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-darkNavy text-white py-14 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 mb-3">
            <FiHelpCircle />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-blue-100/80 max-w-xl mx-auto">
            Everything you need to know about our bootcamps, admission process, and placement support.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-primary/40 shadow-md' : 'border-slate-100 shadow-2xs hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-primary' : 'text-darkNavy'}`}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <FiChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Contact CTA Card */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-lg text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
            <FiMessageCircle size={22} />
          </div>
          <h3 className="text-xl font-bold text-darkNavy mb-2">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
            Can’t find the answer you’re looking for? Reach out directly to our student counseling team.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-secondary transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="tel:+918545098444"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-darkNavy text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
            >
              <FiPhone size={14} />
              <span>+91 8545098444</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
