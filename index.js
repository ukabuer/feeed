"use strict";
exports.__esModule = true;
var scheduler_1 = require("./lib/scheduler");
var rules = require("./test/new");
var scheduler = new scheduler_1["default"]();
rules.forEach(scheduler.add);
scheduler.start();
