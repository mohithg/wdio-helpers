## WDIO Helpers
<a href="https://mohithg.github.io/wdio-helpers/global.html">![alt wdio helpers](https://raw.githubusercontent.com/mohithg/wdio-helpers/master/docs/wdiohelpers.png)</a>

- The tests for this project to be run in <a style="width: 200px; height: 200px;" href="https://www.browserstack.com">![alt browserstack](https://raw.githubusercontent.com/mohithg/wdio-helpers/master/docs/browserstack.png)</a>

# Description
These helper functions can be used with [WDIO](http://webdriver.io/).

# Install
This project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Go check them out if you don't have them locally installed.
- `npm install wdio-helpers --save`

# Usage ES6 Way
```javascript
import {load, click} from 'wdio-helpers';

describe ('Test Suite', () => {
	it ('Test1', () => {
		load('https://www.google.com');
		click('#lst-ib');
	});
});
```

# Usage ES5 Way
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
- [API Reference](http://mohithg.com/wdio-helpers/)
- [Wiki](https://github.com/mohithg/wdio-helpers/wiki/API-Reference)

## Contributions
There are lot of helpers to be written. Feel free to contribute to this repo.
For more help reach out to [me](mailto:mohithgm@gmail.com)

