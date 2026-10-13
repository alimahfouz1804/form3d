# Form3D

A responsive portfolio for the Lebanese 3D printing and molds designing studio.

## Website files

This folder is the complete website. It uses HTML5, CSS3, and vanilla JavaScript only. No framework, package installation, build step, database, or backend is required.

- `index.html`: Home, studio, portfolio, Start Your Project, and contact.
- `christmas.html`: Separate Christmas collection with snowfall and a pause control.
- `styles.css`: Shared responsive styling and reduced-motion support.
- `script.js`: Navigation, filters, image viewer, introduction, reveals, and snowfall.
- `config.js`: Official Instagram URL.
- `assets/`: All original supplied photographs, the logo, and favicon.

Open `index.html` in a modern browser for a local preview, or upload this folder's website files to any static website host. Both pages must remain in the same folder with their supporting files.

## Contact integrations

The site links to the original Google Form without changing it. WhatsApp uses +96171183679 with the exact requested pre-filled message; clicking it opens WhatsApp without sending a message automatically. Telephone links use `tel:+96171183679`. Instagram uses the official URL supplied during this chat.

## Brand and photography

All four supplied JPG files are preserved byte-for-byte. Core navy `#19283F` and turquoise `#38E2DF` were sampled directly from the shaded logo photograph. The supporting navy `#2F4C74` was also sampled from it. The darker teal used for text improves legibility. A photographed logo contains lighting variations, so these samples are not a substitute for a formal brand-color specification.

Portfolio photographs have visible display watermarks, disabled dragging and basic selection, and scoped context-menu deterrents. These front-end measures discourage casual copying; they cannot prevent screenshots or extraction of public image files. The photo viewer displays complete images; Christmas detail cards are CSS crops of the supplied photograph.

## Accessibility and motion

The site includes keyboard navigation, a skip link, visible focus states, image descriptions, an Escape-dismissable native image dialog, and mobile navigation with expanded state. Reduced-motion settings disable the introduction, snowfall, parallax, smooth scrolling, and decorative animation. Snow can also be paused manually. Page content remains present without JavaScript.

## Updating

Edit the two HTML files to update copy and links; replace images in `assets` while retaining their filenames to refresh the photography. Update Instagram in both HTML files and `config.js` so it works with and without JavaScript. No e-commerce or account functionality is included.
