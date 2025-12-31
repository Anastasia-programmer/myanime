import { Cloud } from "lucide-react"

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/20 via-black/5 to-transparent">
      <nav className="flex h-24 items-center justify-between px-8 md:px-16 pointer-events-none">
        
        <div className="flex items-center gap-4 pointer-events-auto">
            <Cloud className="w-10 h-10 text-white" />
           
          
          
          <h1 className="text-2xl font-bold text-white tracking-tighter uppercase italic drop-shadow-md">
           <span className="text-blue-100"> OtaKumo</span>
          </h1>
        </div>

        <div className="flex items-center gap-12 pointer-events-auto  lg:flex">
          {["Most Popular", "Highest Rated"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-blue-300 transition-all drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Navbar