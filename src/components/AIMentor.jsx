import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import { Bot } from 'lucide-react'

const suggestions = [
  'Recommend a course for me',
  'Help me build a career roadmap',
  'How to prepare for interviews?',
  'Resume tips for freshers',
]

export default function AIMentor() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m your AI Career Mentor 👋 How can I help you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = (text = input) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    
    // Mock AI response
    setTimeout(() => {
      const responses = [
        'Based on current market trends, I recommend starting with Full Stack Development or Data Analytics. Would you like me to generate a personalized roadmap?',
        'Great question! For interview preparation, use our AI Interview Simulator. Practice both HR and Technical rounds regularly.',
        'I can help analyze your resume. Upload it in the Student Dashboard under Resume Analyzer for detailed ATS score and suggestions.',
        'Your learning streak is looking good! Keep going to unlock more achievement badges and climb the leaderboard.',
      ]
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: responses[Math.floor(Math.random() * responses.length)] 
      }])
    }, 800)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-premium flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
      >
        <Bot size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">AI Career Mentor</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-lightBg/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-br-md' 
                      : 'bg-white text-darkNavy shadow-sm rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 bg-lightBg text-primary rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={() => handleSend()}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
