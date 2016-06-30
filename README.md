# parse-head [![Build Status](https://travis-ci.org/bbcrd/parse-head.svg?branch=master)](https://travis-ci.org/bbcrd/parse-head)

> A promise to fetch the `base`, `title`, `link` and `meta` tags out of a Node stream.

The streaming approach helps remaining efficient in spite of malformed or very large HTML documents.

**Notice**: this module requires `node>=4` to work.

# Usage

## Node API

```js
const parse = require('parse-head');
const fs = require('fs');

parse(fs.createReadStream('some/file.html')).then(tags => {
  // ...
});
```

It happens `Buffer` and `string` values are accepted as well:

```js
const parse = require('parse-head');
const fs = require('fs');

fs.readFile('some/file.html', (err, buf) => {
  parse(buf).then(tags => {
    // ...
  });
});
```

## Command line

```bash
$ cat some/file.html | parse-head
[
  {"http-equiv":"Content-Type","content":"text/html; charset=utf-8","nodeName":"META"},
  {"property":"og:image","content":"...","nodeName":"META"},
  {"innerText":"...","nodeName":"TITLE"},
  ...
]
```

# License

> Copyright 2016, British Broadcasting Corporation
>
> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
>
>     http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.
