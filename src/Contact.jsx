import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, X, Cookie } from 'lucide-react';
import './contact.css';

const ease = [0.16, 1, 0.3, 1];

function CookieIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size || 22}
      height={props.size || 22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" />
      <path d="M8.5 8.5v.01" strokeWidth={2.5} />
      <path d="M16 15.5v.01" strokeWidth={2.5} />
      <path d="M12 12v.01" strokeWidth={2.5} />
      <path d="M11 17v.01" strokeWidth={2.5} />
    </svg>
  );
}

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
  const [activeModal, setActiveModal] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [cookieSettings, setCookieSettings] = useState({ analytics: true, functional: true });
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
      {/* Subtle Grain Texture Overlay */}
      <div className="contact-grain" aria-hidden="true" />

      {/* Upper Let's Talk Section with Hero Background */}
      <div className="contact-hero-wrapper">
        <div className="contact-bg-image-wrap" aria-hidden="true">
          <motion.img
            src="/hero.png"
            alt=""
            className="contact-bg-image"
            style={{ y: reduced ? 0 : archY }}
          />
        </div>

        {/* Main Centered Call-To-Action Section */}
        <div className="contact-centered-hero">

        {/* Decorative Gold Crest Accent */}
        <div className="contact-crest-line" aria-hidden="true">
          <i className="crest-rule-left" />
          <span className="crest-diamond">◆</span>
          <i className="crest-rule-right" />
        </div>

        {/* Section Label */}
        <motion.div
          className="contact-section-label-centered"
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          07 / LET’S TALK
        </motion.div>

        {/* Main Centered Headline */}
        <h2 id="contact-headline-id" className="contact-headline-centered">
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
          <span className="contact-headline-line contact-headline-italic-secondary">
            <motion.span
              initial={{ y: reduced ? 0 : '110%' }}
              animate={visible ? { y: 0 } : {}}
              transition={{ duration: 1.15, delay: 0.46, ease }}
            >
              worth feeling.
            </motion.span>
          </span>
        </h2>

        {/* Supporting Copy */}
        <motion.p
          className="contact-support-copy-centered"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.58, ease }}
        >
          HAVE A SPACE, STORY OR IDEA IN MIND?
          <br />
          WE’D LOVE TO HEAR ABOUT IT.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          className="contact-cta-centered-group"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.68, ease }}
        >
          <a
            href="mailto:hello@blacksheep.ae"
            onClick={handleStartProject}
            className="contact-cta-circle-centered"
            aria-label="Start a project with Black Sheep Designs"
          >
            <div className="contact-cta-inner-ring">
              <span>START A</span>
              <span>PROJECT</span>
              <ArrowRight size={18} strokeWidth={1.2} className="cta-arrow-icon" />
            </div>
          </a>
        </motion.div>
      </div>
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
          <button onClick={() => setActiveModal('privacy')} className="contact-legal-btn">PRIVACY POLICY</button>
          <button onClick={() => setActiveModal('terms')} className="contact-legal-btn">TERMS &amp; CONDITIONS</button>
          <button onClick={() => setActiveModal('cookies')} className="contact-legal-btn">COOKIE PREFERENCES</button>
        </nav>
      </div>

      {/* Interactive Legal Modal Dialog */}
      {activeModal && (
        <div className="contact-modal-backdrop" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
          <div className="contact-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <span className="contact-modal-eyebrow">BLACK SHEEP DESIGNS FZ-LLC</span>
              <button className="contact-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">
                <X size={18} strokeWidth={1.2} />
              </button>
            </div>

            <div className="contact-modal-body">
              {activeModal === 'privacy' && (
                <>
                  <h2>PRIVACY POLICY</h2>
                  <p className="modal-lead">Your privacy is fundamental to our client relationship. This policy details how Black Sheep Designs collects, utilizes, and safeguards information across our digital platforms.</p>
                  
                  <div className="modal-section">
                    <h3>1. INFORMATION WE COLLECT</h3>
                    <p>We collect information provided directly by you when submitting project inquiries, subscribing to publications, or communicating with our studio—including your name, email address, telephone number, company, and project scope details.</p>
                  </div>
                  
                  <div className="modal-section">
                    <h3>2. USE OF INFORMATION</h3>
                    <p>Information gathered is utilized exclusively to respond to inquiries, deliver bespoke interior architecture consulting, coordinate project engagements, and provide relevant studio announcements.</p>
                  </div>
                  
                  <div className="modal-section">
                    <h3>3. DATA SECURITY &amp; CONFIDENTIALITY</h3>
                    <p>We implement rigorous organizational and technical measures to prevent unauthorized access, disclosure, or modification of client records and confidential project specifications.</p>
                  </div>

                  <div className="modal-section">
                    <h3>4. CONTACT &amp; ENQUIRIES</h3>
                    <p>For inquiries regarding data protection, please contact our studio privacy officer at <a href="mailto:privacy@blacksheep.ae" className="modal-link">privacy@blacksheep.ae</a> or Dubai, United Arab Emirates.</p>
                  </div>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <h2>TERMS &amp; CONDITIONS</h2>
                  <p className="modal-lead">Welcome to Black Sheep Designs. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of engagement.</p>
                  
                  <div className="modal-section">
                    <h3>1. INTELLECTUAL PROPERTY</h3>
                    <p>All concepts, 3D renders, architectural drawings, photography, graphic assets, and editorial copy displayed on this site are the exclusive intellectual property of Black Sheep Designs FZ-LLC. Reproduction or commercial use without prior written consent is strictly prohibited.</p>
                  </div>
                  
                  <div className="modal-section">
                    <h3>2. SCOPE OF SERVICES</h3>
                    <p>Digital representations and portfolio showcases on this site are provided for illustrative purposes. Formal design commissions, deliverables, timelines, and commercial terms are defined strictly in signed client agreements.</p>
                  </div>
                  
                  <div className="modal-section">
                    <h3>3. LIMITATION OF LIABILITY</h3>
                    <p>While we endeavor to keep all information current and accurate, Black Sheep Designs makes no warranties regarding uninterrupted website operation or third-party hyperlinked content.</p>
                  </div>

                  <div className="modal-section">
                    <h3>4. GOVERNING LAW</h3>
                    <p>These terms are governed by and construed in accordance with the laws of the United Arab Emirates as applicable in the Emirate of Dubai.</p>
                  </div>
                </>
              )}

              {activeModal === 'cookies' && (
                <>
                  <h2>COOKIE PREFERENCES</h2>
                  <p className="modal-lead">We use cookies to ensure seamless navigation, analyze site interaction, and enhance your digital experience across our platforms.</p>

                  <div className="cookie-toggle-row">
                    <div className="cookie-info">
                      <h3>ESSENTIAL COOKIES</h3>
                      <p>Required for fundamental site functionality, secure sessions, font rendering, and layout integrity. Cannot be disabled.</p>
                    </div>
                    <span className="cookie-badge-active">ALWAYS ACTIVE</span>
                  </div>

                  <div className="cookie-toggle-row">
                    <div className="cookie-info">
                      <h3>PERFORMANCE &amp; ANALYTICS</h3>
                      <p>Help us analyze visitor traffic and interactions across our portfolio sections to optimize load speed and responsiveness.</p>
                    </div>
                    <button
                      className={`cookie-switch ${cookieSettings.analytics ? 'is-on' : ''}`}
                      onClick={() => setCookieSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                    >
                      <span>{cookieSettings.analytics ? 'ENABLED' : 'DISABLED'}</span>
                    </button>
                  </div>

                  <div className="cookie-toggle-row">
                    <div className="cookie-info">
                      <h3>FUNCTIONAL &amp; PREFERENCES</h3>
                      <p>Remembers your navigation states, accessibility settings, and video playback options.</p>
                    </div>
                    <button
                      className={`cookie-switch ${cookieSettings.functional ? 'is-on' : ''}`}
                      onClick={() => setCookieSettings(prev => ({ ...prev, functional: !prev.functional }))}
                    >
                      <span>{cookieSettings.functional ? 'ENABLED' : 'DISABLED'}</span>
                    </button>
                  </div>

                  <div className="cookie-action-bar">
                    <button className="cookie-save-btn" onClick={() => setActiveModal(null)}>
                      SAVE PREFERENCES
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reference-Style Cookie Popup Banner */}
      {showCookieBanner && (
        <div className="bs-cookie-banner" role="dialog" aria-label="Cookie Preferences">
          <div className="bs-cookie-banner-header">
            <div className="bs-cookie-banner-title-group">
              <div className="bs-cookie-icon-box">
                <CookieIcon size={20} />
              </div>
              <div>
                <h3 className="bs-cookie-banner-title">Cookie Preferences</h3>
                <span className="bs-cookie-banner-subtitle">BLACK SHEEP DESIGNS</span>
              </div>
            </div>
            <button
              className="bs-cookie-close-btn"
              onClick={() => setShowCookieBanner(false)}
              aria-label="Close cookie banner"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          <p className="bs-cookie-banner-text">
            We use cookies and analytics tools to personalize content, monitor website traffic, and ensure seamless registration. Review our{' '}
            <button
              className="bs-cookie-link-btn"
              onClick={() => setActiveModal('privacy')}
            >
              Privacy Policy
            </button>{' '}
            for details.
          </p>

          <div className="bs-cookie-banner-actions">
            <button
              className="bs-cookie-btn-primary"
              onClick={() => setShowCookieBanner(false)}
            >
              ACCEPT ALL
            </button>
            <button
              className="bs-cookie-btn-secondary"
              onClick={() => setShowCookieBanner(false)}
            >
              NECESSARY ONLY
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
