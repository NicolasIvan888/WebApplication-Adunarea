document.addEventListener("DOMContentLoaded", () => {
    const numberCount = document.getElementById("number-count");
    const displaySpeed = document.getElementById("display-speed");
    const startButton = document.getElementById("start-button");
    const numberDisplay = document.getElementById("number-display");
    const roundProgress = document.getElementById("round-progress");
    const progressBar = document.getElementById("progress-bar");
    const statusMessage = document.getElementById("status-message");
    const resultPanel = document.getElementById("result-panel");
    const revealButton = document.getElementById("reveal-button");
    const resultContent = document.getElementById("result-content");
    const totalResult = document.getElementById("total-result");
    const sequenceResult = document.getElementById("sequence-result");
    const restartButton = document.getElementById("restart-button");
    if (!startButton) return;

    let sequence = [];
    let currentIndex = 0;
    let timerId = null;
    let awaitingReveal = false;
    const randomDigit = () => Math.floor(Math.random() * 9) + 1;

    function setControlsDisabled(disabled) {
        numberCount.disabled = disabled;
        displaySpeed.disabled = disabled;
        startButton.disabled = disabled;
    }

    function finishRound() {
        clearInterval(timerId);
        timerId = null;
        awaitingReveal = true;
        numberDisplay.textContent = "STOP";
        numberDisplay.classList.add("is-stop");
        roundProgress.textContent = `${sequence.length} din ${sequence.length}`;
        statusMessage.textContent = "Calculează suma, apoi verifică rezultatul.";
        resultPanel.hidden = false;
        revealButton.focus();
    }

    function showNextNumber() {
        if (currentIndex >= sequence.length) {
            finishRound();
            return;
        }
        numberDisplay.textContent = sequence[currentIndex];
        numberDisplay.classList.remove("number-pop");
        void numberDisplay.offsetWidth;
        numberDisplay.classList.add("number-pop");
        currentIndex += 1;
        roundProgress.textContent = `${currentIndex} din ${sequence.length}`;
        progressBar.style.width = `${(currentIndex / sequence.length) * 100}%`;
    }

    function startRound() {
        const count = Number(numberCount.value);
        const speed = Number(displaySpeed.value);
        sequence = Array.from({ length: count }, randomDigit);
        currentIndex = 0;
        awaitingReveal = false;
        resultPanel.hidden = true;
        resultContent.hidden = true;
        revealButton.hidden = false;
        restartButton.hidden = true;
        numberDisplay.classList.remove("is-stop");
        statusMessage.textContent = "Urmărește atent fiecare număr.";
        progressBar.style.width = "0%";
        setControlsDisabled(true);
        showNextNumber();
        timerId = setInterval(showNextNumber, speed);
    }

    function revealResult() {
        if (!awaitingReveal) return;
        awaitingReveal = false;
        const total = sequence.reduce((sum, digit) => sum + digit, 0);
        totalResult.textContent = total;
        sequenceResult.textContent = `${sequence.join(" + ")} = ${total}`;
        resultContent.hidden = false;
        revealButton.hidden = true;
        restartButton.hidden = false;
        statusMessage.textContent = "Compară rezultatul cu suma calculată de tine.";
        restartButton.focus();
    }

    function resetRound() {
        clearInterval(timerId);
        timerId = null;
        sequence = [];
        currentIndex = 0;
        awaitingReveal = false;
        numberDisplay.textContent = "+";
        numberDisplay.classList.remove("is-stop", "number-pop");
        roundProgress.textContent = "Pregătit";
        statusMessage.textContent = "Alege dificultatea și apasă „Începe exercițiul”.";
        progressBar.style.width = "0%";
        resultPanel.hidden = true;
        setControlsDisabled(false);
        startButton.focus();
    }

    startButton.addEventListener("click", startRound);
    revealButton.addEventListener("click", revealResult);
    restartButton.addEventListener("click", resetRound);
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && awaitingReveal) {
            event.preventDefault();
            revealResult();
        }
    });
});
