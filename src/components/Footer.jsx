import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-darkNavy text-white border-t border-white/10">
      <div className="container-custom px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Single Contact Info Block */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block">
              <Logo variant="dark" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Transforming careers with industry-ready skills, AI-powered learning tools, and 100% placement assistance.
            </p>

            {/* Official Contact Info (Single Instance) */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gold shrink-0">
                  <FiMail size={14} />
                </div>
                <div>
                  <a
                    href="mailto:info@explorewithrts.com"
                    className="hover:text-gold transition-colors font-medium text-xs sm:text-sm text-white/90"
                  >
                    info@explorewithrts.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gold shrink-0">
                  <FiPhone size={14} />
                </div>
                <div>
                  <a
                    href="tel:+918545098444"
                    className="hover:text-gold transition-colors font-medium text-xs sm:text-sm text-white/90"
                  >
                    +91 8545098444
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-white/70 text-xs">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  <FiMapPin size={14} />
                </div>
                <span className="leading-snug">
                  SS-909, Sector-G, LDA Colony, (226012) Lucknow (U.P)
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/918545098444"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-green-500 hover:scale-110 transition-transform"
                aria-label="Contact on WhatsApp"
              >
                <FaWhatsapp className="text-white text-base sm:text-lg" />
              </a>

              <a
                href="https://www.instagram.com/rewan_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-pink-600 hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-base sm:text-lg" />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-blue-600 hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <FaFacebook className="text-white text-base sm:text-lg" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-blue-700 hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-white text-base sm:text-lg" />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-black border border-white/20 hover:scale-110 transition-transform"
                aria-label="Twitter X"
              >
                <FaTwitter className="text-white text-base sm:text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {['Home', 'Courses', 'About', 'Blog', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className="hover:text-white transition-colors block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="font-semibold mb-4 text-gold text-sm tracking-wide">Popular Courses</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {[
                'Full Stack Development',
                'AI & Machine Learning',
                'Data Analytics',
                'Digital Marketing',
                'UI/UX Design',
                'DevOps & Cloud'
              ].map((item) => (
                <li key={item}>
                  <Link to="/courses" className="hover:text-white transition-colors block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-gold text-sm tracking-wide">Support</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">
                  Terms of Service
                </a>
              </li>
              <li>
                <Link to="/career-roadmap" className="hover:text-white transition-colors block">
                  Career Roadmap
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white transition-colors block">
                  Job Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-white/50 text-center sm:text-left">
          <p>© 2026 Rewan Tech Solutions. All rights reserved.</p>
          <p>Made with ❤️ for aspiring professionals</p>
        </div>
      </div>
    </footer>
  )
}
