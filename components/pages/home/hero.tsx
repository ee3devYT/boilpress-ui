'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronRight, Package, CopyIcon, CheckIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


const TerminalLine = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="font-mono text-sm text-gray-300 flex justify-between items-center"
  >
    {children}
    </motion.div>
)

const CopyButton = ({ copied, handleCopy }: { copied: boolean, handleCopy: (text: string) => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 p-0 ml-2 flex items-center justify-center"
        >
          {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleCopy('npx boilpress init')}>
          npm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCopy('yarn boilpress init')}>
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCopy('pnpm dlx boilpress init')}>
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCopy('bunx boilpress init')}>
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function HeroSection() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const rotateX = useTransform(mouseY, [0, 300], [5, -5])
  const rotateY = useTransform(mouseX, [0, 300], [-5, 5])

  return (
    <section className="overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex items-center relative">
      <motion.div
        className="absolute inset-0 opacity-30 z-0"
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
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Package className="text-green-400 mx-auto mb-4" size={48} />
          </motion.div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Boilpress
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-300">
            Supercharge your Express.js development. Create, configure, and deploy with unparalleled speed and efficiency.
          </p>
        </motion.div>

        {/* Buttons Section */}
        <motion.div 
  className="flex justify-center space-x-4 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      size="lg"
      className="bg-green-500 text-black hover:bg-green-400 transition-all duration-200"
    >
      Get Started
      <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  </motion.div>
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      size="lg"
      variant="outline"
      className="border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-200"
    >
      Documentation
    </Button>
  </motion.div>
</motion.div>

        {/* Terminal Section */}
        <div className="flex justify-center">
          <motion.div
            className="bg-gray-800 rounded-lg p-4 shadow-2xl perspective-1000 w-full max-w-md"
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400">Terminal</div>
            </div>
            <TerminalLine>
              <span>$ npx boilpress init</span>
              <CopyButton copied={copied} handleCopy={handleCopy} />
            </TerminalLine>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
