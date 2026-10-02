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
  
  const mainY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const detailY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <RevealContext.Provider value={visible}>
      <section ref={ref} id="philosophy" className="philosophy-section" aria-labelledby="philosophy-title">
        {/* Outer antique-gold rectangular outline offset into burgundy */}
        <div className="ph-outer-frame">
          {/* Inner ivory panel (87-90% section width, exact ivory #eee6da) */}
          <div className="ph-ivory-panel">
            {/* Delicate antique-gold rectangular outline inset 25-30px inside ivory panel */}
            <div className="ph-inner-frame">
              {/* Editorial composition */}
              <div className="ph-content-grid">
                
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
                      <span><ArrowRight size={24} strokeWidth={.8}/></span>OUR APPROACH
                    </button>
                  </motion.div>
                </div>
                  
                {/* Center-Right Zone: Main Arch Photograph */}
                <div className="ph-zone-center">
                  <Photograph name="main" crop="646 0 366 557" label="Sunlit plaster arches, bronze pendant lights" y={mainY} />
                </div>

                {/* Upper-Right Zone: Detail Image */}
                <div className="ph-zone-right">
                  <div className="ph-detail-wrapper">
                     <div className="ph-gold-outline" />
                     <Photograph name="detail" crop="1289 263 161 187" label="Material details" y={detailY} delay={0.2} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealContext.Provider>
  );
}
