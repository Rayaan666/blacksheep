import fs from 'node:fs';
import { chromium } from '@playwright/test';

const refPath = 'C:/Users/rayaa/Downloads/ChatGPT Image Sep 10, 2026, 01_40_00 PM.png';
const b64 = fs.readFileSync(refPath).toString('base64');

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
});

const page = await browser.newPage();
await page.setContent('<canvas id="c" width="1672" height="941"></canvas><canvas id="c2" width="872" height="690"></canvas>');

await page.evaluate(async (data) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const c = document.getElementById('c');
      const ctx = c.getContext('2d');
      const W = 1672;
      const H = 941;

      // Draw the original high-resolution render
      ctx.drawImage(img, 0, 0);

      // Clean the top-right micro navigation text on the architectural plaster:
      const topWallPatch = ctx.getImageData(1160, 58, 480, 15);
      for (let y = 15; y <= 55; y += 8) {
        ctx.putImageData(topWallPatch, 1160, y);
      }

      // Also clean the top thin line on the dark arch area (x=800..1150, y=32..42):
      const topArchPatch = ctx.getImageData(800, 55, 350, 10);
      ctx.putImageData(topArchPatch, 800, 32);

      // Also output standalone mobile/isolated architectural crop:
      const c2 = document.getElementById('c2');
      const ctx2 = c2.getContext('2d');
      ctx2.drawImage(c, 800, 0, 872, 690, 0, 0, 872, 690);

      resolve();
    };
    img.src = 'data:image/png;base64,' + data;
  });
}, b64);

const outArch = await page.evaluate(() => {
  const c2 = document.getElementById('c2');
  return c2.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
});

fs.writeFileSync('public/images/contact-arch.png', Buffer.from(outArch, 'base64'));
console.log('Saved contact-arch.png successfully!');
await browser.close();
