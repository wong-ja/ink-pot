const root = document.documentElement;
const app = document.getElementById('app');
const paletteSelect = document.getElementById('paletteSelect');
const shapeSelect = document.getElementById('shapeSelect');

function applyPalette(value) {
    app.classList.remove('palette1', 'palette2', 'palette3');
    app.classList.add(value);
}

function applyShape(value) {
    app.classList.remove(
        'shape-default',
        'shape-circle',
        'shape-flower',
        'shape-star',
        'shape-rocket',
        'shape-pen'
    );
    app.classList.add(`shape-${value}`);
}

paletteSelect.addEventListener('change', e => {
    applyPalette(e.target.value);
});

shapeSelect.addEventListener('change', e => {
    applyShape(e.target.value);
});

// init
applyPalette('palette1');
applyShape('default');


// editor & toolbar
const editor = document.getElementById('editor');
const titleInput = document.getElementById('docTitle');
const toolbarButtons = document.querySelectorAll('.toolbar .action-btn');
const modeRadios = document.querySelectorAll('input[name="mode"]');

let currentMode = 'plain';

modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        currentMode = document.querySelector('input[name="mode"]:checked').value;
    });
});

function wrapSelection(before, after = before) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const value = editor.value;
    const selected = value.slice(start, end);
    const newText = before + selected + after;
    editor.setRangeText(newText, start, end, 'end');
    editor.focus();
}

function prefixLine(prefix) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const value = editor.value;

    // get start of line
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = value.indexOf('\n', end);
    const realLineEnd = lineEnd === -1 ? value.length : lineEnd;

    const before = value.slice(0, lineStart);
    const line = value.slice(lineStart, realLineEnd);
    const after = value.slice(realLineEnd);

    const newLine = line.startsWith(prefix) ? line : prefix + line;
    editor.value = before + newLine + after;

    // restore cursor near end of modified line
    const newPos = before.length + newLine.length;
    editor.selectionStart = editor.selectionEnd = newPos;
    editor.focus();
}

toolbarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (currentMode === 'plain' && action !== 'bold' && action !== 'italic') {
            // in plain mode, only allow basic bold/italic markers to keep it simple
            if (action === 'bold') wrapSelection('**', '**');
            if (action === 'italic') wrapSelection('_', '_');
            return;
        }

        switch (action) {
            case 'bold':
                wrapSelection('**', '**');
                break;
            case 'italic':
                wrapSelection('_', '_');
                break;
            case 'h1':
                prefixLine('# ');
                break;
            case 'h2':
                prefixLine('## ');
                break;
            case 'bullet':
                prefixLine('- ');
                break;
            case 'code':
                wrapSelection('`', '`');
                break;
            case 'quote':
                prefixLine('> ');
                break;
            default:
                break;
        }
    });
});


// EXPORT helpers
function getContentAndTitle() {
    const content = editor.value;
    let title = titleInput.value.trim();
    if (!title) title = 'ink-spill';
    return { content, title };
}

function downloadFile(filename, mime, text) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Email
const emailBtn = document.getElementById('emailBtn');
emailBtn.addEventListener('click', () => {
    const { content, title } = getContentAndTitle();
    const subject = encodeURIComponent(`Ink Spill: ${title}`);
    const body = encodeURIComponent(content);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// export btns
document.querySelectorAll('[data-export]').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.export;
        const { content, title } = getContentAndTitle();

        if (type === 'txt') {
            downloadFile(`${title}.txt`, 'text/plain;charset=utf-8', content);
        }

        if (type === 'md') {
            downloadFile(`${title}.md`, 'text/markdown;charset=utf-8', content);
        }

        if (type === 'html') {
            const html = `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>${title}</title>
                </head>
                <body>
                <pre style="white-space: pre-wrap; font-family: sans-serif;">${content
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')}</pre>
                </body>
                </html>`;
            downloadFile(`${title}.html`, 'text/html;charset=utf-8', html);
        }
    });
});

// PDF (open print dialog)
const pdfBtn = document.getElementById('pdfBtn');
pdfBtn.addEventListener('click', () => {
    const { content, title } = getContentAndTitle();
    const w = window.open('', '_blank');
    if (!w) return;

    const safe = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>');

    w.document.write(`
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
                body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    padding: 2rem;
                    white-space: normal;
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div>${safe}</div>
            <script>
                window.onload = function() {
                    window.print();
                }
            <\\/script>
        </body>
        </html>
    `);
    w.document.close();
});


// prevent accidental refresh
let hasTyped = false;

editor.addEventListener('input', () => {
    hasTyped = editor.value.trim().length > 0;
});

window.addEventListener('beforeunload', e => {
    if (hasTyped) {
        e.preventDefault();
        e.returnValue = '';
    }
});


// pomodoro 
const timerLabel = document.getElementById('timerLabel');
const timerClock = document.getElementById('timerClock');

const sprintInput = document.getElementById('sprintInput');
const breakInput = document.getElementById('breakInput');

const startBtn = document.getElementById('startTimerBtn');
const pauseBtn = document.getElementById('pauseTimerBtn');
const resetBtn = document.getElementById('resetTimerBtn');

let isRunning = false;
let isSprint = true;
let remainingSeconds = 25 * 60;
let timerInterval = null;

function updateClockDisplay() {
    const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const secs = String(remainingSeconds % 60).padStart(2, '0');
    timerClock.textContent = `${mins}:${secs}`;
    floatingClock.textContent = timerClock.textContent;
}

function updateLabels() {
    timerLabel.textContent = isSprint ? 'Sprint' : 'Break';
    floatingLabel.textContent = timerLabel.textContent;
}

function startTimer() {
    if (isRunning) return;

    // if just starting a new cycle, set seconds from inputs
    if (!timerInterval && remainingSeconds <= 0) {
        const sprintMin = parseInt(sprintInput.value, 10) || 25;
        const breakMin = parseInt(breakInput.value, 10) || 5;
        remainingSeconds = (isSprint ? sprintMin : breakMin) * 60;
    }

    isRunning = true;

    timerInterval = setInterval(() => {
        remainingSeconds -= 1;
        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            updateClockDisplay();
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;

            // switch session, autostart next
            isSprint = !isSprint;
            const sprintMin = parseInt(sprintInput.value, 10) || 25;
            const breakMin = parseInt(breakInput.value, 10) || 5;
            remainingSeconds = (isSprint ? sprintMin : breakMin) * 60;
            updateLabels();
            startTimer();
            return;
        }
    updateClockDisplay();
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    pauseTimer();
    isSprint = true;
    const sprintMin = parseInt(sprintInput.value, 10) || 25;
    remainingSeconds = sprintMin * 60;
    updateLabels();
    updateClockDisplay();
}

startBtn.addEventListener('click', () => {
    if (!timerInterval && !isRunning && remainingSeconds <= 0) {
        // new run
        const sprintMin = parseInt(sprintInput.value, 10) || 25;
        remainingSeconds = sprintMin * 60;
        isSprint = true;
        updateLabels();
    }
    startTimer();
});

pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// init
updateLabels();
updateClockDisplay();

// floating mini timer -- when tab hidden
const floatingTimer = document.getElementById('floatingTimer');
const floatingLabel = document.getElementById('floatingLabel');
const floatingClock = document.getElementById('floatingClock');

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (isRunning) {
            floatingTimer.style.display = 'flex';
        }
    } else {
        floatingTimer.style.display = 'none';
    }
});
