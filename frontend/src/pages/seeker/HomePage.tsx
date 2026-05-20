import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import api, { ApiResponse } from '@/services/api'
import { JobCard, Job } from '@/components/jobs/JobCard'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Sparkles, Trophy, BookOpen } from 'lucide-react'

export default function HomePage() {
  const { data: jobs } = useQuery({
    queryKey: ['jobs', 'featured'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: Job[] }>>('/jobs?size=3')
      return res.data.data.content
    },
  })

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
              Build your career at <span className="text-cyan-300">Nina Organization</span>
            </h1>
            <p className="mt-6 text-lg text-indigo-100 max-w-xl">
              Jobs, internships, hackathons, and learning — one platform for your entire hiring journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/jobs"><Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">Browse Jobs <ArrowRight className="h-5 w-5" /></Button></Link>
              <Link to="/register"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Get Started</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: Sparkles, title: 'AI Job Match', desc: 'Smart recommendations based on your profile', to: '/jobs' },
          { icon: BookOpen, title: 'Prepare', desc: 'DSA, full stack roadmaps & mock interviews', to: '/prepare' },
          { icon: Trophy, title: 'Participate', desc: 'Hackathons, contests & workshops', to: '/participate' },
        ].map((f) => (
          <Link key={f.to} to={f.to} className="p-6 rounded-xl border dark:border-slate-700 hover:border-indigo-500 transition-colors">
            <f.icon className="h-10 w-10 text-indigo-600 mb-4" />
            <h3 className="font-semibold text-lg dark:text-white">{f.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{f.desc}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Recommended Jobs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {jobs?.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
        <Link to="/jobs" className="inline-block mt-6 text-indigo-600 font-medium">View all jobs →</Link>
      </section>
    </div>
  )
}
