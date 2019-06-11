"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
class Logger {
    constructor(options) {
        this.name = options.name || 'BuggleAI';
        this.copyright = options.copyright || 'The Buggle Species';
        this.year = new Date().getFullYear();
        this.colors = {
            warning: chalk_1.default['yellow'],
            error: chalk_1.default['red'],
            info: chalk_1.default['white'],
            debug: chalk_1.default['blue'],
            success: chalk_1.default['green']
        };
    }
    postData(type, service, data) {
        let thisService = `[${this.colors[type](service.toUpperCase())}]`;
        console.log(chalk_1.default['gray'](`${thisService}: ${data}`));
    }
    brand() {
        console.log(chalk_1.default['green'](figlet_1.default.textSync(this.name)));
        console.log(chalk_1.default['gray'](`(c) ${this.copyright} ${this.year}`));
    }
    warn(service, data) {
        this.postData('warning', service, data);
    }
    error(service, data) {
        this.postData('error', service, data);
    }
    success(service, data) {
        this.postData('success', service, data);
    }
    debug(service, data) {
        this.postData('debug', service, data);
    }
}
module.exports = Logger;
//# sourceMappingURL=Logger.js.map