import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1536,1024],['laptop',1440,900],['tablet',834,1112],['mobile',390,844],['small-mobile',320,740]]){
 await page.setViewportSize({width,height});
 await page.goto(process.env.PREVIEW_URL||'http://localhost:5180',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#philosophy');
 const box=await section.boundingBox();
 // Traverse the entire section to trigger independent viewport reveals.
 for(let y=box.y;y<box.y+box.height;y+=height*.6){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(180);}
 await page.evaluate(y=>window.scrollTo(0,y),box.y);
 await page.waitForTimeout(1700);
 if(await section.locator('.ph-photo').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error(`${name}: photo reveal failed`);
 if(await section.locator('.ph-headline-line').evaluateAll(els=>els.some(el=>el.scrollWidth>el.clientWidth+1)))throw Error(`${name}: headline clipped`);
 await section.screenshot({path:`test-results/philosophy-${name}.png`});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${name}: overflow`);
 if(await section.locator('h3').count()!==4)throw Error('Missing principles');
 await page.getByRole('button',{name:'Our approach'}).click();
 await page.waitForTimeout(900);
 if(!await page.locator('#principle-01').evaluate(el=>el===document.activeElement))throw Error('Approach does not focus first principle');
 console.log(`${name}: section, principles, CTA, overflow passed`);
}
await page.emulateMedia({reducedMotion:'reduce'});
await page.reload({waitUntil:'domcontentloaded'});
await page.locator('#philosophy').scrollIntoViewIfNeeded();
await browser.close();if(errors.length)throw Error(errors.join('\n'));
