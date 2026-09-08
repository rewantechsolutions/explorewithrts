import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaYoutube, FaTelegram, FaTwitter } from 'react-icons/fa'
import logo from '../assets/nblogo.png';
export default function Footer() {
  return (
    <footer className="bg-darkNavy text-white">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
             <Link to="/" className="flex items-center">
  <img
    src={logo}
    alt="Rewan Tech Solutions"
     className="w-[120px] sm:w-[130px] md:w-[200px] lg:w-[230px] xl:w-[230px] h-auto object-contain"
  />
  
</Link> 
</div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Transforming careers with industry-ready skills, AI-powered learning tools, and 100% placement assistance.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
  <a
    href="https://wa.me/919854509844"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-green-500 hover:scale-110 transition-transform"
  >
    <FaWhatsapp className="text-white text-lg sm:text-xl md:text-2xl" />
  </a>

  <a
    href="https://www.instagram.com/rewan_tech"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-pink-600 hover:scale-110 transition-transform"
  >
    <FaInstagram className="text-white text-lg sm:text-xl md:text-2xl" />
  </a>

  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-blue-600 hover:scale-110 transition-transform"
  >
    <FaFacebook className="text-white text-lg sm:text-xl md:text-2xl" />
  </a>

  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-blue-700 hover:scale-110 transition-transform"
  >
    <FaLinkedin className="text-white text-lg sm:text-xl md:text-2xl" />
  </a>





  <a
    href="https://x.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-black border border-white/20 hover:scale-110 transition-transform"
  >
    <FaTwitter className="text-white text-lg sm:text-xl md:text-2xl" />
  </a>
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {['Home', 'Courses', 'About', 'Blog', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Popular Courses</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {['Full Stack Development', 'AI & Machine Learning', 'Data Analytics', 'Digital Marketing', 'UI/UX Design', 'DevOps & Cloud'].map((item) => (
                <li key={item}>
                  <Link to="/courses" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Support</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/faq" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><Link to="/career-roadmap" className="hover:text-white transition-colors">Career Roadmap</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Job Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2026 Rewan Tech Solutions. All rights reserved.</p>
          <p>Made with ❤️ for aspiring professionals</p>
        </div>
      </div>
    </footer>
  )
}
