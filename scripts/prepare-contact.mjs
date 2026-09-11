import fs from 'node:fs';
import { chromium } from '@playwright/test';

const refPath = 'C:/Users/rayaa/Downloads/ChatGPT Image Sep 10, 2026, 01_40_00 PM.png';
const b64 = fs.readFileSync(refPath).toString('base64');

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
});

const page = await browser.newPage();
await page.setContent('<canvas id="c" width="1672" height="941"></canvas>');

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

      // Create an offscreen canvas for the smooth background
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = W;
      bgCanvas.height = H;
      const bgCtx = bgCanvas.getContext('2d');

      const fullGrad = bgCtx.createLinearGradient(0, 0, W, 0);
      fullGrad.addColorStop(0, '#210407');
      fullGrad.addColorStop(0.2, '#31070d');
      fullGrad.addColorStop(0.42, '#3a0810');
      fullGrad.addColorStop(0.5, '#2c060b');
      fullGrad.addColorStop(0.65, '#220407');
      fullGrad.addColorStop(1, '#1b0305');
      bgCtx.fillStyle = fullGrad;
      bgCtx.fillRect(0, 0, W, H);

      // Add warm radial glow on left side
      const rad = bgCtx.createRadialGradient(380, 360, 40, 380, 360, 480);
      rad.addColorStop(0, 'rgba(88, 15, 24, 0.42)');
      rad.addColorStop(0.5, 'rgba(55, 10, 15, 0.18)');
      rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      bgCtx.fillStyle = rad;
      bgCtx.fillRect(0, 0, W, H);

      // Bottom background (contact bar & giant typography):
      const bottomGrad = bgCtx.createLinearGradient(0, 680, 0, H);
      bottomGrad.addColorStop(0, 'rgba(28, 4, 6, 0)');
      bottomGrad.addColorStop(0.04, '#1c0406');
      bottomGrad.addColorStop(0.2, '#180305');
      bottomGrad.addColorStop(1, '#120204');
      bgCtx.fillStyle = bottomGrad;
      bgCtx.fillRect(0, 680, W, H - 680);

      const origCanvas = document.createElement('canvas');
      origCanvas.width = W;
      origCanvas.height = H;
      const origCtx = origCanvas.getContext('2d');
      origCtx.drawImage(c, 0, 0);

      // Clear main canvas with the clean background
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(bgCanvas, 0, 0);

      // Apply gradient mask to original image before drawing over bgCanvas
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = W;
      maskCanvas.height = H;
      const maskCtx = maskCanvas.getContext('2d');

      // Horizontal mask (left transition around x=780..815)
      const hMask = maskCtx.createLinearGradient(780, 0, 818, 0);
      hMask.addColorStop(0, 'rgba(0,0,0,0)');
      hMask.addColorStop(1, 'rgba(0,0,0,1)');
      maskCtx.fillStyle = hMask;
      maskCtx.fillRect(780, 0, 892, 685);

      // Floor vertical transition (y=675..690)
      const vMask = maskCtx.createLinearGradient(0, 675, 0, 690);
      vMask.addColorStop(0, 'rgba(0,0,0,1)');
      vMask.addColorStop(1, 'rgba(0,0,0,0)');
      maskCtx.fillStyle = vMask;
      maskCtx.fillRect(780, 675, 892, 18);

      // Combined composite:
      origCtx.globalCompositeOperation = 'destination-in';
      origCtx.drawImage(maskCanvas, 0, 0);

      // Draw the masked architectural scene over the clean background
      ctx.drawImage(origCanvas, 0, 0);

      // Add gentle warm floor kick at base of dark ribbed divider (x=810..870, y=680..695)
      const kick = ctx.createRadialGradient(840, 688, 2, 840, 688, 55);
      kick.addColorStop(0, 'rgba(215, 160, 95, 0.45)');
      kick.addColorStop(0.35, 'rgba(150, 90, 45, 0.2)');
      kick.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = kick;
      ctx.fillRect(780, 655, 120, 50);

      resolve();
    };
    img.src = 'data:image/png;base64,' + data;
  });
}, b64);

const outB64 = await page.evaluate(() => {
  const c = document.getElementById('c');
  return c.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
});

fs.writeFileSync('public/images/contact-clean-plate.png', Buffer.from(outB64, 'base64'));
console.log('Feathered public/images/contact-clean-plate.png successfully without ghost text!');
await browser.close();
