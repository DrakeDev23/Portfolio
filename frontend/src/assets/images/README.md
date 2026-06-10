# Image Assets

## Directory Structure

```
src/assets/images/
├── avatar.jpg               ← Hero section profile photo (recommended: square, min 400×400px)
│
├── projects/
│   ├── securevault.jpg      ← SecureVault project screenshot (16:9 ratio recommended)
│   ├── netsweep.jpg         ← NetSweep project screenshot
│   ├── portfolioos.jpg      ← PortfolioOS screenshot
│   ├── ctf-toolkit.jpg      ← CTF Toolkit screenshot
│   └── threatmap.jpg        ← ThreatMap screenshot
│
└── events/
    ├── dict-summit.jpg      ← DICT Cybersecurity Summit photo (16:9 ratio recommended)
    ├── pycon-ph.jpg         ← PyCon Philippines photo
    ├── devfest-cebu.jpg     ← DevFest Cebu photo
    ├── hackforgov.jpg       ← HackForGov CTF photo
    ├── it-congress.jpg      ← IT Congress BSIT photo
    └── csmonth.jpg          ← National Cybersecurity Month photo
```

## Notes

- All images render with a graceful fallback placeholder when the file is missing.
- Recommended formats: `.jpg` or `.webp` for photos.
- Project images: 16:9 aspect ratio works best.
- Event images: 16:9 aspect ratio works best.
- Avatar: square (1:1) works best, the component applies `object-cover` inside a circle.
