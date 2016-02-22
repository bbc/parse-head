#!/usr/bin/env node

const parse = require('..');

parse(process.stdin)
  .then(elements => {
    process.stdout.write(JSON.stringify(elements), () => process.exit(0));
  })
  .catch(err => {
    process.stderr.write(JSON.stringify(err), () => process.exit(65));  // EX_DATAERR BSD exit code
  });