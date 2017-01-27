function _observers(observable, event) {
    if (!observable.observers) {
        observable.observers = {};
    }

    if (!observable.observers[event]) {
        observable.observers[event] = [];
    }

    return observable.observers[event];
}

function observe(event, observer) {
    if (typeof  observer !== "function") {
        throw new TypeError("Observer is not a function");
    }
    _observers(this, event).push(observer);
}

function hasObserver(event, observer) {
    let observers = _observers(this, event);

    for (let i = 0; i < observers.length; i++) {
        if (observers[i] === observer) {
            return true;
        }
    }

    return false;
}

function notify(event, ...args) {
    let observers = _observers(this, event);

    for (var i = 0; i < observers.length; i++) {
        try{
            observers[i].apply(this, args);
        } catch (error) {}
    }
}

Observable = {
    observe: observe,
    hasObserver: hasObserver,
    notify: notify
};

/*
* Tests start
* */

function setup() {
    this.observable = Object.create(Observable);
}

describe("General observable tests", function () {
    it("Should store functions", function () {
        setup.apply(this);
        let observers = [function () {}, function () {}];
        this.observable.observe("event", observers[0]);
        this.observable.observe("event", observers[1]);

        expect(this.observable.hasObserver("event", observers[0])).toBe(true);
        expect(this.observable.hasObserver("event", observers[1])).toBe(true);
        expect(this.observable.hasObserver("event")).toBe(false);
    });

    it("Should call observables in the order they were added", function () {
        setup.apply(this);
        let calls = [];

        let observer1 = function () {
            calls.push(observer1);
        };
        let observer2 = function () {
            calls.push(observer2);
        };

        this.observable.observe("event", observer1);
        this.observable.observe("event", observer2);
        this.observable.notify("event");

        expect(observer1).toEqual(calls[0]);
        expect(observer2).toEqual(calls[1]);
        expect(observer2).not.toEqual(calls[0]);
    });
});

describe("Observable notifies observers", function () {
    it("Should call all observers", function () {
        setup.apply(this);
        let observer1 = function () {
            observer1.called = true;
        };
        let observer2 = function () {
            observer2.called = true;
        };

        this.observable.observe("event", observer1);
        this.observable.observe("event", observer2);
        this.observable.notify("event");

        expect(observer1.called).toBe(true);
        expect(observer2.called).toBe(true);
    });

    it("Should pas arguments", function () {
        setup.apply(this);
        let actual;

        this.observable.observe("event", function () {
            actual = arguments;
        });

        this.observable.notify("event", "String", 42);

        expect([...actual]).toEqual(["String", 42])
    });

    it("Should notify relevant observers only", function () {
        setup.apply(this);
        let calls = [];

        this.observable.observe("event", function () {
            calls.push("event");
        });
        this.observable.observe("other", function () {
            calls.push("other");
        });
        this.observable.notify("other");

        expect(calls).toEqual(["other"]);
    });
});

describe("Error handling", function () {
    it("Should throw an error for uncallable observer", function () {
        setup.apply(this);
        expect(function () { this.observable.observe("event", {}) }).toThrow();
    });

    it("Should notify all when some fails", function () {
        setup.apply(this);
        let observer1 = function () {
            throw new Error("error!");
        };
        let observer2 = function () {
            observer2.called = true;
        };

        this.observable.observe("event", observer1);
        this.observable.observe("event", observer2);
        this.observable.notify("event");

        expect(observer2.called).toBe(true);
    });

    it("Should not fail if there no observers", function () {
        setup.apply(this);
        expect(this.observable.notify).not.toThrow();
    });
});
