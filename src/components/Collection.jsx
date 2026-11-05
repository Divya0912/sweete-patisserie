import { useEffect, useRef, useState } from "react";
import { collectionAssets, collectionText, leftCollection, rightCollection } from "../../constants/cakesData.js";

function Card({ item, index, side, onPick }) {
    return (
        <button
            type="button"
            className={`col-card col-${side}`}
            style={{ "--i": index }}
            onClick={() => onPick?.(item)}
            aria-label={item.name.join(" ")}
        >
            <span className="col-glow" />
            <img className="col-img" src={item.image} alt={item.name.join(" ")} loading="lazy" />
            <span className="col-label">
        <span className="col-label-text">
          {item.name.map((line) => <span key={line}>{line}</span>)}
        </span>
        <span className="col-arrow">→</span>
      </span>
        </button>
    );
}

export default function Collection({ onPick, onExplore }) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // soft mouse parallax on the centre cake
    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        ref.current.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };

    return (
        <section
            ref={ref}
            id="collection"
            className={`collection ${show ? "is-visible" : ""}`}
            style={{ backgroundImage: `url("${collectionAssets.collectionBg}")` }}
            onMouseMove={onMove}
        >
            <div className="col-light" />
            <div className="col-petals" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, i) => <span key={i} style={{ "--p": i }} />)}
            </div>
            <span className="col-lamp lamp-left" aria-hidden="true" />
            <span className="col-lamp lamp-right" aria-hidden="true" />

            <div className="col-layout">
                <div className="col-grid">
                    {leftCollection.map((item, i) => <Card key={item.id} item={item} index={i} side="left" onPick={onPick} />)}
                </div>

                <div className="col-center">
                    <div className="col-heading">
                        <span className="col-chef">👨‍🍳</span>
                        <p className="col-brand">{collectionText.brand}</p>
                        <p className="col-tagline">{collectionText.tagline}</p>
                        <h2 className="col-title">
                            {collectionText.title.split("").map((ch, i) => (
                                <span key={i} style={{ "--c": i }}>{ch === " " ? "\u00A0" : ch}</span>
                            ))}
                            <svg className="col-heart" viewBox="0 0 60 50"><path d="M30 46 C5 28 2 12 14 6 C22 2 28 8 30 14 C32 8 38 2 46 6 C58 12 55 28 30 46Z" /></svg>
                        </h2>
                        <p className="col-sub">{collectionText.subtitle}</p>
                        <span className="col-divider">❦</span>
                    </div>

                    <div className="col-main">
                        <span className="col-main-glow" />
                        <span className="col-sparkles" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ "--s": i }} />)}
            </span>
                        <img src={collectionAssets.mainEntrance} alt="Signature strawberry drip cake under glass dome" />
                    </div>

                    <button type="button" className="col-explore" onClick={onExplore}>
                        {collectionText.button} <span>→</span>
                    </button>
                </div>

                <div className="col-grid">
                    {rightCollection.map((item, i) => <Card key={item.id} item={item} index={i} side="right" onPick={onPick} />)}
                </div>
            </div>
        </section>
    );
}