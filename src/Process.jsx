import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import './process.css';

const ease = [0.16, 1, 0.3, 1];

const stages = [
  {
    number: '01',
    title: 'DISCOVER',
    sub: 'Understanding Your Vision',
    tag: 'PEOPLE FIRST',
    description: 'We listen, uncover what moves you, and identify core objectives to shape a clear, human-centric foundation.'
  },
  {
    number: '02',
    title: 'CONCEPTUALISE',
    sub: 'Defining Ideas & Purpose',
    tag: 'IDEAS IN MOTION',
    description: 'We explore possibilities, define architectural narratives, and articulate spatial purpose with creative clarity.'
  },
  {
    number: '03',
    title: 'DESIGN',
    sub: 'Refining Details & Intention',
    tag: 'DETAILS MATTER',
    description: 'We sculpt space with tactile depth, balancing materiality, lighting, and bespoke elements with meticulous care.'
  },
  {
    number: '04',
    title: 'EXECUTE',
    sub: 'Bringing Design to Life',
    tag: 'VISION REALISED',
    description: 'We orchestrate project delivery alongside master artisans, ensuring the complete vision is built to perfection.'
  },
  {
    number: '05',
    title: 'PERFECT',
    sub: 'Styling the Atmosphere',
    tag: 'LASTING IMPRESSION',
    description: 'We curate the sensory layers — styling, art, and illumination — transforming physical spaces into lasting emotion.'
  }
];

export default function Process() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section ref={ref} id="process" className="process" aria-labelledby="process-title">
      <div className="process-inner">
        {/* Editorial Header */}
        <header className="process-header">
          <motion.div 
            className="process-label"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span>04 / HOW WE WORK</span>
            <i className="process-label-line" />
          </motion.div>

          <div className="process-headline-row">
            <h2 id="process-title" className="process-headline">
              <span className="process-headline-main">FROM IDEA</span>
              <span className="process-headline-sub">to atmosphere.</span>
            </h2>

            <motion.p 
              className="process-lead"
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease }}
            >
              A disciplined journey from initial vision to evocative, fully realized spaces — guided by intention, materiality, and restraint.
            </motion.p>
          </div>
        </header>

        {/* Minimal 5-Stage Grid */}
        <div className="process-grid" role="list">
          {stages.map((stage, i) => (
            <motion.article 
              key={stage.number}
              className={`process-card ${activeStage === i ? 'is-active' : ''}`}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15 + i * 0.1, ease }}
              onMouseEnter={() => setActiveStage(i)}
              onMouseLeave={() => setActiveStage(null)}
              tabIndex={0}
              onFocus={() => setActiveStage(i)}
              onBlur={() => setActiveStage(null)}
              role="listitem"
            >
              <div className="process-card-top">
                <span className="process-card-number">{stage.number}</span>
                <span className="process-card-tag">{stage.tag}</span>
              </div>

              <div className="process-card-divider" />

              <div className="process-card-content">
                <h3 className="process-card-title">{stage.title}</h3>
                <p className="process-card-sub">{stage.sub}</p>
                <p className="process-card-desc">{stage.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Minimal Editorial Footer */}
        <footer className="process-footer" aria-hidden="true">
          <span className="process-footer-text">THOUGHTFUL DESIGN — TIMELESS SPACES</span>
          <i className="process-footer-rule" />
          <span className="process-footer-text">A MORE BEAUTIFUL TOMORROW</span>
        </footer>
      </div>
    </section>
  );
}
