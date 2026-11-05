import { useEffect, useRef, useState } from 'react';
import { reviewAssets, reviewHeading, reviews } from '../../constants/cakesData.js';

function Icon({ name, ...props }) {
    const paths = {
        chef: <><path d="M6 17V9C0 8 3 1 8 4c2-5 8-5 10 0 5-3 8 4 2 5v8Z" /><path d="M6 21h14M9 12v5m8-5v5" /></>,
        heart: <path d="M12 21 3 12C-2 4 7 0 12 6c5-6 14-2 9 6Z" />,
        cake: <><path d="M3 13h18v8H3Zm0 4c3 3 3-3 6 0s3-3 6 0 3-3 6 0M6 13V9m6 4V7m6 6V9M6 5v1m6-3v1m6 1v1" /></>,
        ring: <><circle cx="12" cy="15" r="7" /><path d="m8 4 4-3 4 3-4 4Z" /></>,
        cupcake: <><path d="m5 14 2 8h10l2-8ZM4 14h16C23 9 16 9 15 5c-1-3-4-3-5 1C7 7 2 9 4 14Zm6 3v3m4-3v3" /></>,
        left: <path d="m15 5-7 7 7 7" />,
        right: <path d="m9 5 7 7-7 7" />,
    };
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

// Self-contained control; no external UI-library dependency is required.
function ReviewButton({ className = '', children, ...props }) {
    return <button type="button" className={`sr-button ${className}`} {...props}>{children}</button>;
}

export default function Review() {
    const section = useRef(null);
    const track = useRef(null);
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window));
    const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(preference.matches);
        preference.addEventListener('change', update);
        return () => preference.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const node = section.current;
        if (!node) return;
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
        }, { threshold: 0.12 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const select = (index) => {
        const next = (index + reviews.length) % reviews.length;
        setActive(next);
        const row = track.current;
        const card = row?.children[next];
        if (row && card) row.scrollTo({ left: card.offsetLeft - row.offsetLeft, behavior: reduced ? 'instant' : 'smooth' });
    };

    return <section id="reviews" ref={section} className={`sweet-reviews ${visible ? 'is-visible' : ''}`} aria-label="Customer reviews" style={{ backgroundImage: `url("${reviewAssets.background}")` }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500;1,600&family=Great+Vibes&display=swap" />
        <div className="sr-content">
            <header className="sr-heading">
                <Icon name="chef" className="sr-chef" />
                <p className="sr-brand">{reviewHeading.brand}</p>
                <p className="sr-tagline"><span />{reviewHeading.tagline}<span /></p>
                <h2>{reviewHeading.title} <span>{reviewHeading.script}</span></h2>
                <p className="sr-subtitle">{reviewHeading.subtitle}</p>
                <div className="sr-divider"><span /><Icon name="heart" /><span /></div>
            </header>

            <div className="sr-carousel" role="region" aria-roledescription="carousel" aria-label="Sweet customer stories" onKeyDown={(event) => {
                if (event.key === 'ArrowRight') { event.preventDefault(); select(active + 1); }
                if (event.key === 'ArrowLeft') { event.preventDefault(); select(active - 1); }
            }}>
                <ReviewButton className="sr-arrow sr-prev" aria-label="Previous review" onClick={() => select(active - 1)}><Icon name="left" /></ReviewButton>
                <div className="sr-track" ref={track} tabIndex={0} aria-label="Review cards" onScroll={() => {
                    const row = track.current;
                    if (!row || row.scrollWidth <= row.clientWidth + 2) return;
                    const positions = [...row.children].map(card => Math.abs(card.offsetLeft - row.offsetLeft - row.scrollLeft));
                    setActive(positions.indexOf(Math.min(...positions)));
                }}>
                    {reviews.map((review, index) => <article key={review.id} className={`sr-card ${index === active ? 'is-current' : ''}`} aria-label={`${index + 1} of ${reviews.length}: ${review.order}`} style={{ transitionDelay: `${index * 130}ms` }}>
                        <img className="sr-artwork" src={review.image} alt={review.alt} width="400" height="560" loading="lazy" draggable="false" />
                        <div className="sr-card-copy">
                            <span className="sr-quote" aria-hidden="true">“</span>
                            <div className="sr-stars" aria-label={`${review.rating} out of 5 stars`}><span aria-hidden="true">{'★'.repeat(review.rating)}</span></div>
                            <blockquote>{review.text}</blockquote>
                            <span className="sr-order"><Icon name={review.icon} />{review.order}</span>
                        </div>
                    </article>)}
                </div>
                <ReviewButton className="sr-arrow sr-next" aria-label="Next review" onClick={() => select(active + 1)}><Icon name="right" /></ReviewButton>
            </div>
            <div className="sr-dots" role="group" aria-label="Choose a review">
                {reviews.map((review, index) => <ReviewButton key={review.id} className={`sr-dot ${index === active ? 'is-active' : ''}`} aria-label={`Show ${review.order}`} aria-pressed={index === active} onClick={() => select(index)}><span /></ReviewButton>)}
            </div>
        </div>
    </section>;
}