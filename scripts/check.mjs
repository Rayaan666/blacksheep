import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}),headless:true});
const page = await browser.newPage();
const errors=[]; page.on('pageerror', e=>errors.push(e.message));
for (const [name,width,height] of [['desktop',1536,1024],['laptop',1440,900],['tablet',834,1112],['mobile',390,844]]) {
 await page.setViewportSize({width,height});
 await page.goto(process.env.PREVIEW_URL || 'http://localhost:5180', {waitUntil:'domcontentloaded'});
 await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]));
 await page.waitForTimeout(1800);
 await page.screenshot({path:`test-results/${name}.png`,fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error(`${name}: horizontal overflow`);
 if(!await page.locator('.interior img').evaluate(img=>img.complete&&img.naturalWidth>0))throw new Error('Image missing');
 await page.getByRole('button',{name:'Open menu'}).click();
 await page.getByRole('navigation',{name:'Expanded navigation'}).getByRole('button',{name:'Journal'}).click();
 await page.getByRole('heading',{name:'Journal',exact:true}).waitFor();
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Watch our story',exact:true}).click();
 await page.getByText('The story film is coming soon.').waitFor();
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Explore our world'}).click();
 if(!await page.locator('.service').first().evaluate(el=>el===document.activeElement))throw new Error('Explore focus failed');
 console.log(`${name}: image, overflow, menu, Escape, story, CTA passed`);
}
await browser.close();
if(errors.length)throw new Error(errors.join('\n'));


