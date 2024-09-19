'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Home, Book, Users } from 'lucide-react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'

const NavItem = ({ icon, text, href, }: { icon: React.ReactNode; text: string, href: string}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.a
        href={href}
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          {icon}
        </motion.span>
        <span className="hidden md:inline">{text}</span>
      </motion.a>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const NavIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <motion.a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
)

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.8)"]
  )

  const navY = useTransform(
    scrollY,
    [0, 100],
    [0, -100]
  )

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsScrolled(latest > 20)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <motion.nav
      style={{ y: navY, backgroundColor: navBackground }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out"
    >
      <motion.div
        className="max-w-7xl mx-auto flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-6">
        <NavItem icon={<Home size={20} />} text="Home" href="/" />
          <NavItem icon={<Book size={20} />} text="Docs" href="/docs" />
          <NavItem icon={<Users size={20} />} text="Team" href="/team" />
        </div>
        <div className="flex space-x-4">
          <NavIcon icon={<FaDiscord size={20}/>} href='https://discord.com/invite/HSFBBccBzK'/>
          <NavIcon icon={<FaTwitter size={20}/>} href='https://twitter.com/ee3dev' />
        </div>
      </motion.div>
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  )
}