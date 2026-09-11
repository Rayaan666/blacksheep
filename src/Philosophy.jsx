import React, { useRef, useContext, createContext } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './philosophy.css';

const ease = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: .15 };
const RevealContext = createContext(false);
const principles = [
  { number: '01', title: ['THOUGHTFUL', 'DESIGN'], copy: 'Spaces crafted with purpose, people and context in mind.' },
  { number: '02', title: ['AUTHENTIC', 'MATERIALITY'], copy: 'Natural textures, honest materials and timeless finishes.' },
  { number: '03', title: ['ATMOSPHERIC', 'EXPERIENCES'], copy: 'Environments that engage the senses and create connection.' },
  { number: '04', title: ['TIMELESS', 'VALUE'], copy: 'Designs that feel relevant today, tomorrow and always.' },
];

// Each viewBox isolates an original photographic fragment from the clean asset plate.
function Fragment({ crop, className = '', label, decorative = false }) {
  const bottom = decorative && crop.startsWith('0 690');
  const top = decorative && !bottom;
  const clipId = bottom ? 'ph-bottom-contour' : 'ph-top-contour';
  return <svg className={className} viewBox={crop} preserveAspectRatio={decorative ? 'none' : 'xMidYMid slice'} role={decorative ? undefined : 'img'} aria-label={label} aria-hidden={decorative || undefined}>
    {decorative && <defs><clipPath id={clipId}><path d={bottom ? 'M0 695 C90 750 110 744 220 762 C400 800 470 911 680 1024 H0Z' : 'M1180 0H1536V380 C1490 355 1460 350 1410 320 L1450 263H1320 C1240 175 1200 110 1180 0Z'}/></clipPath></defs>}
    <image href="/images/philosophy-plate.png" width="1536" height="1024" clipPath={decorative ? `url(#${clipId})` : undefined}/>
  </svg>;
}
function Photograph({ name, crop, label, y, direction = 'bottom', delay = 0 }) {
  const reduced = useReducedMotion();
  const visible = useContext(RevealContext);
  return <motion.figure className={`ph-photo ph-photo-${name}`} style={{ y: reduced ? 0 : y }} initial={{ opacity: 0, clipPath: reduced ? 'inset(0%)' : direction === 'top' ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)' }} animate={visible ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' } : {}} transition={{ duration: 1.3, delay, ease }}>
    <motion.div initial={{ scale: reduced ? 1 : 1.06 }} whileInView={{ scale: 1 }} viewport={viewport} transition={{ duration: 1.4, ease }}><Fragment className={name === 'main' ? 'ph-main-desktop' : ''} crop={crop} label={label}/>{name === 'main' && <Fragment className="ph-main-mobile" crop="646 0 260 557" label={label}/>}</motion.div>
  </motion.figure>;
}
function Principle({ item, index }) {
  return <motion.article id={`principle-${item.number}`} tabIndex={-1} className={`ph-principle ph-principle-${item.number}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 1, delay: index * .1, ease }}>
    <span className="ph-number" aria-hidden="true">{item.number}</span><div className="ph-principle-content"><span className="ph-rule"/><h3>{item.title.map(line => <span key={line}>{line}</span>)}</h3><p>{item.copy}</p></div>
  </motion.article>;
}
export default function Philosophy() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: .08 });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mainY = useTransform(scrollYProgress, [0, 1], [12, -13]);
  const secondY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const detailY = useTransform(scrollYProgress, [0, 1], [15, -20]);
  const fabricY = useTransform(scrollYProgress, [0, 1], [-3, 4]);
  const fabricX = useTransform(scrollYProgress, [0, 1], [-4, 5]);
  const approach = () => { const target = document.getElementById('principle-01'); target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' }); target.focus({ preventScroll: true }); };
  return <RevealContext.Provider value={visible}><section ref={ref} id="philosophy" className="philosophy" aria-labelledby="philosophy-title">
    <motion.div className="ph-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ duration: 1 }}><span>02 / PHILOSOPHY</span><i/></motion.div>
    <h2 id="philosophy-title" className="ph-headline">{['CRAFTING', 'spaces that', 'MAKE YOU FEEL', 'SOMETHING.'].map((line, i) => <span className={`ph-headline-line ${i === 1 ? 'ph-italic' : ''}`} key={line}><motion.span initial={{ y: reduced ? 0 : '110%' }} animate={visible ? { y: 0 } : {}} transition={{ duration: 1.15, delay: i * .1, ease }}>{line}</motion.span></span>)}</h2>
    <motion.div className="ph-intro" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 1, delay: .2, ease }}><p>Because every space tells a story —<br/>a story of people, purpose and possibility.<br/>Designing with intention, creating environments<br className="ph-copy-break"/> that stir emotion and stand the test of time.</p><button className="ph-approach" onClick={approach}><span><ArrowRight size={26} strokeWidth={.8}/></span>OUR APPROACH</button></motion.div>
    <motion.div className="ph-fabric-top" style={{ y: reduced ? 0 : fabricY }}><Fragment crop="1178 0 358 380" decorative/></motion.div>
    <div className="ph-fabric-words" aria-hidden="true"><i/><span>SPACES</span><span>PEOPLE</span><span>EMOTIONS</span></div>
    <motion.div className="ph-fabric-bottom" style={{ x: reduced ? 0 : fabricX }}><Fragment crop="0 690 680 334" decorative/></motion.div>
    <Photograph name="main" crop="646 0 366 557" label="Sunlit plaster arches, bronze pendant lights, sculptural seating and branches" y={mainY}/>
    <Photograph name="second" crop="906 406 306 546" label="Atmospheric stone interior with sculptural branches and a burgundy velvet ottoman" y={secondY} direction="top" delay={.1}/>
    <Photograph name="detail" crop="1289 263 161 187" label="Veined stone console meeting burgundy velvet upholstery" y={detailY}/>
    <Photograph name="material" crop="562 800 158 115" label="Natural woven upholstery, bronze and burgundy textile detail" y={detailY}/>
    <motion.span className="ph-note ph-note-details" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ duration: 1.3, delay: .6 }}>Details<br/><span>Matter</span></motion.span>
    {principles.map((item, index) => <Principle key={item.number} item={item} index={index}/>)}
    <svg className="ph-sweep" viewBox="0 0 640 150" fill="none" aria-hidden="true"><path d="M-30 15C90 63 164 60 258 45S452 4 575 94S626 132 660 145" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke"/></svg>
    <div className="ph-micro-left" aria-hidden="true"><span>MORE<br/>THAN SPACES</span><i/></div>
    <div className="ph-scroll" aria-hidden="true"><i/><span>SCROLL<br/>TO CONTINUE</span><motion.span animate={reduced ? {} : { y: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={23} strokeWidth={.7}/></motion.span></div>
    <div className="ph-micro-right" aria-hidden="true"><span>A MORE</span><div><i/>BEAUTIFUL TOMORROW</div></div>
  </section></RevealContext.Provider>;
}
