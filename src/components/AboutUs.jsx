import { useEffect, useRef, useState } from "react";
import { aboutAssets, aboutText, features, frames } from "../../constants/cakesData.js";
import "../index.css";

const icons = {
    leaf: (<svg viewBox="0 0 24 24"><path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14Z"/><path d="M5 19 14 10"/></svg>),
    whisk: (<svg viewBox="0 0 24 24"><path d="M4 20l7-7"/><path d="M11 13c-2-4 1-9 5-9s5 4 3 6-6 5-8 3Z"/></svg>),
    cake: (<svg viewBox="0 0 24 24"><path d="M4 20h16v-7H4z"/><path d="M6 13v-3h12v3"/><path d="M12 10V6"/><path d="M12 3v1"/></svg>),
    heart: (<svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11Z"/></svg>),
};

export default function AboutUs() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    const sectionRef = useRef(null);
    const [show, setShow] = useState(false);

    // start animations when the section scrolls into view
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.05 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // 3D tilt on frames
    const tilt = (e) => {
        const c = e.currentTarget, r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.setProperty("--rx", `${-y * 14}deg`);
        c.style.setProperty("--ry", `${x * 14}deg`);
    };
    const resetTilt = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };

    const toggleVideo = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
    };

    return (
        <section id="our-story" ref={sectionRef} className={`about ${show ? "is-visible" : ""}`} style={{ backgroundImage: `url("${aboutAssets.bgAbout}")` }}>
            {/* falling petals */}
            <div className="petals" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} style={{ left: `${(i * 7.3) % 100}%`, animationDelay: `${i * 0.9}s`, animationDuration: `${9 + (i % 5)}s` }} />
                ))}
            </div>

            {/* golden sparkles */}
            <div className="sparkles" aria-hidden="true">
                {Array.from({ length: 18 }).map((_, i) => (
                    <i key={i} style={{ left: `${(i * 13.7) % 100}%`, top: `${(i * 23.3) % 90}%`, animationDelay: `${(i % 6) * 0.5}s` }} />
                ))}
            </div>

            <div className="about-top">
                {/* video in frame */}
                <div className="video-box reveal from-left" onClick={toggleVideo}>
                    <video ref={videoRef} src={aboutAssets.cakeVideo} autoPlay muted loop playsInline />
                    <img className="video-frame" src={aboutAssets.videoFrame} alt="" />
                    {!playing && <span className="play-btn">▶</span>}
                </div>

                {/* story text */}
                <div className="story">
                    <h2 className="story-title">
                        <span className="our reveal from-up" style={{ transitionDelay: ".2s" }}>{aboutText.titleOur}</span>
                        <span className="script reveal from-up" style={{ transitionDelay: ".5s" }}>{aboutText.titleStory}</span>
                    </h2>
                    <h3 className="story-sub reveal from-up" style={{ transitionDelay: ".8s" }}>{aboutText.subtitle[0]}<br />{aboutText.subtitle[1]}</h3>
                    <p className="story-body reveal from-up" style={{ transitionDelay: "1s" }}>{aboutText.body}</p>
                    <button className="journey-btn reveal pop" style={{ transitionDelay: "1.2s" }} onClick={toggleVideo}>
                        {aboutText.button} <span className="arrow">⟶</span>
                    </button>
                </div>

                {/* features */}
                <ul className="features">
                    {features.map((f, i) => (
                        <li key={f.title} className="reveal from-right" style={{ transitionDelay: `${0.6 + i * 0.2}s` }}>
                            <span className="feature-icon">{icons[f.icon]}</span>
                            <div>
                                <h4>{f.title}</h4>
                                <p>{f.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* bottom frames */}
            <div className="frames">
                {frames.map((f, i) => (
                    <div className="frame-card reveal rise" key={f.id} style={{ transitionDelay: `${1.2 + i * 0.15}s`, animationDelay: `${2 + i * 0.4}s` }} onMouseMove={tilt} onMouseLeave={resetTilt}>
                        <img className="frame-photo" src={f.image} alt={f.label.join(" ")} />
                        <img className="frame-border" src={f.frame} alt="" />
                        <span className="frame-label">{f.label[0]}<small>{f.label[1]}</small></span>
                    </div>
                ))}
            </div>
        </section>
    );
}