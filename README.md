# Ink Spill

Focus writing w/ pomodoro timer

## Technologies:

- HTML, CSS, JS
- Material theme


## Features:

> [!IMPORTANT]  
> NO backend, no auth, no database; nothing is stored after closing/refreshing ..

- Writing area:
    - toggle between plain text and markdown-ish editing?
    - a simple toolbar (bold, italic, headings, bullet list, etc.?) with Markdown support (?) into the text

- Anti-loss:
    - don’t persist to storage/cache
    - block accidental page unload by showing a “Leave site?” prompt when there’s text0
    - No form submission, no automatic refresh

- Export:
    - Export as:
        - .txt
        - .md
        - .html (Word/Docs can import?)
        - .pdf -- via the browser print dialog (simple)
        - “Email to myself” -- opens a mailto: link with the content in the body?

- Pomodoro:
    - customizable work/break lengths
    - unique twist: when you leave the tab while a session is running, a small floating “pop-out” timer appears and continues counting (you can later refine with notifications)

- Custom Aesthetics:
    - palette presets based on your sets
    - button shape presets: 
        - default, circle, flower, star, rocket, pen -- do via border-radius/clip-path

