import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCompass,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiCpu,
  FiCloud,
  FiArrowRight,
  FiBookOpen,
  FiAward
} from 'react-icons/fi'

export default function CareerRoadmap() {
  const roadmaps = [
    {
      id: 'fullstack',
      name: 'Full-Stack Developer',
      icon: FiCode,
      duration: '6 Months',
      description: 'Master frontend, backend, APIs, database architecture, and end-to-end cloud deployments.',
      steps: [
        {
          phase: 'Phase 1: Web Fundamentals (Weeks 1-4)',
          topics: ['Modern HTML5 & Semantic Web', 'CSS3, Flexbox, CSS Grid & Tailwind CSS', 'JavaScript ES6+, DOM manipulation & Asynchronous JS'],
          project: 'Responsive Portfolio & Interactive SaaS Landing Page',
        },
        {
          phase: 'Phase 2: Frontend Engineering with React (Weeks 5-10)',
          topics: ['Component Architecture & Hooks', 'State Management & Custom Hooks', 'Routing with React Router', 'REST API Integration & Performance Optimization'],
          project: 'E-Commerce Platform with Live Cart & Payment Gateway Integration',
        },
        {
          phase: 'Phase 3: Backend & Database Mastery (Weeks 11-16)',
          topics: ['Node.js runtime & Express.js microservices', 'MongoDB, Mongoose & PostgreSQL', 'Authentication (JWT, OAuth2, RBAC)', 'Security best practices & API rate limiting'],
          project: 'Full-Scale Collaborative Task Management & Team Workspace Backend',
        },
        {
          phase: 'Phase 4: Full Stack Integration & DevOps (Weeks 17-24)',
          topics: ['Full-stack MERN orchestration', 'Docker containerization & CI/CD Pipelines', 'AWS / Cloud Run deployment', 'System Design & DSA Interview Preparation'],
          project: 'Production-Ready Enterprise LMS Platform with Live Video Calling',
        },
      ],
      recommendedCourseId: 1,
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning Engineer',
      icon: FiCpu,
      duration: '5 Months',
      description: 'From Python mathematical foundations to Deep Learning, LLM fine-tuning, and Agentic AI architectures.',
      steps: [
        {
          phase: 'Phase 1: Foundations & Python for Data (Weeks 1-4)',
          topics: ['Python for Scientific Computing', 'NumPy, Pandas & Matplotlib', 'Probability, Statistics & Linear Algebra'],
          project: 'Automated Financial Stock Analytics & EDA Visualizer',
        },
        {
          phase: 'Phase 2: Core Machine Learning Algorithms (Weeks 5-10)',
          topics: ['Regression, Classification & Clustering', 'Scikit-Learn pipeline creation', 'Model evaluation & hyperparameter tuning', 'Feature engineering at scale'],
          project: 'Customer Churn & Fraud Detection Classification Engine',
        },
        {
          phase: 'Phase 3: Deep Learning & Neural Networks (Weeks 11-15)',
          topics: ['PyTorch & TensorFlow frameworks', 'Convolutional Neural Networks (Computer Vision)', 'Recurrent Networks & Transformers (NLP)'],
          project: 'Medical X-Ray & MRI Anomaly Detection Model',
        },
        {
          phase: 'Phase 4: Generative AI & LLM Systems (Weeks 16-20)',
          topics: ['Prompt Engineering & Few-Shot In-Context Learning', 'LangChain, LlamaIndex & Vector DBs (Pinecone, Chroma)', 'RAG Pipelines & Multi-Agent systems'],
          project: 'Enterprise Multi-Agent Customer Support & Research Assistant',
        },
      ],
      recommendedCourseId: 2,
    },
    {
      id: 'data-analytics',
      name: 'Data Analyst & BI Specialist',
      icon: FiDatabase,
      duration: '4 Months',
      description: 'Turn complex raw business data into actionable visual insights and executive dashboards.',
      steps: [
        {
          phase: 'Phase 1: Excel to Advanced SQL (Weeks 1-4)',
          topics: ['Advanced Excel (VLOOKUP, Pivot Tables, Power Query)', 'SQL fundamentals: SELECT, JOINs, Subqueries', 'Window Functions & Database Indexing'],
          project: 'Multi-Store Retail Sales Analysis in SQL',
        },
        {
          phase: 'Phase 2: Business Intelligence with Power BI & Tableau (Weeks 5-8)',
          topics: ['Data Modeling & Star Schema Architecture', 'DAX calculations & KPI metrics creation', 'Interactive Storytelling & Executive Dashboards'],
          project: 'End-to-End Global Supply Chain Executive Dashboard',
        },
        {
          phase: 'Phase 3: Python for Exploratory Analysis (Weeks 9-12)',
          topics: ['Pandas for Data Wrangling', 'Seaborn & Plotly visualizations', 'Statistical hypothesis testing & A/B testing'],
          project: 'Marketing Campaign Conversion Optimization Study',
        },
        {
          phase: 'Phase 4: Capstone & Industry Portfolio (Weeks 13-16)',
          topics: ['Business acumen & KPI definition', 'Portfolio showcase on GitHub & Tableau Public', 'Mock technical interviews & Case studies'],
          project: 'Live Financial Forecast & Portfolio Optimization Model',
        },
      ],
      recommendedCourseId: 3,
    },
    {
      id: 'devops',
      name: 'Cloud & DevOps Architect',
      icon: FiCloud,
      duration: '5 Months',
      description: 'Architect scalable cloud infrastructure, automate deployment pipelines, and ensure high availability.',
      steps: [
        {
          phase: 'Phase 1: Linux & Shell Scripting (Weeks 1-4)',
          topics: ['Linux System Administration & Networking', 'Bash automation scripts & Cron jobs', 'Git branching workflows & GitOps principles'],
          project: 'Automated Server Health Monitor & Backup Suite',
        },
        {
          phase: 'Phase 2: Docker Containers & Orchestration (Weeks 5-8)',
          topics: ['Docker images, multi-stage builds & Docker Compose', 'Kubernetes architecture (Pods, Services, Ingress)', 'Helm charts package management'],
          project: 'High-Availability Microservices Cluster on Kubernetes',
        },
        {
          phase: 'Phase 3: CI/CD & Infrastructure as Code (Weeks 9-14)',
          topics: ['GitHub Actions & Jenkins pipelines', 'Terraform for multi-cloud provisioning', 'Ansible configuration management'],
          project: 'Zero-Downtime Automated CI/CD Deployment Pipeline',
        },
        {
          phase: 'Phase 4: AWS Cloud Architecture & Monitoring (Weeks 15-20)',
          topics: ['AWS VPC, EC2, ECS, S3 & IAM security', 'Prometheus & Grafana observability', 'Production incident management & SRE best practices'],
          project: 'Enterprise Multi-Tier Cloud Architecture with Auto-Scaling',
        },
      ],
      recommendedCourseId: 1,
    },
  ]

  const [selectedId, setSelectedId] = useState('fullstack')
  const activeRoadmap = roadmaps.find(r => r.id === selectedId) || roadmaps[0]

  return (
    <div className="pt-20 min-h-screen bg-lightBg/20 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-darkNavy text-white py-14 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 mb-3">
            <FiCompass />
            <span>Interactive Tech Career Blueprints</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            Career Roadmaps
          </h1>
          <p className="text-sm sm:text-base text-blue-100/80 max-w-xl mx-auto">
            Choose your target tech career track and follow the battle-tested milestone milestones created by RTS engineers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Track Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {roadmaps.map((r) => {
            const Icon = r.icon
            const isSelected = r.id === selectedId
            return (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-primary shadow-lg ring-2 ring-primary/20'
                    : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary">{r.duration}</div>
                  <div className="text-sm font-bold text-darkNavy mt-0.5">{r.name}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Roadmap Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-100">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                Estimated Duration: {activeRoadmap.duration}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-darkNavy">
                {activeRoadmap.name} Milestone Path
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
                {activeRoadmap.description}
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              <FiBookOpen size={16} />
              <span>Explore Matching Courses</span>
            </Link>
          </div>

          {/* Timeline Milestones */}
          <div className="mt-8 space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-5 before:w-0.5 before:bg-slate-100">
            {activeRoadmap.steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 pl-10 md:pl-12">
                {/* Step Marker */}
                <div className="absolute left-0 top-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs md:text-sm shadow-md ring-4 ring-white">
                  {idx + 1}
                </div>

                <div className="flex-1 bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-100">
                  <h3 className="text-base sm:text-lg font-bold text-darkNavy mb-3">
                    {step.phase}
                  </h3>

                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Core Topics To Master
                    </span>
                    <ul className="space-y-1.5">
                      {step.topics.map((t, ti) => (
                        <li key={ti} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <FiCheckCircle size={14} className="text-emerald-500 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <FiAward size={16} />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        Capstone Project To Build
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-darkNavy mt-0.5">
                        {step.project}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
