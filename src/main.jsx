import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, MotionConfig } from 'framer-motion';
import { ArrowRight, ArrowDown, Menu, X, BedDouble, House, Building2, Armchair } from 'lucide-react';
import './styles.css';
import RedesignedNavbar from './Navbar';
import Philosophy from './Philosophy';
import Worlds from './Worlds';
import Language from './Language';
import Process from './Process';
import SelectedWork from './SelectedWork';
import Contact from './Contact';

const ease = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, delay, ease } });
const services = [
  { title: 'Retail &', lines: ['Window Displays'], icon: WindowIcon },
  { title: 'Hospitality', lines: ['4★ Hotels &', 'Holiday Homes'], icon: BedDouble },
  { title: 'Residential', lines: ['Villas &', 'Homes'], icon: House },
  { title: 'Commercial', lines: ['Spaces &', 'Offices'], icon: Building2 },
  { title: 'Event Styling &', lines: ['Experiences'], icon: Armchair },
];
function WindowIcon(props) { return <svg {...props} viewBox="0 0 40 40" fill="none" stroke="currentColor"><path d="M6 37V17a14 14 0 0 1 28 0v20H6Zm0-20h28M20 3v34M10 7l10 10L30 7M7 27h27"/><path d="M16 24v6m8-6v6"/></svg>; }

function Services({ onSelect }) {
  return <motion.nav {...reveal(.8)} className="services" id="services" aria-label="Design services">{services.map(({ title, lines, icon: Icon }, i) => <motion.button {...reveal(.9 + i * .1)} onClick={() => onSelect(`${title} ${lines.join(' ')}`)} className="service" key={title}>
    <span className="service-number">0{i + 1}</span><Icon className="service-icon" size={36} strokeWidth={.8}/><span className="service-title">{title}</span>{lines.map(line => <span className="service-line" key={line}>{line}</span>)}
  </motion.button>)}</motion.nav>;
}
function Overlay({ panel, close, onNavigate }) {
  const ref = useRef(null);
  useEffect(() => { if (panel) ref.current.showModal(); else ref.current.close(); }, [panel]);
  return <dialog ref={ref} className="editorial-dialog" onCancel={close} onClick={e => { if (e.target === ref.current) close(); }}>
    <div className="dialog-inner"><button className="dialog-close" aria-label="Close dialog" onClick={close}><X strokeWidth={1}/></button><p className="eyebrow">BLACK SHEEP DESIGNS</p>
    {panel === 'Menu' ? <nav aria-label="Expanded navigation">{['Work', 'About', 'Services', 'Journal', 'Contact'].map(item => <button key={item} onClick={() => onNavigate(item)}>{item}<ArrowRight strokeWidth={1}/></button>)}</nav> : <><h2>{panel === 'Story' ? 'Our story.' : panel}</h2><p>{panel === 'Story' ? 'The story film is coming soon.' : panel === 'About' ? 'We craft immersive environments that inspire, engage and leave a lasting impression.' : 'More to discover. Coming soon.'}</p></>}
    </div>
  </dialog>;
}
function Hero() {
  const [panel, setPanel] = useState(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 35, damping: 25 }), y = useSpring(my, { stiffness: 35, damping: 25 });
  const tx = useTransform(x, v => -v * .5), ty = useTransform(y, v => -v * .5);
  const discover = () => { setPanel(null); document.querySelector('#services').scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'nearest' }); document.querySelector('.service').focus({ preventScroll: true }); };
  const openPhilosophy = () => { setPanel(null); document.getElementById('philosophy').scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' }); };
  const openContact = () => { setPanel(null); const c = document.getElementById('contact'); if (c) c.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' }); else setPanel('Contact'); };
  const navigate = name => name === 'About' ? openPhilosophy() : name === 'Contact' ? openContact() : ['Work', 'Services'].includes(name) ? discover() : setPanel(name);
  return <main>
    <RedesignedNavbar onNavigate={navigate} onOpenMenu={() => setPanel('Menu')}/>
    <section className="hero relative isolate overflow-hidden flex flex-col items-center justify-center text-center" aria-label="Black Sheep Designs" onPointerMove={e => { if (reduce || e.pointerType !== 'mouse' || innerWidth < 768) return; mx.set((e.clientX / innerWidth - .5) * 6); my.set((e.clientY / innerHeight - .5) * 6); }} onPointerLeave={() => { mx.set(0); my.set(0); }}>
    <motion.div className="interior" style={{ x, y }}><motion.img initial={{ scale: reduce ? 1 : 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }} src="/hero.png" alt="Burgundy velvet sofa and dark marble table beneath an illuminated architectural arch, with a sculptural tree and bronze lighting" fetchPriority="high"/></motion.div>
    <div className="light-overlay"/><div className="grain" aria-hidden="true"/>
    <motion.div className="headline-wrap centered-hero-content" style={{ x: tx, y: ty }}>
      <h1>
        {['LUXURY ARCHITECTURE', '& INTERIOR DESIGN', 'STUDIO DUBAI.'].map((line, i) => (
          <span className={`headline-line ${i > 1 ? 'gold' : ''}`} key={line}>
            <motion.span initial={{ y: reduce ? 0 : '110%' }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: .25 + i * .11, ease }}>
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div {...reveal(.85)} className="mt-8 flex justify-center">
        <button className="hero-cta-btn" onClick={openContact}>
          <span>EXPLORE OUR WORK</span>
          <ArrowRight size={18} strokeWidth={1.2}/>
        </button>
      </motion.div>
    </motion.div>
  </section><Philosophy/><Worlds/><Process/><Language/><SelectedWork/><Contact onNavigate={navigate}/><Overlay panel={panel} close={() => setPanel(null)} onNavigate={navigate}/></main>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><MotionConfig reducedMotion="user"><Hero/></MotionConfig></React.StrictMode>);
