import crawl, { Rule } from "./interface";

class Scheduler {
  store: Map<string, Set<string>>;

  constructor() {
    this.store = new Map();
  }

  run = async (rule: Rule, time: number) => {
    setTimeout(async () => {
      const first = !this.store.has(rule.id);
      if (first) {
        this.store.set(rule.id, new Set());
      }
      const cache = this.store.get(rule.id);
      const [items, period] = await crawl(rule, cache, first);

      items.forEach(item => {
        cache.add(item.url);
        console.log(item);
      });
      this.run(rule, period);
    }, time * 1000);
  };

  start = (rules: Array<Rule>) => {
    rules.forEach(rule => {
      this.run(rule, 0);
    });
  };
}

export default Scheduler;
