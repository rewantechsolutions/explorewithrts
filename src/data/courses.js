export const categories = [
  { id: 1, name: 'Web Development', icon: 'Code2', color: 'from-blue-500 to-cyan-500', courses: 24 },
  { id: 2, name: 'Mobile App Development', icon: 'Smartphone', color: 'from-purple-500 to-pink-500', courses: 18 },
  { id: 3, name: 'AI & Machine Learning', icon: 'Brain', color: 'from-violet-500 to-purple-600', courses: 15 },
  { id: 4, name: 'Digital Marketing', icon: 'Megaphone', color: 'from-orange-500 to-red-500', courses: 20 },
  { id: 5, name: 'SEO', icon: 'Search', color: 'from-green-500 to-emerald-500', courses: 12 },
  { id: 6, name: 'Social Media Marketing', icon: 'Share2', color: 'from-pink-500 to-rose-500', courses: 14 },
  { id: 7, name: 'Video Editing', icon: 'Video', color: 'from-red-500 to-orange-500', courses: 10 },
  { id: 8, name: 'Graphic Designing', icon: 'Palette', color: 'from-indigo-500 to-blue-500', courses: 16 },
  { id: 9, name: 'UI/UX Design', icon: 'Figma', color: 'from-cyan-500 to-blue-500', courses: 13 },
  { id: 10, name: 'Data Analytics', icon: 'BarChart3', color: 'from-teal-500 to-green-500', courses: 11 },
  { id: 11, name: 'Cloud & DevOps', icon: 'Cloud', color: 'from-sky-500 to-blue-600', courses: 9 },
  { id: 12, name: 'Cyber Security', icon: 'Shield', color: 'from-slate-600 to-gray-800', courses: 8 },
]

export const courses = [
  {
    id: 1,
    title: 'Full Stack Web Development Bootcamp',
    instructor: 'Rahul Sharma',
    rating: 4.9,
    students: 2450,
    duration: '6 Months',
    price: 24999,
    originalPrice: 39999,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    category: 'Web Development',
    level: 'Beginner to Advanced',
    lessons: 180,
    description: 'Master MERN Stack, build real-world projects and become job-ready.',
  },
  {
    id: 2,
    title: 'AI & Machine Learning Mastery',
    instructor: 'Dr. Priya Mehta',
    rating: 4.8,
    students: 1890,
    duration: '5 Months',
    price: 29999,
    originalPrice: 44999,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    lessons: 150,
    description: 'From Python basics to Deep Learning, LLMs and Generative AI.',
  },
  {
    id: 3,
    title: 'Data Analytics with Python & Power BI',
    instructor: 'Amit Verma',
    rating: 4.7,
    students: 1650,
    duration: '4 Months',
    price: 19999,
    originalPrice: 29999,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    category: 'Data Analytics',
    level: 'Beginner',
    lessons: 120,
    description: 'Become a data-driven professional with real business case studies.',
  },
  {
    id: 4,
    title: 'Digital Marketing Pro Certification',
    instructor: 'Neha Kapoor',
    rating: 4.9,
    students: 3200,
    duration: '3 Months',
    price: 14999,
    originalPrice: 24999,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'Digital Marketing',
    level: 'All Levels',
    lessons: 90,
    description: 'SEO, Google Ads, Meta Ads, Content Strategy & Analytics.',
  },
  {
    id: 5,
    title: 'UI/UX Design Complete Guide',
    instructor: 'Sneha Reddy',
    rating: 4.8,
    students: 1420,
    duration: '4 Months',
    price: 17999,
    originalPrice: 27999,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    category: 'UI/UX Design',
    level: 'Beginner to Intermediate',
    lessons: 110,
    description: 'Figma, Design Systems, User Research and Portfolio Building.',
  },
  {
    id: 6,
    title: 'DevOps & Cloud Engineering',
    instructor: 'Vikram Singh',
    rating: 4.7,
    students: 980,
    duration: '5 Months',
    price: 26999,
    originalPrice: 39999,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    lessons: 140,
    description: 'AWS, Docker, Kubernetes, CI/CD and Infrastructure as Code.',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Ananya Patel',
    course: 'Full Stack Development',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Rewan Tech transformed my career. From zero coding knowledge to a package of 12 LPA at a product company. The live projects and placement support are outstanding!',
  },
  {
    id: 2,
    name: 'Rohit Kumar',
    course: 'Data Analytics',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Best decision of my life. The AI Career Roadmap and Interview Simulator prepared me perfectly. Got placed at Deloitte within 4 months.',
  },
  {
    id: 3,
    name: 'Sneha Gupta',
    course: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'The mentors are industry experts. Practical assignments + resume analyzer helped me land a role at a top agency with 40% hike.',
  },
  {
    id: 4,
    name: 'Arjun Mehta',
    course: 'AI & ML',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    review: 'Premium content quality. The placement readiness dashboard showed exactly where I needed to improve. Highly recommended!',
  },
]
import {
  FiUsers,
  FiBriefcase,
  FiAward,
  FiTrendingUp
} from "react-icons/fi";
  export const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Students Trained",
    icon: FiUsers,
  },
  {
    value: 500,
    suffix: "+",
    label: "Industry Projects",
    icon: FiBriefcase,
  },
  {
    value: 95,
    suffix: "%",
    label: "Placement Rate",
    icon: FiAward,
  },
  {
    value: 150,
    suffix: "+",
    label: "Hiring Partners",
    icon: FiTrendingUp,
  },
];


export const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Simply browse our courses, select the one you want, and click "Enroll Now". You can pay online securely. After payment, you get instant access to the student dashboard.',
  },
  {
    question: 'Do I get a certificate after completion?',
    answer: 'Yes! Upon successful completion of the course and projects, you receive an industry-recognized certificate from Rewan Tech Solutions that you can share on LinkedIn.',
  },
  {
    question: 'Is lifetime access available?',
    answer: 'Yes, all our courses come with lifetime access to the content, including future updates. You can learn at your own pace forever.',
  },
  {
    question: 'Do you provide placement support?',
    answer: 'Absolutely. We offer 100% placement assistance including resume building, mock interviews, job portal access, and direct connections with 300+ hiring partners.',
  },
  {
    question: 'Are classes live or recorded?',
    answer: 'We offer both! Live interactive sessions with industry experts + recorded lectures for revision. You never miss a class.',
  },
  {
    question: 'How can I contact support?',
    answer: 'You can reach us via the Contact form, WhatsApp, email (info@explorewithrts.com), or the AI Mentor chatbot available 24/7 on the platform.',
  },
]

export const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Skills to Learn in 2026 for High-Paying Tech Jobs',
    category: 'Career',
    date: 'Aug 1, 2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    excerpt: 'Discover the most in-demand skills that companies are hiring for right now.',
  },
  {
    id: 2,
    title: 'How AI is Transforming the Learning Experience',
    category: 'Technology',
    date: 'Jul 28, 2026',
    image: 'https://images.unsplash.com/photo-1677756119517-8d930c4a1c8a?w=600&h=400&fit=crop',
    excerpt: 'From personalized roadmaps to interview simulators – the future of education is here.',
  },
  {
    id: 3,
    title: 'From Zero to Full Stack Developer in 6 Months',
    category: 'Success Story',
    date: 'Jul 20, 2026',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    excerpt: 'A complete roadmap followed by our top students who cracked product companies.',
  },
]

export const partners = [
  'EduNest', 'Kamla Hospital', 'EV Halt', 'Sanjeevani Hospital', 'Siddhi Vinayak Solar', 'Tripper'
]
