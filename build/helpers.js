'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logConsoleOutput = exports.findElementFromGroupWithText = exports.waitForElementToGo = exports.setValue = exports.clickWithText = exports.click = exports.wait = exports.waitForUrl = exports.load = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function load
 * @desc loads the url in the browser.
 * @param {string} url - The url to navigate to.
 */
var load = exports.load = function load(url) {
  browser.url(url);
};

/**
 * @function waitForUrl
 * @desc waits until the url is loaded.
 * @param {string} url - The url to navigate to.
 */
/**
* Waits until the url is loaded, then continues
* Times out after timeout mentioned in configs
* @param {String} url - URL to check if loaded
* @param {Number} timeout - waiting time for url to load 
* @param {regex} regex - Regex to match with url
*/
var waitForUrl = exports.waitForUrl = function waitForUrl(url, timeout) {
  var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  browser.waitUntil(function () {
    if (regex) {
      return url.test(browser.getUrl());
    }
    return browser.getUrl() === url;
  }, timeout, '***Expected ' + url + ' instead of ' + browser.getUrl() + '***');
};

/**
 * @function wait
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * @param {string} selector - The Selector element.
 */
var wait = exports.wait = function wait(selector) {
  browser.waitForExist(selector);
  browser.scroll(selector);
};

/**
 * @function click
 * @desc clicks the selector specified and if there are multiple elememts with the same selector it will choose based on the index.
 * Note that it waits until selector appears in the DOM. And clicks only the visible element.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 */
var click = exports.click = function click(selector) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  wait(selector);
  var element = $$(selector)[index];
  if (element.isVisible()) {
    element.click();
  } else {
    console.log('Element is not visible to click');
  }
};

/**
 * @function clickWithText
 * @desc finds the selector with text and clicks and if there are multiple elememts with the same text, it will click based on the index. Note that it waits until selector appears in the DOM.
 * @param {string} selector - Selector for the element.
 * @param {string} text - The text element.
 * @param {number} [index = 0] - index number
 */
var clickWithText = exports.clickWithText = function clickWithText(selector, text) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var element = findElementFromGroupWithText(selector, text, index);
  if (element) {
    element.click();
  } else {
    new Error('No Element with text found');
  }
};

/**
 * @function setValue
 * @desc Set Value in any selector
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param {string} [value = ''] - Value to be set in the selector
 */
var setValue = exports.setValue = function setValue(selector) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  wait(selector);
  $$(selector)[index].clearElement();
  $$(selector)[index].setValue(value);
};

/**
 * @function waitForElementToGo
 * @desc Waits until element is not visible in DOM. Selector will choose based on the index.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 */
var waitForElementToGo = exports.waitForElementToGo = function waitForElementToGo(selector) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  browser.waitUntil(function () {
    if (!_lodash2.default.isEmpty($$(selector))) {
      var element = $$(selector)[index];
      return element.isVisible();
    } else {
      return true;
    }
  }, 100000, selector + ' didnot go until timeout');
};

/**
 * @function findElementFromGroupWithText()
 * @desc Finds and returns the element that matches the text from the group of selectors
 * @param {string} groupSelector - The groupSelector element.
 * @param {string} textToSearch - Enter the text to search in elements
 * @param {number} [index = 0] - index number
 * @return {element} element - The element which matches the textToSearch from group of groupSelector or returns null if nothing is found
 */
var findElementFromGroupWithText = exports.findElementFromGroupWithText = function findElementFromGroupWithText(groupSelector, textToSearch) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  wait(groupSelector);
  var group = $$(groupSelector);
  var elements = [];
  for (var i = 0; i < group.length; i++) {
    var element = group[i];
    if (element.getText().includes(textToSearch)) {
      elements = _lodash2.default.concat(elements, element);
    }
  }
  if (!_lodash2.default.isEmpty(elements)) {
    return elements[index];
  }
  return null;
};

/**
 * @function logConsoleOutput(type)
 * @desc Returns the console errors from browser
 * @param {string} type - Type can be INFO, WARNING, SEVERE. If no type is provided, all messages are returned.
 * @return {array} array - Returns the console errors from browser
 */
var logConsoleOutput = exports.logConsoleOutput = function logConsoleOutput(type) {
  var data = browser.log('browser').value;
  if (type) {
    data = _lodash2.default.filter(data, function (each) {
      return each.level == type;
    });
  }
  return _lodash2.default.map(data, function (field) {
    return field.message;
  });
};

var Helpers = {
  click: click,
  clickWithText: clickWithText,
  findElementFromGroupWithText: findElementFromGroupWithText,
  load: load,
  logConsoleOutput: logConsoleOutput,
  setValue: setValue,
  wait: wait,
  waitForElementToGo: waitForElementToGo
};

exports.default = Helpers;

