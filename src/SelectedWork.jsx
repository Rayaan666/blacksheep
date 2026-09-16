import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, X } from 'lucide-react';
import './selected-work.css';

const ease=[.16,1,.3,1];
const asset='/images/selected-work-plate.png';
const projects=[
 {id:'residential',number:'01',title:'RESIDENTIAL',category:'Villas & Residences',message:['Designed','around living.'],crop:'470 25 408 705',path:'M578 25C748 15 878 104 878 240V650H778C704 647 637 730 585 730H470V427C468 341 497 283 578 255Z',drift:-20,alt:'Sunlit villa living room with a tall window, mature tree, curved ivory sofa and sculptural stone coffee table'},
 {id:'hospitality',number:'02',title:'HOSPITALITY',category:'Hotels & Holiday Homes',message:['Made to be','remembered.'],crop:'889 0 248 650',path:'M889 0H1137V600C1094 629 1046 650 1014 650H889Z',drift:12,alt:'Intimate hospitality dining room beneath repeating bronze-lit arches with burgundy chairs'},
 {id:'retail',number:'03',title:'RETAIL',category:'Window Displays & Artwork',message:['Designed to','make them stop.'],crop:'1149 0 304 510',path:'M1149 0H1388C1430 37 1453 83 1453 138V449C1355 453 1250 480 1193 510H1149Z',drift:-15,alt:'Sculptural luxury window display with stone pedestals and art objects against a burgundy recessed arch'},
 {id:'commercial',number:'04',title:'COMMERCIAL',category:'Offices & Commercial Spaces',message:['Purpose,','with personality.'],crop:'668 530 582 362',path:'M668 685C727 653 744 663 811 663H1009C1112 648 1163 581 1242 530L1250 892H668Z',drift:10,alt:'Warm walnut executive boardroom with a long table, architectural lighting and skyline view'},
 {id:'events',number:'05',title:'EVENT STYLING',category:'Experiential Environments',message:['Moments','transformed.'],crop:'1254 447 418 395',path:'M1254 522C1353 460 1436 441 1511 448C1587 452 1640 485 1672 524V778C1606 790 1466 840 1424 842C1348 841 1287 805 1254 770Z',drift:-12,alt:'Immersive candlelit event dining beneath a dramatic installation of suspended warm lights'},
];
function ProjectPhoto({project,progress,still,preview=false}) {
 const y=useTransform(progress,[0,1],[-project.drift/2,project.drift/2]);
 return <svg viewBox={project.crop} preserveAspectRatio="none" role="img" aria-label={project.alt} className="selected-photo"><defs><clipPath id={`selected-mask-${project.id}${preview?'-preview':''}`}><path d={project.path}/></clipPath></defs><g clipPath={`url(#selected-mask-${project.id}${preview?'-preview':''})`}><motion.image href={asset} width="1672" height="941" preserveAspectRatio="none" style={{y:still?0:y}}/></g></svg>;
}
function Project({project,index,visible,progress,still,onOpen}) {
 const reveal=index===3?'inset(0 100% 0 0)':index===1?'inset(0 0 100% 0)':'inset(100% 0 0 0)';
 return <motion.article className={`selected-project selected-project-${project.id}`} initial={{opacity:0,clipPath:still?'inset(0)':reveal}} animate={visible?{opacity:1,clipPath:'inset(0% 0% 0% 0%)'}:{}} transition={{duration:1,delay:.35+index*.14,ease}}>
  <button className="selected-project-button" id={`selected-project-${project.id}`} onClick={()=>onOpen(project)} aria-label={`View ${project.title.toLowerCase()} project`}>
   <ProjectPhoto {...{project,progress,still}}/>
   <span className="selected-project-copy"><span className="selected-project-number">{project.number}</span><span className="selected-project-rule"/><span className="selected-project-title">{project.title}</span><span className="selected-project-category">{project.category}</span><span className="selected-project-message">{project.message.map(line=><span key={line}>{line}</span>)}</span>{project.id==='hospitality'&&<ArrowDown className="selected-project-down" size={52} strokeWidth={.6}/>}<span className="selected-view">VIEW ↗</span></span>
  </button>
 </motion.article>;
}
function ProjectViewer({project,close,progress}) {
 const ref=useRef(null);useEffect(()=>{if(project)ref.current.showModal();else ref.current.close();},[project]);
 return <dialog ref={ref} className="selected-viewer" aria-label="Selected project preview" onCancel={close} onClick={e=>{if(e.target===ref.current)close();}}><div className="selected-viewer-inner"><button className="selected-viewer-close" onClick={close} aria-label="Close project preview"><X strokeWidth={1}/></button>{project&&<><p>BLACK SHEEP DESIGNS</p><h3>{project.title}</h3><div className="selected-viewer-photo"><ProjectPhoto {...{project,progress}} still preview/></div><p className="selected-viewer-caption">{project.category}</p></>}</div></dialog>;
}
export default function SelectedWork() {
 const ref=useRef(null);const visible=useInView(ref,{once:true,amount:.05});const reduced=useReducedMotion();
 const [mobile,setMobile]=useState(false),[preview,setPreview]=useState(null);
 useEffect(()=>{const query=matchMedia('(max-width:767px)');const update=()=>setMobile(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});const fabricX=useTransform(scrollYProgress,[0,1],[-5,5]);const still=reduced||mobile;
 const explore=()=>{const target=document.getElementById('selected-project-residential');target.focus({preventScroll:true});if(mobile)target.scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});};
 return <section id="selected-work" ref={ref} className="selected-work" aria-labelledby="selected-work-title">
  <div className="selected-paper" aria-hidden="true"/>
  <motion.div className="selected-label" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1}}><span>06 / SELECTED WORK</span><i/></motion.div>
  <h2 className="selected-headline" id="selected-work-title">{['SPACES WITH','something','to say.'].map((line,i)=><span className="selected-headline-line" key={line}><motion.span initial={{y:still?0:'110%'}} animate={visible?{y:0}:{}} transition={{duration:1.1,delay:i*.12,ease}}>{line}</motion.span></span>)}</h2>
  <motion.p className="selected-support" initial={{opacity:0,y:still?0:10}} animate={visible?{opacity:1,y:0}:{}} transition={{duration:1,delay:.35,ease}}>PEOPLE. PLACES. PURPOSE.<br/>BEAUTIFULLY CONNECTED.</motion.p>
  <motion.button className="selected-explore" onClick={explore} initial={{opacity:0,scale:still?1:.92}} animate={visible?{opacity:1,scale:1}:{}} transition={{duration:1,delay:.45,ease}}><span>EXPLORE</span><ArrowRight size={26} strokeWidth={.8}/></motion.button>
  <svg className="selected-gold-curve" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true"><path d="M556 26H579M490 430C337 491 354 807 643 813" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke"/><circle cx="556" cy="26" r="2"/><circle cx="643" cy="813" r="2"/></svg>
  <div className="selected-gallery" aria-label="Selected projects">{projects.map((project,index)=><Project key={project.id} {...{project,index,visible,still}} progress={scrollYProgress} onOpen={setPreview}/>)}</div>
  <svg className="selected-corner" viewBox="1508 378 164 149" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="selected-corner-mask"><path d="M1508 444C1576 421 1625 388 1672 378V524C1612 470 1559 446 1508 444Z"/></clipPath></defs><image href={asset} width="1672" height="941" clipPath="url(#selected-corner-mask)" preserveAspectRatio="none"/></svg>
  <motion.div className="selected-handwritten" initial={{opacity:0}} animate={visible?{opacity:1}:{}} transition={{duration:1,delay:1.1}} aria-hidden="true">Design<br/><span>for a more</span><br/><span>human tomorrow.</span><i/></motion.div>
  <div className="selected-top-micro" aria-hidden="true">SPACES<br/>PEOPLE<br/>STORIES<br/>BEYOND<br/>THE ORDINARY</div>
  <div className="selected-footer-left" aria-hidden="true">THOUGHTFUL DESIGN<br/>TIMELESS SPACES<i/></div>
  <div className="selected-footer-right" aria-hidden="true"><i/>A MORE BEAUTIFUL TOMORROW</div>
  <ProjectViewer project={preview} close={()=>setPreview(null)} progress={scrollYProgress}/>
 </section>;
}
