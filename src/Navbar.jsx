import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall, Mail, MapPin, ArrowRight } from 'lucide-react';
import './navbar.css';

export function BlackSheepLogo({ height, size = 36 }) {
  const logoHeight = height || size;
  return (
    <div className="bs-brand-group">
      <img
        src="/logo.png"
        alt="Black Sheep Designs"
        className="bs-logo-img"
        style={{ height: `${logoHeight}px`, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  );
}

const NAV_ITEMS = [
  { id: 'philosophy', label: 'Philosophy', target: 'philosophy' },
  { id: 'worlds', label: 'Services', target: 'worlds' },
  { id: 'work', label: 'Selected Work', target: 'selected-work' },
  { id: 'contact', label: 'Contact', target: 'contact' },
];

export default function RedesignedNavbar({ onNavigate, onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on viewport center
      const sections = NAV_ITEMS.map(item => document.getElementById(item.target)).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (item) => {
    setMenuOpen(false);
    const elem = document.getElementById(item.target);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(item.label);
    }
  };

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="navbar-brand-link"
            aria-label="Black Sheep Designs - Home"
          >
            <BlackSheepLogo height={scrolled ? 68 : 90} />
          </a>

          {/* Right Action Controls */}
          <div className="navbar-actions">
            {/* Hamburger Menu Trigger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`navbar-menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <span className="menu-toggle-label">{menuOpen ? 'CLOSE' : 'MENU'}</span>
              <div className="menu-icon-circle">
                {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="navbar-full-overlay"
          >
            <div className="overlay-backdrop" onClick={() => setMenuOpen(false)} />

            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overlay-content-card"
            >
              {/* Overlay Top Bar */}
              <div className="overlay-header">
                <BlackSheepLogo height={52} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="overlay-close-btn"
                  aria-label="Close menu overlay"
                >
                  <span>CLOSE</span>
                  <div className="close-icon-ring">
                    <X size={18} strokeWidth={1.5} />
                  </div>
                </button>
              </div>

              {/* Main Overlay Body */}
              <div className="overlay-body">
                <nav className="overlay-nav-list">
                  <span className="overlay-eyebrow">NAVIGATION</span>
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.06, duration: 0.5 }}
                      onClick={() => handleNavClick(item)}
                      className="overlay-nav-item"
                    >
                      <span className="nav-item-num">0{idx + 1}</span>
                      <span className="nav-item-title">{item.label}</span>
                      <ArrowRight className="nav-item-arrow" size={24} strokeWidth={1} />
                    </motion.button>
                  ))}
                </nav>

                <div className="overlay-info-panel">
                  <div className="info-block">
                    <span className="overlay-eyebrow">ABOUT THE STUDIO</span>
                    <p className="info-desc">
                      Black Sheep Designs crafts immersive interior architectures, luxury hospitality, and bespoke retail environments worldwide.
                    </p>
                  </div>

                  <div className="info-block">
                    <span className="overlay-eyebrow">LOCATIONS</span>
                    <div className="info-locations">
                      <span>DUBAI — UAE</span>
                      <span>LONDON — UK</span>
                      <span>MILAN — ITALY</span>
                    </div>
                  </div>

                  <div className="info-block">
                    <span className="overlay-eyebrow">GET IN TOUCH</span>
                    <a href="mailto:studio@blacksheepdesigns.com" className="info-contact-link">
                      <Mail size={15} /> studio@blacksheepdesigns.com
                    </a>
                    <a href="tel:+97140000000" className="info-contact-link">
                      <PhoneCall size={15} /> +971 4 000 0000
                    </a>
                  </div>
                </div>
              </div>

              {/* Overlay Footer */}
              <div className="overlay-footer">
                <span>© {new Date().getFullYear()} BLACK SHEEP DESIGNS. ALL RIGHTS RESERVED.</span>
                <div className="overlay-socials">
                  <a href="#" target="_blank" rel="noreferrer">INSTAGRAM</a>
                  <a href="#" target="_blank" rel="noreferrer">LINKEDIN</a>
                  <a href="#" target="_blank" rel="noreferrer">PINTEREST</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
