# userscript-header

Generate userscript header from package.json.

### Usage

Example `package.json` :

```json
{
  "name": "my-userscript",
  "version": "0.1.0",
  "description": "Userscript description",
  "author": "Author",
  "license": "MIT",
  "devDependencies": {
    "gulp": "^3.9.1"
  },
  "userscript": {
    "name": "My userscript name",
    "description": "My userscript description",
    "author": "Toast",
    "namespace": "http://www.spawnkill.fr",
    "match": "*://*.toast.tld/*",
    "grant": [
      "GM_addStyle",
      "GM_setClipboard"
    ],
    "run-at": "document-start"
  }
}

```

```js
var userscriptHeader = require('userscript-header');

console.log(userscriptHeader.fromPackage('./package.json'));

// Output :

// ==UserScript==
// @author Toast
// @description My userscript description
// @grant GM_addStyle
// @grant GM_setClipboard
// @match *://*.toast.tld/*
// @name My userscript name
// @namespace http://www.spawnkill.fr
// @run-at document-start
// @version 0.1.0
// ==/UserScript==
```

When present, `package.userscript.{name|version|description|author}`, respectively override `package.{name|version|description|author}`.
