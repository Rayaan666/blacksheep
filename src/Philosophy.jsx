import React, { useRef, useContext, createContext } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './philosophy.css';

const ease = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: .15 };
const RevealContext = createContext(false);

function Fragment({ crop, className = '', label }) {
  return (
    <svg className={className} viewBox={crop} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <image href="/images/philosophy-plate.png" width="1536" height="1024" />
    </svg>
  );
}

function Photograph({ name, crop, label, y, delay = 0 }) {
  const reduced = useReducedMotion();
  const visible = useContext(RevealContext);
  return (
    <motion.figure 
      className={`ph-photo ph-photo-${name}`} 
      style={{ y: reduced ? 0 : y }} 
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }} 
      animate={visible ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' } : {}} 
      transition={{ duration: 1.3, delay, ease }}
    >
      <motion.div 
        initial={{ scale: reduced ? 1 : 1.06 }} 
        whileInView={{ scale: 1 }} 
        viewport={viewport} 
        transition={{ duration: 1.4, ease }}
      >
        <Fragment crop={crop} label={label}/>
      </motion.div>
    </motion.figure>
  );
}

export default function Philosophy() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: .08 });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  const mainY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const detailY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <RevealContext.Provider value={visible}>
      <section ref={ref} id="philosophy" className="philosophy" aria-labelledby="philosophy-title">
        
        {/* Left Zone: Editorial */}
        <div className="ph-zone-left">
          <motion.div className="ph-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ duration: 1 }}>
            <span>02 / PHILOSOPHY</span><i/>
          </motion.div>
          
          <h2 id="philosophy-title" className="ph-headline">
            {['CRAFTING', 'spaces that', 'MAKE YOU FEEL', 'SOMETHING.'].map((line, i) => (
              <span className={`ph-headline-line ${i === 1 ? 'ph-italic' : ''}`} key={line}>
                <motion.span initial={{ y: reduced ? 0 : '110%' }} animate={visible ? { y: 0 } : {}} transition={{ duration: 1.15, delay: i * .1, ease }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
          
          <motion.div className="ph-intro" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 1, delay: .2, ease }}>
            <p>Because every space tells a story —<br/>a story of people, purpose and possibility.<br/>Designing with intention, creating environments<br className="ph-copy-break"/> that stir emotion and stand the test of time.</p>
            <button className="ph-approach">
              <span><ArrowRight size={26} strokeWidth={.8}/></span>OUR APPROACH
            </button>
          </motion.div>
          
          <div className="ph-micro-left" aria-hidden="true">
            <span>MORE<br/>THAN SPACES</span><i/>
          </div>
        </div>

        {/* Center-Right Zone: Main Arch Photograph */}
        <div className="ph-zone-center">
          <Photograph name="main" crop="646 0 366 557" label="Sunlit plaster arches, bronze pendant lights" y={mainY} />
        </div>

        {/* Far-Right Zone: Detail Image + Quote */}
        <div className="ph-zone-right">
          <div className="ph-detail-wrapper">
             <div className="ph-gold-outline" />
             <Photograph name="detail" crop="1289 263 161 187" label="Material details" y={detailY} delay={0.2} />
          </div>
          <div className="ph-quote-wrapper">
            <span className="ph-quote-line" />
            <p className="ph-quote-text">
              The luxury comes<br/>from restraint.
            </p>
          </div>
          <div className="ph-micro-right" aria-hidden="true">
            <span>A MORE</span><div><i/>BEAUTIFUL TOMORROW</div>
          </div>
        </div>

        {/* Footer Line */}
        <div className="ph-footer-line" aria-hidden="true">
          <i className="ph-footer-rule"/>
          <span>SPACES — PEOPLE — EMOTIONS</span>
          <i className="ph-footer-rule"/>
        </div>


      </section>
    </RevealContext.Provider>
  );
}
