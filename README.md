# CS Music Platform

A multi-tier music production application exploring digital signal processing (DSP), real-time scheduling algorithms, and generative audio architectures. The platform scales from an interactive web-based frontend into an AI-driven melody generation backend.

## 🏗️ Architecture Overview

The system is designed in decoupled tiers to explore different paradigms of Computer Science:
*   **Tier 1 (Frontend):** A high-precision client-side step sequencer built with the HTML5 **Web Audio API** implementing a decoupled lookahead audio scheduling loop.
*   **Tier 2 (Generative Engine - Upcoming):** A **Python/FastAPI** microservice executing stochastic processing (Markov Chains) to dynamically predict and generate musical sequences.
*   **Tier 3 (Native Hardware - Future):** Low-latency **C++/JUCE** audio plugins capable of consuming MIDI data streams from the web frontend inside external Digital Audio Workstations (DAWs).

---

## ⚡ Current Features (Tier 1 Audio Engine)

*   **Lookahead Scheduler:** Implements a dual-thread timing model combining a Web Worker interval with the high-precision hardware clock (`AudioContext.currentTime`) to eliminate audio stuttering caused by main-thread UI rendering.
*   **Additive Synthesis:** Generates audio dynamically on the fly using native audio nodes (`OscillatorNode`, `GainNode`) without relying on pre-recorded static MP3/WAV samples.
*   **Dynamic Envelope Controls:** Features programmatic Gain scheduling to execute instant linear attacks and exponential decays for crisp, pluck-like synthesizers.
*   **State-to-UI Matrix Mapping:** Keeps an in-memory 2D Matrix (4x16 grid) mapped directly to standard CSS grid nodes via atomic UI state updates.

---

## 💻 Tech Stack & API Paradigms

*   **Frontend Language:** JavaScript (ES6+) / TypeScript
*   **Audio Pipeline:** Web Audio API (AudioContext, Oscillators, Custom Gain Envelopes)
*   **Layout & Styling:** Vanilla HTML5 / Responsive CSS Grid

---

## 🚀 Getting Started Locally

Since the project uses standard web API components, you can run it instantly without heavy build steps:

1. Clone this repository to your machine:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/cs-music-platform.git](https://github.com/YOUR_USERNAME/cs-music-platform.git)
   
2. Navigate into the project folder:
   ```Bash
   cd cs-music-platform
   
3. Open `index.html` directly in any modern browser (Chrome, Edge, Safari, or Firefox), or spin up a quick local development server using Python:
   ```bash
   python3 -m http.server 8000

4. Click "Start / Stop Engine" and toggle the grid cells to build a melody.
---

### What to do after pasting:
1. Scroll down to the bottom of the page to the **Commit changes...** box.
2. In the commit message box, you can leave it as the default text `"Create README.md"` or change it to `"docs: initialize portfolio README layout"`.
3. Click the green **Commit changes** button. 

Once you do that, your repository home page will immediately display this organized layout! Let me know when you've got it saved and want to start mapping out the Python backend configuration.
