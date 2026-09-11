import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1672,1000],['laptop',1440,900],['tablet',834,1112],['mobile',390,844],['small-mobile',320,740]]){
 await page.setViewportSize({width,height});await page.goto(process.env.PREVIEW_URL||'http://localhost:5180',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#selected-work');await section.scrollIntoViewIfNeeded();await page.waitForTimeout(2500);await section.screenshot({path:`test-results/selected-work-${name}.png`});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${name}: overflow`);
 if(await section.locator('.selected-headline-line').evaluateAll(els=>els.some(el=>el.scrollWidth>el.clientWidth+1)))throw Error(`${name}: clipped headline`);
 if(await section.locator('.selected-project').count()!==5)throw Error('Missing project');
 if(await section.locator('.selected-project').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error('Reveal failure');
 await section.getByRole('button',{name:'EXPLORE',exact:true}).click();if(!await page.locator('#selected-project-residential').evaluate(el=>el===document.activeElement))throw Error('Explore focus failed');
 for(const id of ['residential','hospitality','retail','commercial','events']){const button=page.locator(`#selected-project-${id}`);await button.focus();await button.press('Enter');await page.getByRole('dialog',{name:'Selected project preview'}).waitFor();await page.keyboard.press('Escape');}
 console.log(`${name}: masks, labels, reveals, Explore, five previews, Escape passed`);
}
await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'domcontentloaded'});await page.locator('#selected-work').scrollIntoViewIfNeeded();await page.waitForTimeout(2200);if(await page.locator('.selected-project').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error('Reduced motion visibility');
await browser.close();if(errors.length)throw Error(errors.join('\n'));
