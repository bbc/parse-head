'use strict';

const trumpet = require('trumpet');
const DEFAULT_SELECT_TAGS = ['base', 'link', 'meta', 'title'/*, 'style', 'script', 'noscript''*/];

module.exports = function parseHead (input) {
  const parser = trumpet();

  return new Promise((resolve, reject) => {
    const tags = [];
    const selectTags = DEFAULT_SELECT_TAGS;

    parser.selectAll(selectTags.join(','), element => {
      const str = element.createReadStream();

      tags.push(new Promise((resolve) => {
        str.on('error', reject);

        str.on('readable', () => {
          resolve(Object.assign(element.getAttributes(), {
            'nodeName': element.name.toLocaleUpperCase(),
            'innerText': String(str.read(128) || ''),
          }));
        });
      }));
    });

    parser.on('end', () => Promise.all(tags).then(resolve, reject));
    parser.on('error', err => reject(err));

    if (Buffer.isBuffer(input) || typeof input === 'string') {
      parser.write(input);
      parser.end();
    }
    else {
      input.pipe(parser);
    }
  });
};
