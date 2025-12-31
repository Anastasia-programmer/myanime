'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Trending', href: '/#trending' },
    { name: 'Most Popular', href: '/#popular' },
    { name: 'Upcoming', href: '/#upcoming' },
    { name: 'Categories', href: '/categories' },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#030014]/70 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-gradient-to-b from-black/60 to-transparent py-4'
          }`}
      >
        <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 relative z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <Zap className="w-8 h-8 text-[#FF0080] relative z-10 fill-pink-500/20" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white italic">
              OTAKU<span className="text-[#FF0080]">MO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = item.name === 'Home' && pathname === '/';

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-bold uppercase tracking-widest transition-colors group ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 p-2 text-white/80 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-40 bg-[#030014]/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-start pt-28 pb-10 gap-8 border-b border-white/10 shadow-2xl"
          >
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#FF0080] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;