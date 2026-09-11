import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './language.css';

const ease = [0.16, 1, 0.3, 1];
const materials = [
  { id: 'stone', number: '01', name: 'NATURAL STONE', descriptor: 'grounded.', polygon: '850,318 906,130 921,121 1076,70 1078,351 1006,358 1006,489 937,492 937,313 912,306', line: 'M720 184H919', target: [919,184], shift: -1, delay: .35 },
  { id: 'wood', number: '02', name: 'RICH WOOD', descriptor: 'timeless.', polygon: '797,327 911,306 939,313 939,491 903,496 902,748 799,748', line: 'M689 423H835', target: [835,423], shift: -4, delay: .48 },
  { id: 'bronze', number: '03', name: 'BRUSHED BRONZE', descriptor: 'warm.', polygon: '1007,359 1184,335 1207,343 1207,532 1166,489 1062,500 1062,494 1028,484 1007,487', line: 'M1175 421H1343', target: [1175,421], shift: -6, delay: .61 },
  { id: 'linen', number: '04', name: 'NATURAL LINEN', descriptor: 'soft.', polygon: '797,546 752,553 695,578 642,617 599,661 571,696 568,711 548,728 537,767 531,804 522,864 549,866 574,781 609,752 800,749 808,690 797,622', line: 'M432 619H646', target: [646,619], shift: 2, delay: .87 },
  { id: 'velvet', number: '05', name: 'BURGUNDY VELVET', descriptor: 'dramatic.', polygon: '1062,499 1104,486 1157,489 1191,511 1240,555 1282,612 1351,678 1411,730 1466,801 1520,846 1536,875 1536,901 1268,900 1190,887 1144,857 1113,794 1093,717 1064,627', line: 'M1219 568H1361', target: [1219,568], shift: 3, delay: 1 },
  { id: 'plaster', number: '06', name: 'TEXTURED PLASTER', descriptor: 'tactile.', polygon: '903,496 1028,484 1063,494 1063,748 903,748', line: 'M999 689H1138L1201 754H1338', target: [999,689], shift: 2.5, delay: .74 },
];
const basePolygon = '500,752 537,746 535,801 523,865 550,866 574,781 609,750 1102,750 1135,864 1201,887 509,868 495,862 490,808 493,775';
const asset = '/images/language-still-life.png';

