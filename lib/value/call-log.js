"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance = null;
var CallLog = /** @class */ (function () {
    function CallLog() {
        this.calls = new Map();
        this.callHistory = [];
    }
    Object.defineProperty(CallLog, "instance", {
        get: function () {
            if (instance)
                return instance;
            instance = new CallLog();
            return instance;
        },
        enumerable: true,
        configurable: true
    });
    CallLog.reset = function () {
        instance = null;
    };
    CallLog.prototype.log = function (double, call) {
        this.callHistory.push({ double: double, call: call });
        if (this.calls.has(double)) {
            this.calls.get(double).push(call);
        }
        else {
            this.calls.set(double, [call]);
        }
    };
    CallLog.prototype.for = function (double) {
        return this.calls.get(double);
    };
    CallLog.prototype.pop = function () {
        var lastCall = this.callHistory.pop();
        if (lastCall && this.calls.has(lastCall.double)) {
            this.calls.get(lastCall.double).pop();
        }
        return lastCall;
    };
    return CallLog;
}());
exports.default = CallLog;