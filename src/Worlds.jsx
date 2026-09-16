import React, { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import './worlds.css';

const ease = [.16, 1, .3, 1];

const categories = [
  {
    id: 'retail',
    number: '01',
    name: ['RETAIL &', 'WINDOW DISPLAYS'],
    description: 'Designed to make them stop.',
    crop: '1271 88 244 416',
    alt: 'Sculptural mannequin and stone plinths in a burgundy retail window.'
  },
  {
    id: 'hotel',
    number: '02',
    name: ['HOSPITALITY', '& 4★ HOTELS'],
    description: 'Stays worth remembering.',
    crop: '1042 92 216 412',
    alt: 'Hotel restaurant with burgundy seating, bronze lighting and warm stone arches.'
  },
  {
    id: 'holiday',
    number: '03',
    name: ['HOLIDAY HOMES'],
    description: 'Temporary stays. Lasting feelings.',
    crop: '781 452 210 191',
    alt: 'Sunlit holiday villa with cream arches and a courtyard pool.'
  },
  {
    id: 'residential',
    number: '04',
    name: ['RESIDENTIAL'],
    description: 'Spaces made personal.',
    crop: '658 24 374 783',
    alt: 'Monumental stone arch framing a sculptural tree, cream sofa and dark circular coffee table.'
  }
];

export default function Worlds() {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 15 },
    animate: visible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease }
  });

  return (
    <section ref={sectionRef} id="worlds" className="bs03-section relative isolate overflow-hidden">
      {/* Master Arch Mask SVG Definition */}
      <svg className="s03-mask-definitions" aria-hidden="true">
        <defs>
          <clipPath id="arch-master-mask" clipPathUnits="objectBoundingBox">
            <path d="M0 0H.43C.79 0 1 .14 1 .32V.975Q.9 1 .7 1H0Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="s03-worlds-grain" aria-hidden="true" />

      <div className="s03-container">
        {/* LEFT EDITORIAL AREA (34%) */}
        <div className="s03-left-col">
          <motion.div className="s03-section-label" {...fade(0.1)}>
            <span>03 / OUR SERVICES</span><i />
          </motion.div>

          <h2 className="s03-worlds-headline">
            <span className="s03-headline-line">
              <motion.span initial={reduced ? false : { y: '115%' }} animate={visible ? { y: 0 } : {}} transition={{ duration: 0.9, delay: 0.2, ease }}>
                ONE STUDIO.
              </motion.span>
            </span>
            <span className="s03-headline-line s03-italic">
              <motion.span initial={reduced ? false : { y: '115%' }} animate={visible ? { y: 0 } : {}} transition={{ duration: 0.9, delay: 0.32, ease }}>
                many worlds.
              </motion.span>
            </span>
          </h2>

          <motion.p className="s03-worlds-intro" {...fade(0.4)}>
            From intimate homes to windows that stop you in your tracks — we shape spaces, moments and experiences with character.
          </motion.p>

          <motion.div className="s03-worlds-bottom-tag" {...fade(0.55)}>
            <span>SPACES</span><i></i><span>PEOPLE</span><i></i><span>EMOTIONS</span>
          </motion.div>
        </div>

        {/* RIGHT PORTFOLIO AREA (66%): EXACT 4 UNIFORM ARCHED CARDS */}
        <div className="s03-right-col">
          <div className="s03-cards-grid">
            {categories.map((cat, i) => (
              <motion.figure
                key={cat.id}
                className="s03-card"
                initial={reduced ? false : { opacity: 0, y: 25 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.35 + i * 0.08, ease }}
              >
                <div className="s03-card-mask">
                  <svg className={`s03-card-img s03-img-${cat.id}`} viewBox={cat.crop} preserveAspectRatio="xMidYMid slice" role="img" aria-label={cat.alt}>
                    <image 
                      href={cat.id === 'holiday' ? '/images/worlds-plate.png' : '/images/section03-clean.png'} 
                      width={cat.id === 'holiday' ? 1536 : 1672} 
                      height={cat.id === 'holiday' ? 1024 : 941} 
                    />
                  </svg>
                  <div className="s03-card-gradient" />
                  
                  <figcaption className="s03-card-content">
                    <span className="s03-card-num">{cat.number}</span>
                    <h3 className="s03-card-title">
                      {cat.name.map((line) => <span key={line}>{line}</span>)}
                    </h3>
                    <p className="s03-card-desc">{cat.description}</p>
                    <i className="s03-card-gold-rule" />
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
