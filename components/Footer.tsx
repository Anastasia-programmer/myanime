import { Github, Twitter, MessageSquare } from "lucide-react"

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-[#020617]/80 backdrop-blur-xl border-t border-white/10 py-10 text-white">
      <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo & Slogan */}
        <div className="flex flex-col items-center md:items-start gap-1">
        <h1 className="text-2xl font-black tracking-tighter italic uppercase">
              NEON<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">.KAI</span>
            </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
            Discover your next story
          </p>
        </div>

        <div className="flex items-center gap-6 text-stone-300">
          <a href="#" className="hover:text-blue-400 transition-all transform hover:scale-110">
            <Twitter size={18} strokeWidth={2.5} />
          </a>
          <a href="#" className="hover:text-blue-400 transition-all transform hover:scale-110">
            <MessageSquare size={18} strokeWidth={2.5} /> {/* Discord/Chat icon */}
          </a>
          <a href="#" className="hover:text-blue-400 transition-all transform hover:scale-110">
            <Github size={18} strokeWidth={2.5} />
          </a>
        </div>

        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-stone-300">
          <a href="#" className="hover:text-white transition-colors">Browse</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>

      </div>
      
      <div className="mt-8 text-center text-[11px] text-stone-100 uppercase font-semibold tracking-[0.4em]">
        © 2025 NEON.KAI
      </div>
    </footer>
  )
}

export default Footer