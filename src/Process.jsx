import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './process.css';

const ease = [0.16, 1, 0.3, 1];
const stages = [
  { title: 'DISCOVER', sub: ['UNDERSTANDING', 'YOUR VISION'], description: 'We listen, we learn and we uncover what moves you, so we can create something meaningful together.', label: 'PEOPLE FIRST' },
  { title: 'CONCEPTUALISE', sub: ['DEFINING IDEAS', 'AND PURPOSE'], description: 'We explore possibilities, shape a unique concept and bring your vision into focus with clarity and creativity.', label: 'IDEAS IN MOTION' },
  { title: 'DESIGN', sub: ['REFINING DETAILS', 'AND INTENTION'], description: 'We develop the design with depth, carefully considering every element to create a cohesive, emotive space.', label: 'DETAILS MATTER' },
  { title: 'EXECUTE', sub: ['BRINGING', 'DESIGN TO LIFE'], description: 'We manage, collaborate and bring the vision to life with trusted partners and a commitment to excellence.', label: 'VISION REALISED' },
  { title: 'PERFECT', sub: ['STYLING THE FINAL', 'ATMOSPHERE'], description: 'We refine, we style and add the final layer — transforming your space into an unforgettable experience.', label: 'A LASTING IMPRESSION' },
];
const segments = [
  'M106 425 C185 382 236 453 316 488 C354 508 373 442 409 425',
  'M409 425 C494 399 535 416 578 451 C605 474 622 501 638 487 C680 489 686 432 720 425',
  'M720 425 C807 393 859 430 920 488 C961 509 983 438 1020 425',
  'M1020 425 C1105 390 1172 455 1233 488 C1267 507 1288 445 1320 425',
  'M1320 425 C1405 396 1459 420 1536 461',
];
const path = segments.join(' ');

