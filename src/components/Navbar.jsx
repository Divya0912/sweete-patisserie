import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Home,
    CakeSlice,
    Layers,
    BookOpen,
    Star,
    Phone,
    Sparkles
} from "lucide-react";
import "../index.css";

// Your exact bakery navbar items and matching section IDs
const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "signature-cakes", label: "Signature Cakes", icon: CakeSlice },
    { id: "our-story", label: "About Us", icon: BookOpen },
    { id: "collection", label: "Collection", icon: Layers },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "contact", label: "Contact", icon: Phone },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isHovered, setIsHovered] = useState(false);

    // Track user scroll to highlight the active section automatically
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 220;

            for (const item of navItems) {
                const section = document.getElementById(item.id);
                if (section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(item.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Desktop Vertical Glass Dock (Left side) */}
            <motion.nav
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="cake-nav cake-nav--desktop"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Desktop Navigation"
            >
                <div className={`cake-nav__container ${isHovered ? "cake-nav__container--hovered" : ""}`}>
                    {/* Top Bakery Sparkle Logo */}
                    <button
                        type="button"
                        onClick={() => scrollToSection("home")}
                        className="cake-nav__logo-btn"
                        aria-label="Scroll to home"
                    >
                        <Sparkles className="cake-nav__sparkle" size={24} />
                    </button>

                    <div className="cake-nav__divider" />

                    {/* Navigation Buttons List */}
                    <div className="cake-nav__list">
                        {navItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <motion.button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    className={`cake-nav__item ${isActive ? "cake-nav__item--active" : ""}`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.35, delay: 0.1 + index * 0.04 }}
                                    whileHover={{ scale: 1.12 }}
                                    whileTap={{ scale: 0.94 }}
                                    aria-label={item.label}
                                >
                                    <IconComponent className="cake-nav__icon" size={20} />

                                    {/* Active Item Background Pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-indicator"
                                            className="cake-nav__active-indicator"
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 25,
                                            }}
                                        />
                                    )}

                                    {/* Hover Tooltip Label */}
                                    <span className="cake-nav__tooltip">
                                        {item.label}
                                        <span className="cake-nav__tooltip-arrow" />
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Bottom Dock */}
            <motion.nav
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="cake-nav cake-nav--mobile"
                aria-label="Mobile Navigation"
            >
                <div className="cake-nav__mobile-container">
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                className={`cake-nav__mobile-item ${isActive ? "cake-nav__mobile-item--active" : ""}`}
                                aria-label={item.label}
                            >
                                <IconComponent className="cake-nav__icon" size={19} />
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-indicator"
                                        className="cake-nav__mobile-active-indicator"
                                        transition={{
                                            type: "spring",
                                            stiffness: 320,
                                            damping: 28,
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </motion.nav>
        </>
    );
}
