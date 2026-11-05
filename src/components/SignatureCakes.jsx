import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    SIGNATURE_CENTER_IMAGE,
    SIGNATURE_BACKGROUND_IMAGE,
    SIGNATURE_CAKES_LEFT,
    SIGNATURE_CAKES_RIGHT
} from "../../constants/cakesData";
import "../index.css";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureCakes() {
    const sectionRef = useRef(null);
    const centerImgRef = useRef(null);
    const centerParallaxRef = useRef(null);

    useEffect(() => {
        const media = gsap.matchMedia();
        const ctx = gsap.context(() => {
            media.add("(prefers-reduced-motion: no-preference)", () => {
                const header = sectionRef.current.querySelector(".sig-cakes__header");
                const scriptCakes = sectionRef.current.querySelector(".sig-cakes__title-cakes");
                const leftCards = sectionRef.current.querySelectorAll(".sig-card--left");
                const rightCards = sectionRef.current.querySelectorAll(".sig-card--right");
                const centerWrap = sectionRef.current.querySelector(".sig-cakes__center-wrap");
                const grid = sectionRef.current.querySelector(".sig-cakes__grid");

                const headerTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 78%",
                        once: true,
                    },
                });
                headerTimeline
                    .from(header, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
                    .from(scriptCakes, {
                        scale: 0.8,
                        opacity: 0,
                        rotation: -6,
                        duration: 0.7,
                        ease: "back.out(1.6)",
                    }, "-=0.4");

                gsap.from(leftCards, {
                    x: -58,
                    rotationZ: -2,
                    opacity: 0,
                    duration: 0.85,
                    stagger: 0.14,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 78%",
                        once: true,
                    },
                });

                gsap.from(rightCards, {
                    x: 58,
                    rotationZ: 2,
                    opacity: 0,
                    duration: 0.85,
                    stagger: 0.14,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 78%",
                        once: true,
                    },
                });

                gsap.from(centerImgRef.current, {
                    scale: 0.86,
                    y: 34,
                    opacity: 0,
                    duration: 0.9,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 78%",
                        once: true,
                    },
                });

                gsap.fromTo(
                    centerParallaxRef.current,
                    { yPercent: -12 },
                    {
                        yPercent: 12,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
                        },
                    }
                );

                gsap.to(centerWrap, {
                    y: -12,
                    duration: 3.4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });

            media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    sectionRef.current,
                    { backgroundSize: "108% 108%" },
                    {
                        backgroundSize: "100% 100%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "top 20%",
                            scrub: 1.2,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => {
            ctx.revert();
            media.revert();
        };
    }, []);

    return (
        <section
            id="signature-cakes"
            ref={sectionRef}
            className="sig-cakes"
            style={{ backgroundImage: `url("${SIGNATURE_BACKGROUND_IMAGE}")` }}
        >
            {/* Top-Left Header: OUR Signatures Cakes */}
            <div className="sig-cakes__header">
                <h2 className="sig-cakes__title">
                    <span className="sig-cakes__title-our">OUR</span>
                    <span className="sig-cakes__title-signatures">
                        Signatures <span className="sig-cakes__title-cakes">Cakes</span>
                    </span>
                </h2>
            </div>

            {/* 3-Column Layout: Left Cards | Center Exploding Cake | Right Cards */}
            <div className="sig-cakes__grid">
                {/* Left Column */}
                <div className="sig-cakes__col sig-cakes__col--left">
                    {SIGNATURE_CAKES_LEFT.map((cake) => (
                        <div key={cake.id} className="sig-card sig-card--left">
                            <div className="sig-card__img-wrap">
                                <img
                                    src={cake.image}
                                    alt={cake.title}
                                    className="sig-card__img"
                                />
                            </div>
                            <div className="sig-card__body">
                                <h3 className="sig-card__title" style={{ color: cake.titleColor }}>
                                    {cake.title}
                                </h3>
                                <p className="sig-card__desc">{cake.desc}</p>
                                <button
                                    type="button"
                                    className="sig-card__btn"
                                    style={{ backgroundColor: cake.btnBg }}
                                >
                                    <span>VIEW CAKE</span>
                                    <span className="sig-card__arrow">⟶</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Center Exploding Cake Slice */}
                <div className="sig-cakes__col sig-cakes__col--center">
                    <div className="sig-cakes__center-wrap">
                        <div ref={centerParallaxRef} className="sig-cakes__center-parallax">
                            <img
                                ref={centerImgRef}
                                src={SIGNATURE_CENTER_IMAGE}
                                alt="Signature Layered Cake Slices"
                                className="sig-cakes__center-img"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="sig-cakes__col sig-cakes__col--right">
                    {SIGNATURE_CAKES_RIGHT.map((cake) => (
                        <div key={cake.id} className="sig-card sig-card--right">
                            <div className="sig-card__body sig-card__body--right">
                                <h3 className="sig-card__title" style={{ color: cake.titleColor }}>
                                    {cake.title}
                                </h3>
                                <p className="sig-card__desc">{cake.desc}</p>
                                <button
                                    type="button"
                                    className="sig-card__btn"
                                    style={{ backgroundColor: cake.btnBg }}
                                >
                                    <span>VIEW CAKE</span>
                                    <span className="sig-card__arrow">⟶</span>
                                </button>
                            </div>
                            <div className="sig-card__img-wrap">
                                <img
                                    src={cake.image}
                                    alt={cake.title}
                                    className="sig-card__img"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
