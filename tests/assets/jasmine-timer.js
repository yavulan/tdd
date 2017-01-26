"use strict";

const Timer = () => {
    let startTime = Date.now();

    return {
        get elapsed() {
            return Date.now() - startTime;
        }
    }
};

module.exports = Timer;