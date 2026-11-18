# WanderWise — Travel Planning Platform

A standalone, multi-page front-end project for the experiment:

**Static Website Design: Introduction to frontend and backend technologies, HTML5 and CSS3 fundamentals.**

## Pages included

1. `index.html` — Home page with hero section, featured travel themes and process overview.
2. `destinations.html` — Destination cards with working category filters.
3. `planner.html` — Trip-planning form, date validation, saved trip summary and clear option.
4. `about.html` — Project introduction and travel philosophy.
5. `contact.html` — Contact form with browser-side validation and demo confirmation.

## Folder structure

```text
travel-planning-platform/
│
├── index.html
├── destinations.html
├── planner.html
├── about.html
├── contact.html
├── README.md
│
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── hero-landscape.svg
        ├── hero-city.svg
        ├── hero-coast.svg
        ├── mountains.svg
        ├── coast.svg
        ├── city.svg
        ├── lake.svg
        ├── island.svg
        └── oldtown.svg
```

## Run using Visual Studio Code

1. Extract the ZIP file.
2. Open the extracted `travel-planning-platform` folder in Visual Studio Code.
3. Open `index.html`.
4. Run it using the **Live Server** extension (recommended), or open `index.html` directly in a browser.

No build command, package installation, database, backend server or internet connection is required.

## Features demonstrated

- Semantic HTML5 structure (`header`, `nav`, `main`, `section`, `article`, `footer`).
- External CSS stylesheet with responsive layouts and media queries.
- External JavaScript file for menu, filtering, form validation and trip-plan storage.
- Local image assets stored inside `assets/images`.
- Relative file paths only; no remote image URLs or runtime API calls.
- Browser `localStorage` to retain the latest trip plan on the same browser/device.

## Important note about images and external services

All illustrations are included locally in `assets/images` as SVG image files. They are self-contained project assets, not externally hosted images. Typography uses local system font fallbacks. No external font, image, script, API or CDN is required.

The contact form is a front-end demonstration only. It does not send messages to an email address or server.
