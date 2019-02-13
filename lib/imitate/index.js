"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialize_names_1 = require("./initialize-names");
var create_imitation_1 = require("./create-imitation");
var overwrite_children_1 = require("./overwrite-children");
function imitate(original, names, encounteredObjects) {
    if (encounteredObjects === void 0) { encounteredObjects = new Map(); }
    if (encounteredObjects.has(original))
        return encounteredObjects.get(original);
    names = initialize_names_1.default(original, names);
    var target = create_imitation_1.default(original, names);
    encounteredObjects.set(original, target);
    overwrite_children_1.default(original, target, function (originalValue, name) {
        return imitate(originalValue, names.concat(name), encounteredObjects);
    });
    return target;
}
exports.default = imitate;