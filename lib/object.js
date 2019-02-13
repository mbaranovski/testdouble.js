"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("./wrap/lodash");
var log_1 = require("./log");
var function_1 = require("./function");
var imitate_1 = require("./imitate");
var proxy_1 = require("./object/proxy");
var DEFAULT_OPTIONS = { excludeMethods: ['then'] };
function object(nameOrType, config) {
    return lodash_1.default.tap(fakeObject(nameOrType, config, arguments.length), function (obj) {
        addToStringToDouble(obj, nameOrType);
    });
}
exports.default = object;
var fakeObject = function (nameOrType, config, argCount) {
    if (lodash_1.default.isArray(nameOrType)) {
        return createTestDoublesForFunctionNames(nameOrType);
    }
    else if (lodash_1.default.isObjectLike(nameOrType)) {
        return imitate_1.default(nameOrType);
    }
    else if (lodash_1.default.isString(nameOrType) || argCount === 0) {
        return proxy_1.default(nameOrType, withDefaults(config));
    }
    else if (lodash_1.default.isFunction(nameOrType)) {
        ensureFunctionIsNotPassed();
    }
    else {
        ensureOtherGarbageIsNotPassed();
    }
};
var createTestDoublesForFunctionNames = function (names) {
    return lodash_1.default.transform(names, function (acc, funcName) {
        acc[funcName] = function_1.default("." + String(funcName));
    });
};
var ensureFunctionIsNotPassed = function () {
    return log_1.default.error('td.object', "Functions are not valid arguments to `td.object` (as of testdouble@2.0.0). Please use `td.function()` or `td.constructor()` instead for creating fake functions.");
};
var ensureOtherGarbageIsNotPassed = function () {
    return log_1.default.error('td.object', "To create a fake object with td.object(), pass it a plain object that contains\nfunctions, an array of function names, or (if your runtime supports ES Proxy\nobjects) a string name.\n\nIf you passed td.object an instance of a custom type, consider passing the\ntype's constructor to `td.constructor()` instead.\n");
};
var withDefaults = function (config) {
    return lodash_1.default.extend({}, DEFAULT_OPTIONS, config);
};
var addToStringToDouble = function (fakeObject, nameOrType) {
    var name = nameOf(nameOrType);
    fakeObject.toString = function () { return "[test double object" + (name ? " for \"" + name + "\"" : '') + "]"; };
};
var nameOf = function (nameOrType) {
    return lodash_1.default.isString(nameOrType)
        ? nameOrType
        : '';
};