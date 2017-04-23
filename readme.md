## WDIO Helpers
<a href="http://www.mohithg.com/wdio-helpers/global.html">![alt wdio helpers](https://raw.githubusercontent.com/mohithg/mohithg.github.io/master/wdio-helpers/wdiohelpers.png)</a>

# Description
These helper functions can be used with [WDIO](http://webdriver.io/).

# Install
This project uses [https://nodejs.org/en/](node) and [https://www.npmjs.com/](npm). Go check them out if you don't have them locally installed.
`npm install wdio-helpers --save`

# Usage
- ES6 Way
```javascript
import {load, click} from 'wdio-helpers';

describe ('Test Suite', () => {
	it ('Test1', () => {
		load('https://www.google.com');
		click('#lst-ib');
	});
});
```

- ES5 Way
```javascript
var helpers = require('wdio-helpers');

describe ('Test Suite', function() {
	it ('Test1', function() {
		helpers.load('https://www.google.com');
		helpers.click('#lst-ib');
	});
});
```

For a working demo see [here](https://github.com/mohithg/generic-automation).

## Resources
- [https://github.com/mohithg/wdio-helpers/wiki](API Reference)

## Contributions
Feel free to contribute to this repo.

