[🇩🇪 Zur deutschen Version wechseln](README.md)

# Objects!
## Interactive Object-Oriented Programming for Computer Science Education

[![GitHub Release](https://img.shields.io/github/v/release/chriswainformatik/objects?color=blue&style=flat-square)](https://github.com/chriswainformatik/objects/releases)
[![Live Demo](https://img.shields.io/badge/Demo-Launch_Objects!-brightgreen?style=flat-square&logo=github)](https://chriswainformatik.github.io/objects/)

Objects! is an interactive, browser-based educational tool designed to provide a hands-on introduction to object-oriented programming (OOP) concepts and notations. With Objects!, users can create graphic objects via simple text commands and manipulate them using method calls. The immediate effects of commands are visualized in real time on a drawing canvas and tracked via interactive object cards.

![Objects! Screenshot](objects-screenshot.png)

---

## 🚀 Quick Start

You can use Objects! directly in your web browser without any installation:

**[Launch Objects! Web App](https://chriswainformatik.github.io/objects/)**

---

## ✨ Key Features

- **Visual Canvas & Object Cards:** See graphical changes instantly and inspect object states on detailed cards.
- **Educational Syntax & Guidance:**
  - `dach:DREIECK` — Instantiates object `dach` of class `DREIECK` and renders it.
  - `dach.PositionSetzen(100, 200)` — Modifies attribute values and updates canvas position.
- 🔍 **Integrated Help:** View all available classes, attributes, and methods within the app.
- **Smart Error Handling:** Provides user-friendly error messages with actionable hints to resolve syntax errors.
- **Developer Experience:**
  - Intelligent code autocompletion.
  - Toggleable grid overlay and coordinate rulers.
- **Persistence & Exporting:**
  - Local storage for user settings.
  - Load/Save programs from/to local files.
  - Export execution sequences as video files.

---

## 🛠️ Self-Hosting

### Option 1: Manual Installation
1. Download the latest release from the [Releases](https://github.com/chriswainformatik/objects/releases) page.
2. Unpack the archive into a subfolder on your web server or a local directory.
3. For local usage: Open `index.html` directly in your browser.

### Option 2: Installation Script
Run the automated installation script via bash:
```bash
curl -sSL [https://raw.githubusercontent.com/chriswainformatik/objects/main/install.sh](https://raw.githubusercontent.com/chriswainformatik/objects/main/install.sh) | bash
```

---

## 🗺️ Roadmap
 - [ ] Additional methods (e.g., animated movement)
 - [ ] Object visibility controls (show / hide)
 - [ ] Object grouping & compound shapes
 - [ ] Stage/Canvas management object (e.g., background manipulation)
 - [ ] Control structures (loops, conditional branching)
