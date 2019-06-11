"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const eris_1 = require("eris");
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const nedb_1 = __importDefault(require("nedb"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
let Modules = {};
Modules.ENGINE = eris_1.Client;
Modules.COLORS = chalk_1.default;
Modules.ASCII = figlet_1.default;
Modules.DATABASE = nedb_1.default;
Modules.FILESYS = fs_1.default;
Modules.HTTP = http_1.default;
module.exports = Modules;
//# sourceMappingURL=Modules.js.map