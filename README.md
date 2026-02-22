# [<img src="https://img.icons8.com/?size=100&id=hGBTBdUownyO&format=png&color=000000" alt="Icon" style="width:7%;height:auto;filter: invert(1);">](https://img.icons8.com/?size=100&id=hGBTBdUownyO&format=png&color=000000) Ink Pot.

**Ink Pot.** is a focused writing space with a built‑in Pomodoro timer and intuitive visual customization. It’s designed to make it a little easier to sit down, stay on track, and actually finish what you’re writing.

## Demo

Deployed Site: [Ink Pot.](https://ink-pot.vercel.app/)

Demo:

![]()

## Overview 

People often intend to “just write for a bit,” but lose time switching between timer apps, note editors, and browser tabs. This switching makes it harder to get started and to maintain a focused session.

**Ink Pot.** runs entirely in the browser and does not require an account or backend. It combines three ideas in one small, user-friendly page:

- A distraction‑light rich‑text editor

- A compact Pomodoro timer that lives where you write

- Simple and intuitive UX/UI for a pleasant and productive environment

The goal is not to be a full document editor, but a simple, approachable tool that helps someone write for 25 minutes without wandering off.

## Tech Stack

- HTML
- CSS
- JavaScript (no frameworks, no build tools)
- Browser APIs
- Vercel

## Getting Started

You can run **Ink Pot.** locally with just a browser.

1. Download or clone this repository.
```
git clone https://github.com/wong-ja/ink-pot.git
```
2. Open `index.html` in a browser.
3. Start typing in the main editor area.
4. Use the toolbar to format text and control the Pomodoro timer.
5. Export or email your writing when you’re done with a session.

## Usage

1. **Set up your space**
   - (Optional) Open the Settings menu in the top bar to choose a color palette, button shape, and theme (light/dark).
   - Turn on “Save Draft” if you want the browser to remember your current work.

2. **Write**
   - Type directly into the main writing area.
   - Use the toolbar buttons or keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z, Ctrl+Y) for formatting.

3. **Focus with the Pomodoro timer**
   - In the toolbar, set sprint and break lengths.
   - Press play to start a sprint, pause if you need a break, and reset to go back to your default sprint length.
   - When you switch tabs, a small floating timer appears to show the remaining time.

4. **Save or share your work**
   - Export as `.txt`, `.md`, or `.html`, or use the PDF (print) option.
   - Use the Email button to open an email draft with your text in the body.


## Features

> [!IMPORTANT]
> No backend, no auth, no database. Everything runs in the browser.

### Writing experience

- Rich-text editor with:
  - Bold, italic, underline
  - Headings (H1, H2)
  - Bullet and numbered lists
- Keyboard shortcuts for common actions:
  - Formatting (e.g. Ctrl+B, Ctrl+I, Ctrl+U)
  - Undo / redo (Ctrl+Z / Ctrl+Y)
- Live word and character count

### Safety and drafts

- Optional “Save Draft” toggle:
  - Saves title and content to `localStorage`
  - Draft can be cleared from the settings panel
- “Leave site?” warning when there is unsaved text, to help prevent accidental loss

### Export and sharing

- Export current document as:
  - Plain text (`.txt`)
  - Markdown‑friendly plain text (`.md`)
  - Self‑contained HTML file (`.html`) with basic styling
- “Print to PDF” via the browser’s print dialog
- Email integration:
  - Opens a mail draft with the content in the body via `mailto:`

### Focus and timing

- Compact Pomodoro timer embedded in the editor toolbar:
  - Adjustable sprint and break lengths
  - Start, pause, and reset controls
- Floating mini‑timer:
  - Appears when the tab is hidden, so you can still see the remaining time

### Look and feel

- Palette presets to change the overall mood of the page
- Button shape presets (e.g. default, playful shapes) for a more personal UI
- Light/dark theme toggle

### Future ideas (not implemented yet)

- “Focus Playlist” media button in the top bar:
  - Intended to open a public Spotify or YouTube playlist for background music
  - The button is present but disabled in this version
- Add optional session stats (e.g., number of sprints completed), progress/habit tracker.
- More layout options for the editor (e.g., narrow column vs. full width).
- Simple theme editor for custom palettes.
