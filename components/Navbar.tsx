'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Swords, TrendingUp, Star, Calendar, Grid, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Trending', href: '/#trending', icon: <TrendingUp className="w-5 h-5" /> },
    { name: 'Most Popular', href: '/#popular', icon: <Star className="w-5 h-5" /> },
    { name: 'Upcoming', href: '/#upcoming', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Categories', href: '/categories', icon: <Grid className="w-5 h-5" /> },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 relative z-[70]">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <Swords className="w-7 h-7 text-[#FF0080] relative z-10 fill-pink-500/20" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white italic uppercase">
              OTAKU<span className="text-[#FF0080]">MO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-xs font-bold uppercase tracking-[0.2em] transition-colors group ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-pink-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-[70] p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white transition-all active:scale-90"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Compact Side Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-[#030014] border-l border-white/10 shadow-2xl lg:hidden p-6 pt-24"
            >
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 px-4">Navigation</p>
                
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                        pathname === item.href 
                        ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className={pathname === item.href ? 'text-pink-500' : 'text-white/30'}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Decoration */}
              <div className="absolute bottom-10 left-6 right-6 p-6 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                  Join the community and track your favorite chronicles.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;