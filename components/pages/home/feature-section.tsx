'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, FolderTree, Terminal, FileCode } from 'lucide-react'

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-40 backdrop-blur-sm p-6 rounded-lg border border-gray-700 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-0"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="text-white" size={24} />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const features = [
  {
    icon: Zap,
    title: "Fast Express App Setup",
    description: "Instantly generate scalable Express.js projects with a single command."
  },
  {
    icon: FolderTree,
    title: "Boilpress Router",
    description: "Custom file-based routing in Express for faster, more intuitive navigation."
  },
  {
    icon: Terminal,
    title: "CLI-based Route Creation",
    description: "Easily create routes directly via the Boilpress CLI without touching code files."
  },
  {
    icon: FileCode,
    title: "Customizable Templates",
    description: "Choose from a range of templates to kickstart your Express app, or create your own."
  }
]

export default function FeatureSection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Fade Effect from Bottom to Top */}
      <div className="absolute inset-0 pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-40 before:bg-gradient-to-t before:from-black before:to-transparent"></div>

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Powerful Features
          </span>
          <br />
          <span className="text-white">for Express Developers</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
