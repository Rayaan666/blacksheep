import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1536,1024],['laptop',1440,900],['tablet',834,1112],['mobile',390,844],['small-mobile',320,740]]){
 await page.setViewportSize({width,height});await page.goto(process.env.PREVIEW_URL||'http://localhost:5180',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#worlds');await section.scrollIntoViewIfNeeded();await page.waitForTimeout(2400);
 await section.screenshot({path:`test-results/worlds-${name}.png`});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${name}: page overflow`);
 if(await section.locator('.worlds-headline-line').evaluateAll(els=>els.some(el=>el.scrollWidth>el.clientWidth+1)))throw Error(`${name}: clipped headline`);
 if(await section.locator('.world-photo-reveal').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error(`${name}: image reveal`);
 if(await section.locator('.world-row').count()!==6)throw Error('Missing service');
 for(const id of ['retail','hotel','holiday','residential','office','events']){
  const row=section.locator(`.world-${id} .world-row`);await row.focus();await page.waitForTimeout(30);
  if(!await section.locator(`.world-${id}`).evaluate(el=>el.classList.contains('is-active')))throw Error(`${id}: focus not linked`);
  await row.press('Enter');await page.getByRole('dialog',{name:'Design world preview'}).waitFor();await page.keyboard.press('Escape');
 }
 if(width>767){await section.locator('.world-retail .world-row').hover();await page.waitForTimeout(800);if(await section.locator('.world-photo.is-muted').count()!==5)throw Error('Hover image focus failed');}
 console.log(`${name}: layout, six focus states, previews, Escape passed`);
}
await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'domcontentloaded'});await page.locator('#worlds').scrollIntoViewIfNeeded();await page.waitForTimeout(2200);
if(await page.locator('.world-photo-reveal').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error('Reduced motion reveal');
await browser.close();if(errors.length)throw Error(errors.join('\n'));
