class Timer {
    constructor(duration, callback) {
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);

        this.timerRemaining = duration;
        this.timerIdentifier = 0;
        this.timerCallback = () => {
            this.timerFinished = true;
            callback();
        };

        this.timerStart = 0;

        this.timerStarted = false;
        this.timerPaused = false;
        this.timerFinished = false;
    }

    startTimer() {
        if (this.timerStarted === true) {
            return;
        }

        this.timerStarted = true;
        this.timerStart = Date.now();
        this.timerIdentifier = setTimeout(this.timerCallback, this.timerRemaining);
    }

    pauseTimer() {
        if (this.timerFinished === true || this.timerPaused === true || this.timerStarted === false) {
            return;
        }

        this.timerPaused = true;
        this.timerRemaining = this.timerRemaining - (Date.now() - this.timerStart);

        clearTimeout(this.timerIdentifier);
    }

    resumeTimer() {
        if (this.timerStarted === false || this.timerPaused === false || this.timerFinished === true) {
            return;
        }

        this.timerPaused = false;
        this.timerStart = Date.now();
        this.timerIdentifier = setTimeout(this.timerCallback, this.timerRemaining);
    }
}

export {Timer};
