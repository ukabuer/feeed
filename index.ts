import Scheduler from "./lib/scheduler";
const rules = require("./test/new");

const scheduler = new Scheduler();

scheduler.start(rules);
