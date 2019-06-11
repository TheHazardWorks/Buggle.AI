"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const configuration_1 = __importDefault(require("../configuration"));
const dogeify_js_1 = __importDefault(require("dogeify-js"));
module.exports = {
    command: function () { return `doge`; },
    description: function () { return `much doge speak. wow. very excite.`; },
    usage: function () { return `doge <TEXT>`; },
    demo: function () { return `doge This will come out as doge speak!`; },
    category: function () { return `random`; },
    operation: function (buggle, message, options, commands) {
        if (!options[1]) {
            buggle.createMessage(message.channel.id, `You must provide text to be used!`);
        }
        else {
            let thisParam = message.content.replace(configuration_1.default.client.prefix, '').replace(options[0], '');
            buggle.createMessage(message.channel.id, `:dog: ${dogeify_js_1.default(thisParam)}`);
        }
    }
};
//# sourceMappingURL=doge.js.map