import React, { useRef, useCallback } from "react";
import { useSpring } from 'framer-motion';

const STRENGTH = 0.35;

/**
 *  Magentic button hook - returns event handlers and motion values for x/y offset. 
 */
export function useMagnet() {
    const ref = useRef<HTMLElement>(null);

    const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
    const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            x.set((e.clientX - cx) * STRENGTH);
            y.set((e.clientY - cy) * STRENGTH);
        },
        [x, y]
    );
    
    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return { ref, x, y, handleMouseMove, handleMouseLeave };
}
