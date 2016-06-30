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

test('works with buffer input', t => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/fixtures/sample.html`, (err, buf) => {
      if (err) {
        return reject(err);
      }

      parse(buf).then(elements => {
        t.equal(elements.length, 31);
        resolve()
      }, reject);
    });
  });
});

test('works with string input', t => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/fixtures/sample.html`, (err, buf) => {
      if (err) {
        return reject(err);
      }

      parse(String(buf)).then(elements => {
        t.equal(elements.length, 31);
        resolve()
      }, reject);
    });
  });
});
