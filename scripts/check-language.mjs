import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1536,1024],['laptop',1440,900],['tablet',834,1112],['mobile',390,844],['small-mobile',320,740]]){
 await page.setViewportSize({width,height});await page.goto(process.env.PREVIEW_URL||'http://localhost:5180',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#language');await section.scrollIntoViewIfNeeded();await page.waitForTimeout(2800);await section.screenshot({path:`test-results/language-${name}.png`});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${name}: overflow`);
 if(await section.locator('.language-headline-line').evaluateAll(els=>els.some(el=>el.scrollWidth>el.clientWidth+1)))throw Error(`${name}: headline clipped`);
 if(await section.locator('.language-label').count()!==6)throw Error('Missing material label');
 if(await section.locator('.language-label').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error('Label reveal failure');
 for(const id of ['stone','wood','bronze','linen','velvet','plaster']){await section.locator(`.language-label-${id}`).focus();if(!await section.locator(`.language-label-${id}`).evaluate(el=>el.classList.contains('is-active')))throw Error('Focus link failed');if(await section.locator('.language-material-image.is-active').count()!==1)throw Error('Material highlight failed');}
 console.log(`${name}: layout, six labels, reveals, six linked keyboard highlights passed`);
}
await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'domcontentloaded'});await page.locator('#language').scrollIntoViewIfNeeded();await page.waitForTimeout(2800);if(await page.locator('.language-label').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error('Reduced motion visibility');
await browser.close();if(errors.length)throw Error(errors.join('\n'));
