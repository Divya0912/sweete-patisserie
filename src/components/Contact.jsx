import { useEffect, useRef, useState } from 'react';
import { contactAssets, contactCopy, contactDetails, orderTypes, socialLinks } from '../../constants/cakesData.js';
import '../index.css';

function Icon({ name, ...props }) {
    const paths = {
        cupcake: <><path d="m5 14 2 8h10l2-8ZM4 14h16C23 9 16 9 15 5c-1-3-4-3-5 1C7 7 2 9 4 14Z"/><path d="M10 17v3m4-3v3"/></>,
        pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
        phone: <path d="m5 3 4 4-2 3c2 4 3 5 7 7l3-2 4 4c-2 5-8 3-13-2S1 5 5 3Z"/>,
        mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 5 9 8 9-8"/></>,
        clock: <><circle cx="12" cy="12" r="10"/><path d="M12 5v7h6"/></>,
        person: <><circle cx="12" cy="7" r="4"/><path d="M3 22v-3a9 9 0 0 1 18 0v3Z"/></>,
        message: <><path d="M21 11c0 5-4 8-9 8l-6 3v-5c-3-2-4-4-3-7C4 1 21 1 21 11Z"/><path d="M7 11h.1m5 0h.1m5 0h.1"/></>,
        send: <><path d="m2 11 20-9-6 20-5-7Z"/><path d="m11 15 11-13"/></>,
        heart: <path d="M12 21 3 12C-2 4 7 0 12 6c5-6 14-2 9 6Z"/>,
        instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.1"/></>,
        facebook: <path d="M14 22V12h4l1-4h-5V6c0-2 1-3 4-3V0c-6-1-8 2-8 6v2H6v4h4v10"/>,
        music: <><path d="M14 3v13a4 4 0 1 1-4-4M14 3c1 4 3 6 7 6"/></>,
        youtube: <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3Z"/></>,
    };
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
function ContactButton({ children, ...props }) { return <button {...props}>{children}</button>; }
function Detail({ icon, title, children }) {
    return <div className="sc-detail"><span className="sc-detail-icon"><Icon name={icon}/></span><div className="sc-detail-copy"><h3>{title}</h3>{children}</div></div>;
}
export default function Contact() {
    const section = useRef(null);
    const [ready, setReady] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState('');
    useEffect(() => {
        const node = section.current;
        if (!node || !('IntersectionObserver' in window)) { setVisible(true); return; }
        setReady(true);
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
        }, { threshold: .08 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    const submit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const fields = new FormData(form);
        const read = key => String(fields.get(key) || '').trim();
        if (!read('name') || !read('message')) { setStatus('Please enter your name and message.'); return; }
        const body = `Name: ${read('name')}\nEmail: ${read('email')}\nPhone: ${read('phone')}\nOrder: ${read('order') || 'General Enquiry'}\n\n${read('message')}`;
        const subject = `Enquiry: ${read('order') || 'General Enquiry'}`;
        window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus('Your email app will open with this enquiry. Please press Send there.');
    };
    const profiles = socialLinks.filter(link => /^https:\/\//.test(link.url));
    const phone = contactDetails.phone.replace(/[^\d+]/g, '');
    return <section ref={section} id="contact" className={`sweet-contact${ready ? ' sc-ready' : ''}${visible ? ' sc-visible' : ''}`} aria-labelledby="sc-title">
        <img className="sc-backdrop" src={contactAssets.background} alt=""/>
        <header className="sc-header"><Icon name="cupcake" className="sc-cupcake"/><h2 id="sc-title">{contactCopy.title}</h2><div className="sc-heading-line"><span/><Icon name="heart"/><span/></div><p>{contactCopy.subtitle}</p></header>
        <div className="sc-layout">
            <aside className="sc-details" aria-label="Patisserie contact details">
                <Detail icon="pin" title="Visit Our Patisserie"><p>{contactDetails.location}</p></Detail>
                <Detail icon="phone" title="WhatsApp / Call"><a href={`tel:${phone}`}>{contactDetails.phone}</a></Detail>
                <Detail icon="mail" title="Email Us"><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></Detail>
                <Detail icon="clock" title="Opening Hours"><p>{contactDetails.hours}</p></Detail>
                {profiles.length > 0 && <div className="sc-social"><h3>{contactCopy.socialTitle}</h3><div className="sc-social-links">{profiles.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} title={link.name}><Icon name={link.icon}/></a>)}</div></div>}
            </aside>
            <form className="sc-panel" onSubmit={submit} aria-labelledby="sc-form-title">
                <h3 id="sc-form-title">{contactCopy.formTitle}</h3>
                <div className="sc-fields">
                    <label className="sc-field"><Icon name="person"/><span className="sc-visually-hidden">Full Name (required)</span><input name="name" autoComplete="name" placeholder="Full Name *" required maxLength={100}/></label>
                    <label className="sc-field"><Icon name="mail"/><span className="sc-visually-hidden">Email Address (required)</span><input type="email" name="email" autoComplete="email" placeholder="Email Address *" required maxLength={254}/></label>
                    <label className="sc-field"><Icon name="phone"/><span className="sc-visually-hidden">Phone Number (required)</span><input type="tel" name="phone" autoComplete="tel" placeholder="Phone Number *" required maxLength={40}/></label>
                    <label className="sc-field"><Icon name="cupcake"/><span className="sc-visually-hidden">Order Type</span><select name="order" defaultValue=""><option value="" disabled>Order Type</option>{orderTypes.map(type => <option key={type}>{type}</option>)}</select></label>
                    <label className="sc-field sc-message"><Icon name="message"/><span className="sc-visually-hidden">Your Message / Special Request (required)</span><textarea name="message" placeholder="Your Message / Special Request *" required maxLength={1500}/></label>
                </div>
                <ContactButton type="submit" className="sc-submit"><Icon name="send"/>Send Enquiry</ContactButton>
                {status && <p className="sc-status" role="status">{status}</p>}
            </form>
        </div>
    </section>;
}