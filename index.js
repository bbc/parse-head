'use strict';

const trumpet = require('trumpet');
const DEFAULT_SELECT_TAGS = ['base', 'link', 'meta'/*, 'title', 'style', 'script', 'noscript''*/];

module.exports = function parseHead (stream) {
  const parser = trumpet();

  return new Promise((resolve, reject) => {
    const tags = [];
    const selectTags = DEFAULT_SELECT_TAGS;

    parser.selectAll(selectTags.join(','), element => {
      tags.push(Object.assign(element.getAttributes(), { 'nodeName': element.name.toLocaleUpperCase() } ));
    });

    parser.on('end', () => resolve(tags));
    parser.on('error', err => reject(err));

    stream.pipe(parser);
  });
};