function Material({ position, style, visible, reduced }) {
  const top = position === 'top';
  return <motion.svg className={`process-material process-material-${position}`} style={style} initial={top ? { clipPath: reduced ? 'inset(0)' : 'inset(0 0 6% 0)', opacity: .85 } : false} animate={visible ? { clipPath:'inset(0% 0% 0% 0%)', opacity:1 } : {}} transition={{duration:1.3,ease}} viewBox={top ? '905 0 631 300' : '0 810 880 214'} preserveAspectRatio="none" aria-hidden="true">
    <defs><clipPath id={`process-${position}-clip`}><path d={top ? 'M905 0H1536V162C1440 218 1340 224 1308 266C1294 287 1297 306 1270 292L1218 253C1060 248 938 145 905 0Z' : 'M0 814C48 817 58 838 91 854C222 851 248 842 421 890C582 890 704 916 789 976L870 1024H0Z'}/></clipPath></defs>
    <image href="/images/process-materials.png" width="1536" height="1024" clipPath={`url(#process-${position}-clip)`}/>
  </motion.svg>;
}
function JourneyLine({ visible, reduced, active }) {
  return <>
    <svg className="process-line process-line-desktop" viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true"><motion.path d={path} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength="1" initial={{ strokeDasharray: '1 1', strokeDashoffset: reduced ? 0 : 1 }} animate={visible ? { strokeDashoffset: 0 } : {}} transition={{ duration: reduced ? 0 : 2.4, ease: 'easeInOut' }}/>{segments.map((d, i) => <path key={i} className={`process-line-highlight ${active === i ? 'is-lit' : ''}`} d={d} fill="none" strokeWidth="1.4" vectorEffect="non-scaling-stroke"/>)}{[156,462,771,1070,1372].map((x,i)=><circle key={x} cx={x} cy={i===1?422:415} r="2.4" fill="#f2ece2" stroke="currentColor" strokeWidth=".7"/>)}</svg>
    <svg className="process-line process-line-mobile" viewBox="0 0 100 1850" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M40 38C-8 150 95 228 40 398S-5 594 40 758S89 952 40 1118S-8 1320 40 1478L40 1830" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength="1" initial={{ strokeDasharray:'1 1', strokeDashoffset:reduced?0:1 }} animate={visible?{strokeDashoffset:0}:{}} transition={{duration:reduced?0:2.4}}/></svg>
  </>;
}
export default function Process() {
  const ref = useRef(null), journeyRef = useRef(null);
  const visible = useInView(ref, { once: true, amount: .05 });
  const journeyVisible = useInView(journeyRef, { once: true, amount: .1 });
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false), [active, setActive] = useState(null);
  useEffect(() => { const media=matchMedia('(max-width:767px)'); const update=()=>setMobile(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update); }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset:['start end','end start'] });
  const topY=useTransform(scrollYProgress,[0,1],[10,-10]), bottomX=useTransform(scrollYProgress,[0,1],[-7,8]);
  const still = reduced || mobile;
  const next = index => { const target=document.getElementById(`process-stage-${index+1}`);target.focus({preventScroll:true});if(mobile)target.scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'}); };
  return <section ref={ref} id="process" className="process" aria-labelledby="process-title">
    <div className="process-paper" aria-hidden="true"/>
    <Material position="top" visible={visible} reduced={reduced} style={{ y: 0 }}/><Material position="bottom" visible={visible} reduced={reduced} style={{ x: still?0:bottomX }}/>
    <motion.div className="process-label" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1}}><span>04 / HOW WE WORK</span><i/></motion.div>
    <h2 id="process-title" className="process-headline">{['FROM IDEA','to atmosphere.'].map((line,i)=><span className="process-headline-line" key={line}><motion.span initial={{y:still?0:'110%'}} animate={visible?{y:0}:{}} transition={{duration:1.1,delay:i*.15,ease}}>{line}</motion.span></span>)}</h2>
    <motion.div className="process-manifesto" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1.1,delay:.3}}>DESIGN<br/>IS A JOURNEY.<br/>WE WALK IT<br/>WITH YOU.<i/></motion.div>
    <div className="process-material-words" aria-hidden="true">PEOPLE<br/>PLACES<br/>POSSIBILITIES<i/></div>
    <motion.div className="process-handwritten" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1.2,delay:.55}} aria-hidden="true">More<br/><span>than just</span><br/><span>spaces</span><svg viewBox="0 0 90 35"><path d="M4 31Q44 14 87 4" stroke="currentColor" strokeWidth=".8" fill="none"/></svg></motion.div>
    <div ref={journeyRef} className="process-journey" aria-label="Our five-stage design process">
      <JourneyLine visible={journeyVisible} reduced={reduced} active={active}/>
      <ol className="process-stages">{stages.map((stage,i)=><motion.li id={`process-stage-${i}`} key={stage.title} tabIndex={0} className={`process-stage ${active===i?'is-active':''}`} style={{'--stage':i}} initial={{opacity:0,y:still?0:20}} animate={journeyVisible?{opacity:1,y:0}:{}} transition={{duration:.9,delay:i*.12,ease}} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)} onFocus={()=>setActive(i)} onBlur={()=>setActive(null)}>
        <motion.div className="process-number" initial={{opacity:0,scale:still?1:.9}} animate={journeyVisible?{opacity:1,scale:1}:{}} transition={{duration:.7,delay:i*.12,ease}} aria-hidden="true">0{i+1}</motion.div>
        <div className="process-stage-body"><h3>{stage.title}</h3><p className="process-subheading">{stage.sub.map(line=><span key={line}>{line}</span>)}</p><i className="process-short-rule"/><p className="process-description">{stage.description}</p></div>
        <div className="process-stage-label">{stage.label}<i/></div>
      </motion.li>)}</ol>
      {stages.slice(0,-1).map((stage,i)=><motion.button className="process-next" style={{'--connector':i,'--arrow-x':`${[19.1,40.05,58.4,78.78][i]}%`}} key={stage.title} aria-label={`Continue to ${stages[i+1].title.toLowerCase()}`} onClick={()=>next(i)} initial={{opacity:0}} animate={journeyVisible?{opacity:1}:{}} transition={{duration:.7,delay:.35+i*.25}}><ArrowRight size={25} strokeWidth={.9}/></motion.button>)}
    </div>
    <div className="process-footer-left" aria-hidden="true">THOUGHTFUL DESIGN<br/>TIMELESS SPACES<i/></div>
    <div className="process-footer-right" aria-hidden="true"><i/>A MORE BEAUTIFUL TOMORROW</div>
  </section>;
}
