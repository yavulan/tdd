const Timer = require("./assets/jasmine-timer");

describe("Timer tests", function () {
    it("Should take less than 100ms to execute", function () {
        let time = Timer();
        expect(time.elapsed).toBeLessThan(100);
    });

    it("Should take more than 100ms to execute", function () {
        let time = Timer();

        let arr = [];
        for (var i = 0; i < 1e7; i++) {
            arr[i] = i;
        }

        expect(time.elapsed).toBeGreaterThan(100);
    });
});