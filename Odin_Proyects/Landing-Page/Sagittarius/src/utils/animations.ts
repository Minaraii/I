import type { Variants } from "framer-motion";

/** Fade up - used for most section reveals  */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },


};

/** Fade in - subtle reveal */
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}; 

/** Scale up - for cards, badges  */
export const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { 
        opacity: 1,
        scale: 1, 
        transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
};

/** Stagger container - wraps staggered children  */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

/** Stagger container with slower children  */
export const staggerContainerSlow: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

/** Slide from left  */
export const slideLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
};

/** Slide from right  */
export const slideRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
};
