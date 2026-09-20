export function AuroraBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
            {/* Orb 1 - Violet */}
            <div className="absolute top-[-20%] left-[10%] w-175 h-175 rounded-full opacity-30" style={{
                background: 'radial-gradient(circle, rgba(124, 107, 255,0.8) 0%, rgba(124, 107,255,0.2) 50%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'aurora-1 14s ease-in-out infinite',
                willChange: 'transform',
            }} />

            {/* Orb 2 - indigo */}
            <div className="absolute top-[10%] right-[-5%] w-150 h-150 rounded-full opacity-25" style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0.2) 50%, transparent 70%',
                filter: 'blur(100px)',
                animation: 'aurora-2 18s ease-in-out infinite',
                willChange: 'transform',
            }} />

            {/* Orb 3 - purple */}
            <div className="absolute bottom-[-10%] left-[30%] w-200 h-200 rounded-full opacity-20" style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0.2) 50%, transparent 70%',
                filter: 'blur(120px)',
                animation: 'aurora-3 22s ease-in-out infinite',
                willChange: 'transform',
            }}  />

            {/* Orb 4 - accent */ }

        </div>
    )
}