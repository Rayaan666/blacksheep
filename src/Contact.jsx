import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin } from 'lucide-react';
import './contact.css';

const ease = [0.16, 1, 0.3, 1];

function PinterestIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size || 15}
      height={props.size || 15}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.1-2.1.2-3l1.8-7.6s-.5-.9-.5-2.2c0-2.1 1.2-3.6 2.7-3.6 1.3 0 1.9 1 1.9 2.1 0 1.3-.8 3.2-1.3 5-.4 1.5.8 2.8 2.2 2.8 2.7 0 4.7-2.8 4.7-6.9 0-3.6-2.6-6.1-6.3-6.1-4.3 0-6.8 3.2-6.8 6.5 0 1.3.5 2.7 1.1 3.4.1.1.1.3.1.4l-.4 1.7c-.1.3-.2.4-.5.2-2-.9-3.2-3.8-3.2-6.1 0-5 3.6-9.6 10.5-9.6 5.5 0 9.8 3.9 9.8 9.2 0 5.5-3.5 9.9-8.3 9.9-1.6 0-3.2-.8-3.7-1.8l-1 3.9c-.4 1.4-1.3 3.1-2 4.1A10 10 0 1 0 12 2z" />
    </svg>
  );
}

export default function Contact({ onNavigate }) {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Subtle architectural and typography parallax for desktop
  const archY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const giantTextX = useTransform(scrollYProgress, [0.4, 1], [-18, 0]);
  const giantOpacity = useTransform(scrollYProgress, [0.3, 0.9], [0.12, 0.2]);

  const handleStartProject = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('Contact');
    } else {
      window.location.href = 'mailto:hello@blacksheep.ae?subject=Project%20Enquiry';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section relative isolate"
      aria-labelledby="contact-headline-id"
    >
      {/* Background Plate Artwork (Seamless clean render) */}
      <motion.img
        src="/images/contact-clean-plate.png"
        alt="Architectural luxury interior with stone arch and raw travertine console"
        className="contact-bg-plate"
        style={{ y: reduced ? 0 : archY }}
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease }}
      />
      <div className="contact-bg-overlay" aria-hidden="true" />

      {/* Subtle Grain Texture Overlay */}
      <div className="contact-grain" aria-hidden="true" />

      {/* 06. Section Label */}
      <motion.div
        className="contact-section-label"
        initial={{ opacity: 0, y: 10 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease }}
      >
        07 / LET’S TALK
      </motion.div>

      {/* 07. Main Headline */}
      <h2 id="contact-headline-id" className="contact-headline">
        <span className="contact-headline-line contact-headline-primary">
          <motion.span
            initial={{ y: reduced ? 0 : '110%' }}
            animate={visible ? { y: 0 } : {}}
            transition={{ duration: 1.15, delay: 0.22, ease }}
          >
            LET’S CREATE
          </motion.span>
        </span>
        <span className="contact-headline-line contact-headline-italic">
          <motion.span
            initial={{ y: reduced ? 0 : '110%' }}
            animate={visible ? { y: 0 } : {}}
            transition={{ duration: 1.15, delay: 0.34, ease }}
          >
            something
          </motion.span>
        </span>
        <span className="contact-headline-line contact-headline-italic">
          <motion.span
            initial={{ y: reduced ? 0 : '110%' }}
            animate={visible ? { y: 0 } : {}}
            transition={{ duration: 1.15, delay: 0.46, ease }}
          >
            worth feeling.
          </motion.span>
        </span>
      </h2>

      {/* 08. Supporting Copy */}
      <motion.p
        className="contact-support-copy"
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.58, ease }}
      >
        HAVE A SPACE, STORY OR IDEA IN MIND?
        <br />
        WE’D LOVE TO HEAR ABOUT IT.
      </motion.p>

      {/* 09 & 10. Primary CTA Circle + Micro Copy */}
      <motion.div
        className="contact-cta-group"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.68, ease }}
      >
        <a
          href="mailto:hello@blacksheep.ae"
          onClick={handleStartProject}
          className="contact-cta-circle"
          aria-label="Start a project with Black Sheep Designs"
        >
          <span>START A</span>
          <span>PROJECT</span>
        </a>

        <div className="contact-cta-arrow" aria-hidden="true">
          <ArrowRight size={22} strokeWidth={1} />
        </div>

        <div className="contact-cta-divider" aria-hidden="true" />

        <div className="contact-cta-micro" aria-hidden="true">
          <span>SPACES</span>
          <span>PEOPLE</span>
          <span>IDEAS</span>
          <span>EXPERIENCES</span>
          <span>TOGETHER.</span>
        </div>
      </motion.div>

      {/* 16. Right Architectural Wall Manifesto */}
      <div className="contact-wall-manifesto" aria-hidden="true">
        <span>GOOD</span>
        <span>DESIGN</span>
        <span>CREATES</span>
        <span>A BRIGHTER</span>
        <span>TOMORROW.</span>
        <i />
      </div>

      {/* Dedicated Mobile Architectural View */}
      <div className="contact-mobile-arch">
        <img
          src="/images/contact-arch.png"
          alt="Atmospheric architectural archway with stone console and botanical branch"
          loading="lazy"
        />
      </div>

      {/* 18. Contact Information & Quick Links Footer Grid */}
      <div className="contact-info-separator" aria-hidden="true" />

      <motion.div
        className="contact-info-bar"
        initial={{ opacity: 0, y: 15 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.8, ease }}
      >
        {/* Contact Info Column */}
        <div className="contact-footer-col">
          <span className="contact-col-heading">GET IN TOUCH</span>
          <div className="contact-info-block">
            <Mail className="contact-info-icon" size={18} strokeWidth={1.2} />
            <a href="mailto:hello@blacksheep.ae" className="contact-info-main">
              hello@blacksheep.ae
            </a>
          </div>
          <div className="contact-info-block">
            <Phone className="contact-info-icon" size={18} strokeWidth={1.2} />
            <a href="tel:+971509689671" className="contact-info-main">
              +971 50 968 9671
            </a>
          </div>
          <div className="contact-info-block">
            <MapPin className="contact-info-icon" size={18} strokeWidth={1.2} />
            <span className="contact-info-main">Dubai, United Arab Emirates</span>
          </div>
        </div>

        <div className="contact-v-divider" aria-hidden="true" />

        {/* Quick Navigation Links */}
        <div className="contact-footer-col">
          <span className="contact-col-heading">EXPLORE</span>
          <ul className="contact-footer-nav-list">
            <li><a href="#worlds" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('Worlds'); }}>WORLDS</a></li>
            <li><a href="#philosophy" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('Philosophy'); }}>PHILOSOPHY</a></li>
            <li><a href="#process" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('Process'); }}>PROCESS</a></li>
            <li><a href="#language" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('Language'); }}>LANGUAGE</a></li>
            <li><a href="#work" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('SelectedWork'); }}>PROJECTS</a></li>
          </ul>
        </div>

        <div className="contact-v-divider" aria-hidden="true" />

        {/* Social Media Column */}
        <div className="contact-social-block">
          <span className="contact-social-label">FOLLOW OUR JOURNEY</span>
          <div className="contact-social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              aria-label="Instagram"
            >
              <Instagram size={15} strokeWidth={1.2} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} strokeWidth={1.2} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn"
              aria-label="Pinterest"
            >
              <PinterestIcon size={15} />
            </a>
          </div>
          <span className="contact-social-tagline">ARCHITECTURE &amp; INTERIORS</span>
        </div>

        <div className="contact-v-divider" aria-hidden="true" />

        {/* Far Right Micro Manifesto */}
        <div className="contact-right-micro" aria-hidden="true">
          <span>INSPIRE</span>
          <span>DESIGN</span>
          <span>TRANSFORM</span>
        </div>
      </motion.div>

      {/* 24. Giant BLACK SHEEP Watermark */}
      <motion.div
        className="contact-giant-brand"
        style={{
          x: reduced ? 0 : giantTextX,
          opacity: reduced ? 0.17 : giantOpacity
        }}
        aria-hidden="true"
      >
        <span>BLACK</span>
        <span>SHEEP</span>
      </motion.div>

      {/* 25 & 26. Copyright & Legal Bar */}
      <div className="contact-legal-bar">
        <span className="contact-copyright">
          © {new Date().getFullYear()} BLACK SHEEP DESIGNS FZ-LLC. ALL RIGHTS RESERVED.
        </span>
        <nav className="contact-legal-links" aria-label="Legal navigation">
          <a href="#" className="contact-legal-link">PRIVACY POLICY</a>
          <a href="#" className="contact-legal-link">TERMS OF SERVICE</a>
          <a href="#" className="contact-legal-link">COOKIE PREFERENCES</a>
        </nav>
      </div>
    </section>
  );
}
