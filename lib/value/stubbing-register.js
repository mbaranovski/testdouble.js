"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance = null;
var StubbingRegister = /** @class */ (function () {
    function StubbingRegister() {
        this.stubbings = new Map();
    }
    Object.defineProperty(StubbingRegister, "instance", {
        get: function () {
            if (instance)
                return instance;
            instance = new StubbingRegister();
            return instance;
        },
        enumerable: true,
        configurable: true
    });
    StubbingRegister.reset = function () {
        instance = null;
    };
    StubbingRegister.prototype.add = function (double, stubbing) {
        if (this.stubbings.has(double)) {
            this.stubbings.get(double).push(stubbing);
        }
        else {
            this.stubbings.set(double, [stubbing]);
        }
    };
    StubbingRegister.prototype.get = function (double) {
        return this.stubbings.get(double);
    };
    return StubbingRegister;
}());
exports.default = StubbingRegister;