import { useState, useEffect, useRef, useCallback } from "react"; 

interface MousePosition {
    x:number;
    y: number;
}

/**
 * Returns current mouse position in both absolute and normalised (-0.5 to 0.5) forms. 
 */

export function useMousePosition() {
    const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [normalised, setNormalised] = useState<MousePosition>({ x: 0, y: 0 });
    const refId = useRef<number | null>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (refId.current !== null) cancelAnimationFrame(refId.current);
        refId.current = requestAnimationFrame(() => {
            setPosition({ x: e.clientX, y: e.clientY });
            setNormalised({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5,
            });
        });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (refId.current !== null) cancelAnimationFrame(refId.current);
        };
    }, [handleMouseMove]);

    return { position, normalised };
}