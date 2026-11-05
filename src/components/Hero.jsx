import { useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import { CakeSlice, Cherry, Cookie, Leaf, Milk } from "lucide-react";
import { CAKE_ITEMS } from "../../constants/cakesData";
import "../index.css";

const FLAVOR_DECORATIONS = {
    strawberry: { icon: Cherry, color: "#ffe0e9", swatch: "#ec7093" },
    chocolate: { icon: Cookie, color: "#f5d2b8", swatch: "#71442f" },
    vanilla: { icon: Milk, color: "#fff0c9", swatch: "#f1dfbd" },
    pistachio: { icon: Leaf, color: "#edf2b0", swatch: "#9aa85b" },
};

function FloatingFlavorIcon({ Icon, index, color, prefersReducedMotion }) {
    const isCake = index % 4 === 0;
    const direction = index % 2 === 0 ? -1 : 1;

    return (
        <motion.span
            className={`cake-hero__flavor-icon cake-hero__flavor-icon--${index + 1}${isCake ? " cake-hero__flavor-icon--cake" : ""}`}
            style={{ color }}
            animate={prefersReducedMotion
                ? { opacity: 0.65 }
                : {
                    y: [0, direction * (7 + (index % 3) * 2), 0],
                    rotate: [0, direction * 6, 0],
                    opacity: [0.45, 0.75, 0.45],
                }}
            transition={prefersReducedMotion
                ? undefined
                : {
                    duration: 4.2 + (index % 4) * 0.45,
                    delay: index * 0.14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
        >
            <Icon aria-hidden="true" />
        </motion.span>
    );
}

function FloatingFlavorOrbit({ flavorIcon, cakeId, color, prefersReducedMotion }) {
    return Array.from({ length: 12 }, (_, index) => (
        <FloatingFlavorIcon
            key={`${cakeId}-decoration-${index}`}
            Icon={index % 4 === 0 ? CakeSlice : flavorIcon}
            index={index}
            color={color}
            prefersReducedMotion={prefersReducedMotion}
        />
    ));
}

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const touchStartX = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 120 };
    const smoothPointerX = useSpring(pointerX, springConfig);
    const smoothPointerY = useSpring(pointerY, springConfig);
    const cakeRotateX = useTransform(smoothPointerY, [-0.5, 0.5], [3, -3]);
    const cakeRotateY = useTransform(smoothPointerX, [-0.5, 0.5], [-4, 4]);
    const cakeShiftX = useTransform(smoothPointerX, [-0.5, 0.5], [-8, 8]);
    const cake = CAKE_ITEMS[activeIndex] || CAKE_ITEMS[0];
    const flavorDecoration = FLAVOR_DECORATIONS[cake.id] || FLAVOR_DECORATIONS.strawberry;
    const FlavorIcon = flavorDecoration.icon;

    const selectCake = (index) => {
        if (index === activeIndex) return;
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const showNextCake = () => {
        setDirection(1);
        setActiveIndex((index) => (index + 1) % CAKE_ITEMS.length);
    };

    const showPreviousCake = () => {
        setDirection(-1);
        setActiveIndex((index) => (index - 1 + CAKE_ITEMS.length) % CAKE_ITEMS.length);
    };

    const handleMouseMove = (event) => {
        if (prefersReducedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    };

    const resetPointer = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            showNextCake();
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPreviousCake();
        }
    };

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;
        const endX = event.changedTouches[0]?.clientX;
        const distance = endX === undefined ? 0 : endX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(distance) < 50) return;
        if (distance < 0) showNextCake();
        else showPreviousCake();
    };

    return (
        <section
            id="home"
            className={`cake-hero cake-hero--${cake.id}`}
            style={{ ["--theme"]: cake.themeColor }}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetPointer}
            tabIndex={0}
        >
            {/* Background Image / Color */}
            <AnimatePresence>
                <motion.div
                    key={`bg-${cake.id}`}
                    className="cake-hero__background"
                    style={{
                        backgroundImage: `url("${cake.bgImage}"), ${cake.fallbackBg}`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </AnimatePresence>

            {/* Dripping Icing at Top */}
            {cake.dripImage && (
                <motion.img
                    key={cake.id}
                    src={cake.dripImage}
                    alt=""
                    className="cake-hero__drip"
                    initial={{ opacity: 0 }}
                    animate={prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 1, y: [0, 4, 0] }}
                    transition={prefersReducedMotion
                        ? { duration: 0.25 }
                        : {
                            opacity: { duration: 0.35 },
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                        }}
                />
            )}

            {/* Title (Centered at Top) */}
            <AnimatePresence>
                <motion.h1
                    key={`title-${cake.id}`}
                    className="cake-hero__title"
                    style={{ color: cake.titleColor ?? cake.textColor }}
                    initial={prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -18, filter: "blur(6px)" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    {cake.name}
                </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`flavor-decorations-${cake.id}`}
                    className="cake-hero__flavor-decorations"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <FloatingFlavorOrbit
                        flavorIcon={FlavorIcon}
                        cakeId={cake.id}
                        color={flavorDecoration.color}
                        prefersReducedMotion={prefersReducedMotion}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Cake slide */}
            <motion.div
                className="cake-hero__cake-wrap"
                style={{
                    rotateX: prefersReducedMotion ? 0 : cakeRotateX,
                    rotateY: prefersReducedMotion ? 0 : cakeRotateY,
                    x: prefersReducedMotion ? 0 : cakeShiftX,
                    perspective: 1000,
                }}
            >
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={`cake-${cake.id}`}
                        className="cake-hero__cake-animator"
                        custom={direction}
                        initial={prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, x: direction * 48, scale: 0.98 }}
                        animate={prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, x: 0, scale: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -48, scale: 0.99 }}
                        transition={{
                            duration: prefersReducedMotion ? 0.18 : 0.62,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <motion.img
                            src={cake.cakeImage}
                            alt={cake.name}
                            className="cake-hero__cake"
                            draggable="false"
                            animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
                            transition={prefersReducedMotion
                                ? undefined
                                : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                            onError={() => console.error(`Check file path for: ${cake.cakeImage}`)}
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Right Tagline & Button */}
            <motion.div
                className="cake-hero__copy"
                style={{ color: cake.copyColor ?? cake.textColor }}
                key={`copy-${cake.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <p>{cake.tagline}</p>
                <motion.button
                    className="cake-hero__button"
                    type="button"
                    style={{
                        color: cake.buttonTextColor ?? cake.copyColor ?? cake.textColor,
                        backgroundColor: cake.buttonBg,
                        borderColor: cake.buttonBorder,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                >
                    <span className="cake-hero__button-shimmer" aria-hidden="true" />
                    <span className="cake-hero__button-label">{cake.buttonText}</span>
                </motion.button>
            </motion.div>

            <nav className="cake-hero__color-picker" role="tablist" aria-label="Choose cake flavor">
                {CAKE_ITEMS.map((item, index) => (
                    <button
                        key={item.id}
                        className={`cake-hero__color-dot${index === activeIndex ? " cake-hero__color-dot--active" : ""}`}
                        type="button"
                        role="tab"
                        style={{ backgroundColor: FLAVOR_DECORATIONS[item.id]?.swatch ?? item.themeColor }}
                        onClick={() => selectCake(index)}
                        aria-label={`Show ${item.name}`}
                        aria-selected={index === activeIndex}
                        tabIndex={index === activeIndex ? 0 : -1}
                    >
                        <span className="cake-hero__color-dot-inner" />
                    </button>
                ))}
            </nav>
        </section>
    );
}
