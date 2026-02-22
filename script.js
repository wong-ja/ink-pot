// palette + shape
const app = document.getElementById('app');
const paletteSelect = document.getElementById('paletteSelect');
const shapeSelect = document.getElementById('shapeSelect');

function applyPalette(value) {
    app.classList.remove('palette1', 'palette2', 'palette3', 'palette4', 'palette5', 'palette6');
    app.classList.add(value);
}

function applyShape(value) {
    app.classList.remove(
        'shape-default',
        'shape-flower',
        'shape-film',
        'shape-batman',
        'shape-blob'
    );
    app.classList.add(`shape-${value}`);
}

paletteSelect.addEventListener('change', e => {
    applyPalette(e.target.value);
});

shapeSelect.addEventListener('change', e => {
    applyShape(e.target.value);
});

// init palette/shape
applyPalette('palette1');
applyShape('default');

// editor & toolbar (rich-text)
const editor = document.getElementById('editor');
const titleInput = document.getElementById('docTitle');
const toolbarButtons = document.querySelectorAll('.toolbar .action-btn');
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');

// toolbar, rich text formatting
toolbarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        editor.focus();

        switch (action) {
            case 'undo':
                document.execCommand('undo');
                break;
            case 'redo':
                document.execCommand('redo');
                break;
            case 'bold':
                document.execCommand('bold');
                break;
            case 'italic':
                document.execCommand('italic');
                break;
            case 'underline':
                document.execCommand('underline');
                break;
            case 'h1':
                document.execCommand('formatBlock', false, 'h1');
                break;
            case 'h2':
                document.execCommand('formatBlock', false, 'h2');
                break;
            case 'bullet':
                document.execCommand('insertUnorderedList');
                break;
            case 'number':
                document.execCommand('insertOrderedList');
                break;
        }
    });
});

// keyboard shortcuts
document.addEventListener('keydown', e => {
    if (document.activeElement !== editor) return;

    if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (['b','i','u','z','y','1','2'].includes(key)) {
            e.preventDefault();
        }
        switch (key) {
            case 'b':
                document.execCommand('bold');
                break;
            case 'i':
                document.execCommand('italic');
                break;
            case 'u':
                document.execCommand('underline');
                break;
            case 'z':
                document.execCommand('undo');
                break;
            case 'y':
                document.execCommand('redo');
                break;
            case '1':
                document.execCommand('formatBlock', false, 'h1');
                break;
            case '2':
                document.execCommand('formatBlock', false, 'h2');
                break;
        }
    }
});

// word/char count
function updateStats() {
    const text = editor.textContent || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCountEl.textContent = `${words} words`;
    charCountEl.textContent = `${text.length} chars`;
}

editor.addEventListener('input', updateStats);

// EXPORT helpers
function getContentAndTitle() {
    const content = editor.innerHTML;
    let title = titleInput.value.trim();
    if (!title) title = 'ink-pot';
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
    const tempEl = document.createElement('div');
    tempEl.innerHTML = content;
    const plain = tempEl.textContent || tempEl.innerText || '';
    const subject = encodeURIComponent(`Ink Pot.: ${title}`);
    const body = encodeURIComponent(plain);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// export buttons
document.querySelectorAll('[data-export]').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.export;
        const { content, title } = getContentAndTitle();

        if (type === 'txt') {
            const tempEl = document.createElement('div');
            tempEl.innerHTML = content;
            const plain = tempEl.textContent || tempEl.innerText || '';
            downloadFile(`${title}.txt`, 'text/plain;charset=utf-8', plain);
        }

        if (type === 'md') {
            const tempEl = document.createElement('div');
            tempEl.innerHTML = content;
            const plain = tempEl.textContent || tempEl.innerText || '';
            downloadFile(`${title}.md`, 'text/markdown;charset=utf-8', plain);
        }

        if (type === 'html') {
            const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body { font-family: Georgia, serif; line-height: 1.6; max-width: 800px; margin: 2rem auto; padding: 1rem; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div>${content}</div>
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
            <div>${content}</div>
            <script>
                window.onload = function() {
                    window.print();
                }
            <\/script>
        </body>
        </html>
    `);
    w.document.close();
});

// prevent accidental refresh
let hasTyped = false;

editor.addEventListener('input', () => {
    hasTyped = (editor.textContent || '').trim().length > 0;
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
        const sprintMin = parseInt(sprintInput.value, 10) || 25;
        remainingSeconds = sprintMin * 60;
        isSprint = true;
        updateLabels();
    }
    startTimer();
});

pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// init pomodoro UI
updateLabels();
updateClockDisplay();

// floating mini timer
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

// draft save/load (HTML content)
const draftToggle = document.getElementById('draftToggle');
const DRAFT_KEY = 'ink-pot-draft';

function saveDraft() {
    if (!draftToggle.checked) return;
    const data = {
        title: titleInput.value,
        content: editor.innerHTML,
        timestamp: Date.now()
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

function loadDraft() {
    if (!draftToggle.checked) return;
    try {
        const data = JSON.parse(localStorage.getItem(DRAFT_KEY));
        if (data) {
            titleInput.value = data.title || '';
            editor.innerHTML = data.content || '';
            updateStats();
        }
    } catch (e) {
        // ignore
    }
}

// auto-save on input/change
editor.addEventListener('input', saveDraft);
titleInput.addEventListener('input', saveDraft);
draftToggle.addEventListener('change', () => {
    if (draftToggle.checked) {
        loadDraft();
        saveDraft();
    } else {
        localStorage.removeItem(DRAFT_KEY);
    }
});

// load on init
loadDraft();
updateStats();