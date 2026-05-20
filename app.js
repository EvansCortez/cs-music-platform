let audioCtx = null;
let isPlaying = false;
let bpm = 120;

const rowsCount = 4;
const stepsCount = 16;
const gridMatrix = Array(rowsCount).fill(null).map(() => Array(stepsCount).fill(0));
const frequencies = [523.25, 440.00, 392.00, 329.63]; // C5, A4, G4, E4

let currentStep = 0;
let nextNoteTime = 0.0;      
let lookahead = 25.0;        
let scheduleAheadTime = 0.1; 
let timerId = null;

// Build UI elements and map them directly to our data matrix
const gridContainer = document.getElementById('sequencer-grid');
for (let r = 0; r < rowsCount; r++) {
    for (let c = 0; c < stepsCount; c++) {
        const btn = document.createElement('button');
        btn.classList.add('note-btn');
        btn.dataset.row = r;
        btn.dataset.step = c;
        btn.addEventListener('click', () => {
            gridMatrix[r][c] = gridMatrix[r][c] === 0 ? 1 : 0;
            btn.classList.toggle('active');
        });
        gridContainer.appendChild(btn);
    }
}

function playTone(freq, startTime) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.type = 'sine'; 
    osc.frequency.setValueAtTime(freq, startTime);

    // Audio Envelope (Attack & Decay)
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25); 

    osc.start(startTime);
    osc.stop(startTime + 0.25);
}

function nextStep() {
    const secondsPerBeat = 60.0 / bpm;
    const secondsPerStep = secondsPerBeat / 4; 
    nextNoteTime += secondsPerStep; 
    currentStep = (currentStep + 1) % stepsCount;
}

function scheduleNote(stepNumber, time) {
    for (let r = 0; r < rowsCount; r++) {
        if (gridMatrix[r][stepNumber] === 1) {
            playTone(frequencies[r], time);
        }
    }

    // UI tracking loop synchronized with screen frame rate
    requestAnimationFrame(() => {
        const allButtons = document.querySelectorAll('.note-btn');
        allButtons.forEach(btn => {
            btn.classList.remove('playing');
            if (parseInt(btn.dataset.step) === stepNumber) {
                btn.classList.add('playing');
            }
        });
    });
}

function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
        scheduleNote(currentStep, nextNoteTime);
        nextStep();
    }
    timerId = setTimeout(scheduler, lookahead);
}

// Handle explicit user activation gesture required by modern browsers
document.getElementById('start-btn').addEventListener('click', (e) => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    isPlaying = !isPlaying;

    if (isPlaying) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        currentStep = 0;
        nextNoteTime = audioCtx.currentTime + 0.05;
        e.target.textContent = "Stop Engine";
        e.target.classList.add('active');
        scheduler();
    } else {
        clearTimeout(timerId);
        e.target.textContent = "Start Engine";
        e.target.classList.remove('active');
        document.querySelectorAll('.note-btn').forEach(b => b.classList.remove('playing'));
    }
});
