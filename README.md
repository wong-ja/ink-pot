# Ink Spill

Focus writing w/ pomodoro timer

- [x] rename to inkpot? Ink Pot. 

## Technologies:

- HTML, CSS, JS
- Material theme


## Features:

> [!IMPORTANT]  
> NO backend, no auth, no database; nothing is stored after closing/refreshing ..

- Writing area:
    - ~~toggle between plain text and markdown-ish editing?~~
    - a simple toolbar (bold, italic, headings, bullet list, etc.?) ~~with Markdown support (?) into the text~~

- Anti-loss:
    - ~~don’t persist to storage/cache~~
    - localStorage drafts (toggle-able)
    - block accidental page unload by showing a “Leave site?” prompt when there’s text0
    - No form submission, no automatic refresh

- Keyboard shortcuts (Ctrl+B, etc.)



- Export:
    - Export as:
        - .txt
        - ~~.md~~
        - .html
        - Word, Docs
        - .pdf -- via the browser print dialog (simple)
        - Email -- opens mailto

- Pomodoro:
    - customizable sprint/break lengths
    - floating “pop-out” timer in tab switching (tbd, work on implementation logic)

- Custom Aesthetics:
    - palette presets
    - button shape presets: 
        - default, flower, rocket, pen
