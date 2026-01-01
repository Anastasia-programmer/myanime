import { Linkedin,Swords } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="relative z-10 w-full text-center bg-[#030014]/90 backdrop-blur-md border-t border-white/5 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <Swords className="w-8 h-8 text-[#FF0080] relative z-10 fill-pink-500/20" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white italic">
              OTAKU<span className="text-[#FF0080]">MO</span>
            </span>
          </Link>

          {/* Minimal Socials */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/amedjkouh-darine-805188374/"
              className="text-white/60 hover:text-[#FF0080] transition-all transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              © 2025 OTAKUMO — DESIGNED FOR ANIME FANS
            </p>
            <div className="h-px w-12 bg-linear-to-r from-transparent via-pink-500/50 to-transparent" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer