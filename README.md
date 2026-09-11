# Black Sheep Designs

A responsive React implementation of the supplied hero, philosophy, and “One Studio. Many Worlds.” references. Vite, Tailwind CSS, Framer Motion, and Lucide React.

```sh
npm install
npm run dev
```

`npm run build` creates the production build. `npm run preview` serves it.

The interior asset is a clean background plate derived from the supplied reference; all typography, navigation, icons, and controls are live HTML/SVG. Desktop preserves the reference composition; mobile uses a separate editorial flow. Animations respect reduced-motion preferences, and dialogs support keyboard focus and Escape.

Sections 01–06 are implemented; there is no Section 07. About and the hero scroll control navigate to Philosophy. Our Approach focuses the first principle. Work, Services, and Explore focus the hero service navigation. Other hero links and service buttons open provisional editorial dialogs. The story control opens a clearly labeled coming-soon dialog because no video was provided.

Section 02 uses independently positioned SVG viewBox fragments of a clean photographic plate derived from the supplied reference. Headings, copy, annotations, rules, and controls are live elements. Fonts are local. Desktop preserves the asymmetric spread; mobile uses a sequential editorial layout. Scroll reveals and subtle parallax respect reduced-motion preferences.

Browser checks: `node scripts/check-philosophy.mjs` with a local preview on port 5180. Set `PREVIEW_URL` for another URL and optionally `CHROMIUM_PATH` for an existing Chromium installation.

Section 03 is implemented in `src/Worlds.jsx` and `src/worlds.css`. Six live service rows control their corresponding photographic fragments on hover and keyboard focus. Activating a row or image opens a keyboard-accessible image preview. Mobile presents alternating service/image sequences. Desktop includes staggered reveals, restrained scroll parallax, photographic velvet and stone, handwritten annotations, and faint oversized brand lettering. The source is a clean asset plate derived from the supplied visual; these are presentation images, not linked case studies.

Run `node scripts/check-worlds.mjs` to check five viewport sizes, all six keyboard interactions, image previews, Escape dismissal, linked hover states, clipped headings, and reduced-motion visibility.

Section 04, “From Idea to Atmosphere,” lives in `src/Process.jsx` and `src/process.css`. Five image-free stages follow a drawn SVG journey, horizontal on desktop and vertical on mobile. The bronze arrow buttons focus the next stage (and scroll to it on mobile). Stage hover and keyboard focus highlight the number, heading, micro label, and desktop line segment. Fabric and stone are decorative assets isolated from the supplied reference. Reveals and parallax honor reduced-motion preferences.

Run `node scripts/check-process.mjs` for five viewport checks, verification that stages contain no images, reveal visibility, all four next-stage buttons, keyboard focus, and reduced-motion visibility.

Section 05, “You Can Almost Feel It,” is in `src/Language.jsx` and `src/language.css`. One reference-derived, text-free photographic still life is rendered through SVG masks for restrained staged reveals and material highlights. All six numbered labels, descriptors, connector lines, and other typography are real UI. Desktop and tablet connectors point to the corresponding material; mobile presents the single grouped still life followed by a six-item index. Keyboard focus on each label highlights its material, with reduced-motion support throughout.

Run `node scripts/check-language.mjs` to verify five viewport sizes, six labels, entrance visibility, linked keyboard highlights, headline clipping, and reduced-motion visibility.

Section 06, Selected Work, is in `src/SelectedWork.jsx` and `src/selected-work.css`. Five bespoke SVG paths preserve the reference’s flowing gallery silhouette and cream ribbon. Project copy, numbers, gold line, Explore control, and annotations are live UI over a text-free reference-derived asset. Explore focuses Residential; each project opens an accessible image preview, not a fabricated case study. Tablet repositions the sculptural composition; mobile presents individually shaped editorial images. Animation respects reduced-motion preferences.

Run `node scripts/check-selected-work.mjs` for five responsive viewport checks, all five previews, Escape dismissal, Explore focus, heading clipping, entrance visibility, and reduced-motion visibility.
