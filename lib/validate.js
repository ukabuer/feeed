const Ajv = require('ajv');

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      cron: { type: 'string' },
      link: { type: 'string' },
      limit: { type: 'integer', minimum: 1 },
      usePuppeteer: { type: 'boolean' },
      type: { type: 'string', enum: ['json', 'raw', 'html', 'xml'] },
      process: { instanceof: Function },
    },
    required: ['id', 'cron', 'link', 'process'],
  },
};

const ajv = new Ajv({ allErrors: true });
ajv.addKeyword('instanceof', {
  compile: type => data => data instanceof type,
});

const validate = ajv.compile(schema);

module.exports = validate;
