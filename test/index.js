'use strict';

const test = require('blue-tape');
const fs = require('fs');
const parse = require('..');

test('parse function', t => {
  const stream = fs.createReadStream(`${__dirname}/fixtures/sample.html`);

  return parse(stream).then(elements => {
    t.equal(elements[0].nodeName, 'META');
    t.equal(elements[0]['http-equiv'], 'Content-Type');
  });
});

test('retrieve page title as well', t => {
  const stream = fs.createReadStream(`${__dirname}/fixtures/sample.html`);

  return parse(stream).then(elements => {
    t.ok(elements.find(d => d.nodeName === 'TITLE' && d.innerText.match(/^YouTuber/)));
  });
});
