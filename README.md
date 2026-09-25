# CodeSnippet Vault

```text
   ____          _        _____       _                    _     __      __             _ _   
  / ____|        | |      / ____|     (_)                  | |    \ \    / /            | | |  
 | |     ___   __| | ___ | (___  _ __  _ _ __  _ __   ___ _| |_    \ \  / /_ _ _   _   | | |_ 
 | |    / _ \ / _` |/ _ \ \___ \| '_ \| | '_ \| '_ \ / _ \_   _|    \ \/ / _` | | | | | | | __|
 | |___| (_) | (_| |  __/ ____) | | | | | |_) | |_) |  __/ | |_      \  / (_| | |_| |_| | |_ 
  \_____\___/ \__,_|\___||_____/|_| |_|_| .__/| .__/ \___|  \__|      \/ \__,_|\__,_(_)_|\__|
                                        | |   | |                                             
                                        |_|   |_|                                             
```

<div align="center">

[![React](https://img.shields.io/badge/React-18%2F19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![Prism.js](https://img.shields.io/badge/Prism.js-Syntax_Highlighting-orange?style=for-the-badge&logo=javascript&logoColor=white)](https://prismjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Build-Production_Ready-brightgreen?style=for-the-badge)]()

**A minimalist, high-velocity developer productivity tool for storing, organizing, searching, and managing code snippets.**  
*Crafted as a modern blend of GitHub Gists, VS Code, Raycast, and Linear.*

[Live Demo](#live-demo) • [Key Features](#-core-features) • [Keyboard Shortcuts](#-keyboard-shortcuts) • [Architecture](#-architecture--folder-structure) • [Getting Started](#-getting-started)

</div>

---

## 🌟 Executive Summary

**CodeSnippet Vault** is an offline-first developer productivity web application tailored for software engineers, competitive programmers, and technical interview candidates. Designed with strict developer aesthetics, it marries the distraction-free minimalism of **Linear**, the command-driven velocity of **Raycast**, and the syntax fidelity of **VS Code**.

Every snippet is stored directly in your browser's Local Storage — meaning zero external dependencies, zero latency, and absolute privacy with 100% offline capability.

---

## 🚀 Core Features

### 💻 Snippet Management
* **Instant Creation & Editing:** Create and edit snippets with syntax-highlighted editor inputs, indentation support (`Tab` key creates 2 spaces), and keyboard triggers (`Ctrl + Enter` to save).
* **One-Click Duplication:** Instantly clone any snippet with metadata preservation.
* **Safe Deletion:** Red-flagged confirmation modal preventing accidental data loss.
* **Raw Code Download:** Export individual snippets directly as source files (`.js`, `.ts`, `.py`, `.sql`, `.cpp`, `.java`, etc.).

### 🔍 Real-Time Multi-Token Search & Command Palette
* **Fuzzy Corpus Matching:** Search simultaneously across titles, descriptions, code syntax, tags, and languages.
* **Raycast-Style Command Palette (`Ctrl + K` / `Ctrl + F`):** Instant spotlight modal with keyboard navigation (`↑`, `↓`, `Enter`) for split-second snippet retrieval.
* **Instant Filtering:** Zero page reloads; updates dynamically at 60 FPS.

### 🎨 VS Code Syntax Highlighting & Line Numbers
* **Integrated Prism Grammars:** Full lexical tokenization for JavaScript, TypeScript, Python, React JSX, SQL, HTML, CSS, C++, Java, and Node.js, with custom language support.
* **Line Number Gutters:** Clean, unselectable gutter numbers matching modern dark IDE themes.
* **Word Wrap Toggle:** Seamlessly switch between fixed horizontal scrolling and responsive word wrapping.

### 🏷️ Multi-Tag Explorer & Categorization
* **Dynamic Tag Clouds:** Real-time frequency analytics for topics such as `DSA`, `Algorithms`, `React`, `Hooks`, `SQL`, `Interview`, and `API`.
* **Intersection Filtering:** Filter snippets by combining tag chips with search queries and language selectors.

### 📊 Modern Dashboard Analytics
* **Metric Cards:** Real-time count of total snippets, favorites, active languages, and tags.
* **Language Distribution Bar:** Multi-segment progress visualizer showing your vault's stack distribution.
* **Deep Vault Insights:** Aggregated metrics for total lines of code stored, total characters, average snippet length, and dominant tags.
* **Recent Activity Feed:** Instant timeline of latest modified code patterns.

### 💾 100% Local Storage & Data Mobility
* **Zero Telemetry / Offline-First:** Operates completely in the client's browser with no external servers.
* **JSON Export:** Download your entire repository as a structured, portable backup file (`.json`).
* **JSON Import:** Restore or merge backups with built-in schema validation and ID deduplication.

### 🌓 Developer Themes (Dark / Light)
* **VS Code Obsidian Dark Theme:** Default dark mode inspired by VS Code and Linear with glowing accents.
* **Modern Slate Light Theme:** High-contrast daylight theme.
* **System Preference Detection:** Automatically detects `prefers-color-scheme` with manual toggle fallback.

### 📱 Responsive & Touch Optimized
* **Adaptive Navigation:** Collapsible sidebar on desktop, slide-out drawer on tablets, and thumb-friendly bottom navigation bar on mobile devices.
* **Smooth Framer Motion Interactions:** Subtle page fades, modal zoom-in transitions, and interactive toast notifications.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>N</kbd> / <kbd>⌘</kbd> + <kbd>N</kbd> | Open New Snippet Creation Modal | Global |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> | Open Command Palette / Global Search | Global |
| <kbd>Ctrl</kbd> + <kbd>F</kbd> / <kbd>⌘</kbd> + <kbd>F</kbd> | Focus Search Engine | Global |
| <kbd>Ctrl</kbd> + <kbd>Enter</kbd> / <kbd>⌘</kbd> + <kbd>Enter</kbd> | Submit & Save Snippet Form | Modal Editor |
| <kbd>Tab</kbd> | Insert 2-Space Soft Tab | Code Editor |
| <kbd>Esc</kbd> | Close Modal / Clear Search | Modals & Search |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate Search Results | Command Palette |
| <kbd>Enter</kbd> | Select / Inspect Snippet | Command Palette |

---

## 📁 Architecture & Folder Structure

```text
src/
├── assets/                  # Static media, icons, and SVG emblems
├── components/
│   ├── common/              # Reusable atomic design system components
│   │   ├── Badge.jsx        # Colored category and tag pills
│   │   ├── Button.jsx       # Linear-style micro-animated buttons
│   │   ├── Card.jsx         # Glassmorphic container with glow borders
│   │   ├── CodeViewer.jsx   # Syntax-highlighted code block with line gutters
│   │   ├── CommandPaletteModal.jsx # Raycast-style spotlight search
│   │   ├── ConfirmModal.jsx # Destructive action confirmation dialog
│   │   ├── EmptyState.jsx   # Friendly empty illustrations & CTAs
│   │   ├── Input.jsx        # Monospace & sans-serif inputs with focus rings
│   │   ├── PageTransition.jsx # Framer Motion subtle route transitions
│   │   ├── SearchBar.jsx    # Real-time search bar with clear button
│   │   ├── ThemeToggle.jsx  # Dark/Light theme morphing toggle
│   │   └── Toast.jsx        # Notification popups
│   ├── dashboard/           # Analytics & metric widgets
│   │   ├── FavoritesWidget.jsx     # Quick access favorite snippets
│   │   ├── LanguageDistribution.jsx# Stack percentage breakdown
│   │   ├── QuickActions.jsx        # One-click workflow triggers
│   │   ├── RecentSnippets.jsx      # Latest activity feed
│   │   ├── StatCard.jsx            # Individual stat metric card
│   │   ├── StatsGrid.jsx           # 4-column metric grid
│   │   └── VaultInsights.jsx       # Code volume and line counter analytics
│   ├── forms/               # Creation and editing form modals
│   │   ├── SnippetForm.jsx         # Form with live line counting & tab indenting
│   │   └── SnippetFormModal.jsx    # Accessible modal wrapper
│   ├── layout/              # Responsive application shell
│   │   ├── AppLayout.jsx           # Shell container with sticky navbar
│   │   ├── MobileBottomNav.jsx     # Mobile bottom drawer bar
│   │   ├── Navbar.jsx              # Command trigger, theme toggle, and actions
│   │   └── Sidebar.jsx             # Collapsible primary navigation
│   └── snippets/            # Snippet listing and display components
│       ├── FilterBar.jsx           # Language filter pills and sorters
│       ├── SnippetCard.jsx         # Grid & List view card with code preview
│       └── SnippetDetailModal.jsx  # Fullscreen code inspector & file exporter
├── constants/               # Supported languages, themes, and storage keys
├── context/                 # React Contexts (ToastContext, ThemeContext)
├── data/                    # Initial curated seed snippets
├── hooks/                   # Custom React hooks (useLocalStorage)
├── pages/                   # Views (Dashboard, Snippets, Favorites, Tags, Languages)
├── services/                # LocalStorage persistence, validation, JSON import/export
├── utils/                   # Clipboard, formatters, and search engine
├── App.jsx                  # Main orchestration component
├── index.css                # Tailwind base and VS Code dark theme rules
└── main.jsx                 # Application entry point
```

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 18 / 19 + Vite
* **Styling & Design System:** Tailwind CSS (VS Code Dark Theme, Linear Minimalist Slate)
* **Animation & Micro-interactions:** Framer Motion
* **Iconography:** React Icons (Feather Icons & VS Code Icons)
* **Syntax Highlighting:** Prism.js (Custom VS Code dark syntax palette)
* **Storage Engine:** HTML5 Local Storage with JSON Backup / Restore
* **Package Manager:** NPM

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AlaminM01/CodeSnippet-Vault.git
   cd CodeSnippet-Vault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🗺️ Future Roadmap

- [ ] **Gist Synchronization:** Optional two-way synchronization with GitHub Gists.
- [ ] **Folder Collections:** Multi-level folder nesting for large engineering teams.
- [ ] **Snippet Run Sandbox:** Integrated WebAssembly runtime to execute JavaScript/Python snippets in-browser.
- [ ] **OCR Code Scanner:** Paste an image or screenshot of code to automatically extract text into a snippet.

---

## 🤝 Contributing

Contributions make the developer community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Alamin Mondal**  
* GitHub: [@AlaminM01](https://github.com/AlaminM01)
* Email: [alaminmondal297@outlook.com](mailto:alaminmondal297@outlook.com)

---

<div align="center">
  <sub>Built with ❤️ for developers by developers. Inspired by Linear, Raycast, and VS Code.</sub>
</div>
