'use client';

import Image from 'next/image';
import { X, Info, Sparkles } from 'lucide-react';
import { useEffect, useMemo } from 'react';

export default function CharacterModal({ character, isOpen, onClose }: any) {
  
  const { stats, bio } = useMemo(() => {
    if (!character?.description) return { stats: [], bio: "" };

    const text = character.description;
    
    // EXPANDED KEYS: Added all traits found in Karma Akabane and other complex profiles
    const keys = [
      "Age", "Birthdate", "Birthday", "Height", "Weight", "Gender", 
      "Species", "Position", "Rank", "Occupation", "Status", 
      "Blood Type", "Abilities", "Favorite subject", "Least favorite subject", 
      "Favorite food", "Hobby", "Hobbies", "Class", "Seat Number", 
      "Affiliation", "Grade", "Weapon", "Likes", "Dislikes", "Race" 
    ];
    
    // Regex to split text by keys (case-insensitive)
    const regex = new RegExp(`(${keys.join(':|')}:)`, "gi");
    const segments = text.split(regex);
    
    const foundStats: { label: string; value: string }[] = [];
    const bioParts: string[] = [];

    // First segment is intro bio if it exists
    if (segments[0].trim()) bioParts.push(segments[0].trim());

    for (let i = 1; i < segments.length; i += 2) {
      const label = segments[i].replace(':', '').trim();
      const rawValue = segments[i + 1] || "";
      
      // Smart check: Does this "value" actually contain the start of the biography?
      // Matches a period followed by a space and a capital letter (standard sentence start)
      const bioBreakMatch = rawValue.match(/^([\s\S]+?\. )([A-Z][\s\S]*)/);
      
      if (bioBreakMatch) {
        foundStats.push({ 
          label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(), 
          value: bioBreakMatch[1].trim() 
        });
        bioParts.push(bioBreakMatch[2].trim());
      } else {
        foundStats.push({ 
          label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(), 
          value: rawValue.trim() 
        });
      }
    }

    return {
      stats: foundStats,
      bio: bioParts.join('\n\n').replace(/\[Written by Kitsu.*?\]/g, '').trim()
    };
  }, [character]);

  useEffect(() => {
    // Don't prevent scrolling - allow page to scroll
    // The modal will handle its own scrolling
  }, [isOpen]);

  if (!isOpen || !character) return null;

  return (
    <div className="fixed inset-0 z-[9999]" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Enhanced backdrop with full coverage and stronger blur - positioned absolutely to cover everything */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl" 
        onClick={onClose}
        style={{ 
          WebkitBackdropFilter: 'blur(40px)',
          backdropFilter: 'blur(40px)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      />
      
      {/* Additional overlay layers for extra fog effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/85 to-black/75 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      />
      <div 
        className="absolute inset-0 bg-black/50 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      />

      {/* Modal Container - Scrollable */}
      <div className="fixed inset-0 flex items-center justify-center p-4 md:p-10 overflow-y-auto pointer-events-none" style={{ zIndex: 10000 }}>
        {/* Enhanced Character Card */}
        <div className="relative w-full max-w-5xl max-h-[90vh] my-auto bg-gradient-to-br from-[#020617] via-[#0a1120] to-[#020617] rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 backdrop-blur-2xl pointer-events-auto">
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-50 blur-xl pointer-events-none" />
          
          {/* Left Side: Enhanced Character Image */}
          <div className="relative w-full md:w-96 h-72 md:h-auto bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden flex-shrink-0">
            <Image
              src={character.image || '/placeholder.jpg'}
              alt={character.name}
              fill
              className="object-cover"
              priority
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent md:bg-gradient-to-r md:from-[#020617] md:via-[#020617]/80 md:to-transparent" />
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            
            {/* Character name overlay on mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6 bg-blue-500" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-blue-400 font-black">Character Profile</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none">
                {character.name}
              </h2>
            </div>
          </div>

          {/* Right Side: Enhanced Information */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-[#020617]/95 to-[#0a1120]/95 backdrop-blur-sm min-w-0">
            {/* Header */}
            <div className="p-6 md:p-8 pb-0 flex justify-between items-start relative flex-shrink-0">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-black">Character Profile</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter italic uppercase leading-none mb-2 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
                  {character.name}
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="relative z-10 p-2.5 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white hover:scale-110 border border-white/10 hover:border-white/30 flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 pt-6 overflow-y-auto custom-scrollbar flex-1 min-h-0" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              {/* Enhanced Characteristics Grid */}
              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <div 
                      key={i} 
                      className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-4 rounded-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden h-24 flex flex-col"
                    >
                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/5 transition-all duration-300 rounded-xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                      <div className="w-1 h-1 rounded-full bg-blue-500" />
                        <p className="text-[9px] uppercase tracking-widest text-blue-400/80 font-bold mb-2 flex items-center gap-1.5 flex-shrink-0">
                         
                          {stat.label}
                        </p>
                        <p className="text-sm text-white font-semibold leading-tight line-clamp-3 flex-1 overflow-hidden">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Enhanced Biography Section */}
              <div className="space-y-4 relative">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-4">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Info size={14} className="text-blue-400" />
                  </div>
                  <h3 className="text-xs uppercase tracking-widest font-black text-white/60">Biography / History</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent rounded-full" />
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap pl-4">
                    {bio || "No detailed biography available for this character in the current database."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
