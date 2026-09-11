import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1536,1024],['laptop',1440,900],['tablet',834,1112],['mobile',390,844],['small-mobile',320,740]]){
 await page.setViewportSize({width,height});await page.goto(process.env.PREVIEW_URL||'http://localhost:5180',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#process');await section.scrollIntoViewIfNeeded();await page.locator('.process-journey').scrollIntoViewIfNeeded();await page.waitForTimeout(2700);
 await section.screenshot({path:`test-results/process-${name}.png`});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${name}: overflow`);
 if(await section.locator('.process-headline-line').evaluateAll(els=>els.some(el=>el.scrollWidth>el.clientWidth+1)))throw Error(`${name}: headline clipped`);
 if(await section.locator('.process-stage').count()!==5)throw Error('Missing stage');
 if(await section.locator('.process-stage img,.process-stage image,.process-stage picture').count())throw Error('Process stages must be image-free');
 if(await section.locator('.process-stage').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error(`${name}: reveal failure`);
 for(let i=0;i<4;i++){await section.locator('.process-next').nth(i).click();if(!await page.locator(`#process-stage-${i+1}`).evaluate(el=>document.activeElement===el))throw Error('Next stage focus failed');}
 await section.locator('.process-stage').nth(0).focus();if(!await section.locator('.process-stage').nth(0).evaluate(el=>el.classList.contains('is-active')))throw Error('Focus styling failed');
 console.log(`${name}: layout, image-free stages, reveals, four arrow controls passed`);
}
await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'domcontentloaded'});await page.locator('.process-journey').scrollIntoViewIfNeeded();await page.waitForTimeout(1800);if(await page.locator('.process-stage').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error('Reduced motion visibility');
await browser.close();if(errors.length)throw Error(errors.join('\n'));