function MaterialLayer({ material, active, setActive, visible, progress, still }) {
  const drift = useTransform(progress, [0,1], [-material.shift/2,material.shift/2]);
  return <motion.g style={{ y: still ? 0 : drift }}><motion.g initial={{opacity:0,y:still?0:6}} animate={visible?{opacity:1,y:0}:{}} transition={{duration:1,delay:material.delay,ease}}>
    <image href={asset} width="1536" height="1024" clipPath={`url(#language-clip-${material.id})`} className={`language-material-image ${active===material.id?'is-active':''}`}/>
    <polygon points={material.polygon} fill="transparent" className="language-material-hit" onMouseEnter={()=>setActive(material.id)} onMouseLeave={()=>setActive(null)} aria-hidden="true"/>
  </motion.g></motion.g>;
}
function StillLife({ active, setActive, visible, progress, still, mobile }) {
  return <svg className="language-art" viewBox={mobile?'460 40 1076 890':'0 0 1536 1024'} preserveAspectRatio={mobile?'xMidYMid meet':'none'} role="img" aria-label="A cohesive studio still life of raw stone, fluted walnut, brushed bronze, natural linen, burgundy velvet and textured plaster, resting on a dark marble slab">
    <defs>{materials.map(m=><clipPath id={`language-clip-${m.id}`} key={m.id}><polygon points={m.polygon}/></clipPath>)}<clipPath id="language-base-clip"><polygon points={basePolygon}/></clipPath><mask id="language-surroundings"><rect width="1536" height="1024" fill="white"/>{materials.map(m=><polygon key={m.id} points={m.polygon} fill="black"/>)}<polygon points={basePolygon} fill="black"/></mask></defs>
    <motion.image href={asset} width="1536" height="1024" mask="url(#language-surroundings)" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1,ease}}/>
    <motion.image href={asset} width="1536" height="1024" clipPath="url(#language-base-clip)" initial={{opacity:0,y:still?0:5}} animate={visible?{opacity:1,y:0}:{}} transition={{duration:1,delay:.2,ease}}/>
    {materials.map(material=><MaterialLayer key={material.id} {...{material,active,setActive,visible,progress,still}}/>)}
  </svg>;
}
function TabletConnectors({ width, active }) {
  const scale=Math.min(width*.85/1076,780/890);
  const left=width*.15+(width*.85-1076*scale)/2;
  const top=290+(780-890*scale)/2;
  const anchors=[[.34,445],[.24,645],[.79,632],[.08,857],[.79,857],[.70,1095]];
  return <svg className="language-tablet-connectors" viewBox={`0 0 ${width} 1250`} preserveAspectRatio="none" aria-hidden="true">{materials.map((m,i)=>{const x=left+(m.target[0]-460)*scale,y=top+(m.target[1]-40)*scale;return <g key={m.id} className={active===m.id?'is-active':''}><path d={`M${anchors[i][0]*width} ${anchors[i][1]}L${x} ${y}`} fill="none"/><circle cx={x} cy={y} r="1.8"/></g>;})}</svg>;
}
export default function Language() {
  const ref=useRef(null);
  const visible=useInView(ref,{once:true,amount:.06});
  const reduced=useReducedMotion();
  const [compact,setCompact]=useState(false),[active,setActive]=useState(null);
  const [width,setWidth]=useState(1536);
  useEffect(()=>{const observer=new ResizeObserver(([entry])=>setWidth(entry.contentRect.width));observer.observe(ref.current);return()=>observer.disconnect();},[]);
  useEffect(()=>{const media=matchMedia('(max-width:1100px)');const update=()=>setCompact(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const still=reduced||compact;
  return <section ref={ref} id="language" className="language" aria-labelledby="language-title">
    <StillLife {...{active,setActive,visible,still}} progress={scrollYProgress} mobile={compact}/>
    <div className="language-grain" aria-hidden="true"/>
    <motion.div className="language-section-label" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1}}><span>05 / OUR LANGUAGE</span><i/></motion.div>
    <h2 id="language-title" className="language-headline">{['YOU CAN','almost feel it.'].map((line,i)=><span className="language-headline-line" key={line}><motion.span initial={{y:still?0:'110%'}} animate={visible?{y:0}:{}} transition={{duration:1.1,delay:i*.15,ease}}>{line}</motion.span></span>)}</h2>
    <motion.p className="language-keywords" initial={{opacity:0,y:still?0:10}} animate={visible?{opacity:1,y:0}:{}} transition={{duration:1,delay:.35,ease}}>{['TEXTURE.','CONTRAST.','CRAFT.','TONE.','ATMOSPHERE.'].map(word=><span key={word}>{word}</span>)}</motion.p>
    <motion.p className="language-statement" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1.2,delay:.6}}>Materials shape<br/>more than spaces,<br/>they shape emotions.<i/></motion.p>
    <svg className="language-connectors" viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">{materials.map((m,i)=><g key={m.id} className={active===m.id?'is-active':''}><motion.path d={m.line} fill="none" pathLength="1" initial={{strokeDasharray:'1 1',strokeDashoffset:reduced?0:1,opacity:0}} animate={visible?{strokeDashoffset:0,opacity:1}:{}} transition={{duration:.8,delay:1.2+i*.1,ease}}/><motion.circle cx={m.target[0]} cy={m.target[1]} r="2" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{delay:1.6+i*.1}}/></g>)}</svg>
    {compact && width>767 && <TabletConnectors width={width} active={active}/>}
    <ol className="language-labels" aria-label="Our six materials">{materials.map((m,i)=><motion.li key={m.id} className={`language-label language-label-${m.id} ${active===m.id?'is-active':''}`} tabIndex={0} onMouseEnter={()=>setActive(m.id)} onMouseLeave={()=>setActive(null)} onFocus={()=>setActive(m.id)} onBlur={()=>setActive(null)} initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:.8,delay:1.4+i*.1,ease}}><span className="language-number">{m.number}</span><h3>{m.name}</h3><em>{m.descriptor}</em></motion.li>)}</ol>
    <div className="language-top-micro" aria-hidden="true">MATERIALS<br/>SHAPE<br/>MOODS<br/>SPACES</div>
    <div className="language-footer-left" aria-hidden="true">THOUGHTFUL DESIGN<br/>TIMELESS SPACES<i/></div>
    <div className="language-footer-right" aria-hidden="true"><i/>A MORE BEAUTIFUL TOMORROW</div>
  </section>;
}
