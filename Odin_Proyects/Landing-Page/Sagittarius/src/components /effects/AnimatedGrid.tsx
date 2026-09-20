export function AnimatedGrid() {
    return (
        <div style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)' }} aria-hidden="true" className="absolute inset-0 
        pointer-events-none" />
    );    
}