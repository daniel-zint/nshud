class CountDownTimer {
    constructor(granularity = 1000) {
        this.granularity = granularity;
        this.tickFtns = [];
        this.timeoutEvent = null;
        this.time = 0;
    }

    start(duration) {
        this.duration = duration;
        // stop count down if its already running
        this.stop();
        let start = Date.now();
        let that = this;

        (function timer() {
            that.time = that.duration - (((Date.now() - start) / 1000) | 0);

            if (that.time > 0) {
                that.timeoutEvent = setTimeout(timer, that.granularity);
            } else {
                that.time = 0;
                that.timeoutEvent = null;
            }

            const obj = that.parse(that.time);
            that.tickFtns.forEach(function (ftn) {
                ftn.call(this, obj.minutes, obj.seconds);
            }, that);
        }());
    }

    stop() {
        if (this.timeoutEvent) {
            clearTimeout(this.timeoutEvent);
            this.timeoutEvent = null;
        }
    }

    onTick(ftn) {
        if (typeof ftn === 'function') {
            this.tickFtns.push(ftn);
        }
        return this;
    };

    expired() {
        return this.timeoutEvent === null;
    };

    parse(seconds) {
        return {
            'minutes': (seconds / 60) | 0,
            'seconds': (seconds % 60) | 0
        };
    };
}