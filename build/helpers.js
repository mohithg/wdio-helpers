'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logConsoleOutput = exports.findElementFromGroupWithText = exports.waitForElementToGo = exports.setValue = exports.click = exports.wait = exports.load = undefined;

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
 * @desc clicks the selector specified and if there are multiple elememts with the same selector it will choose based on the index. Note that it waits until selector appears in the DOM.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 */
var click = exports.click = function click(selector) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  wait(selector);
  $$(selector)[index].click();
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
      return $$(selector)[index] && !$$(selector)[index].isVisible();
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
 * @return {element} element - The element which matches the textToSearch from group of groupSelector or returns null if nothing is found
 */
var findElementFromGroupWithText = exports.findElementFromGroupWithText = function findElementFromGroupWithText(groupSelector, textToSearch) {
  wait(groupSelector);
  var group = $$(groupSelector);
  for (var i = 0; i < group.length; i++) {
    var element = group[i];
    if (element.getText().includes(textToSearch)) {
      return element;
    }
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
  findElementFromGroupWithText: findElementFromGroupWithText,
  load: load,
  logConsoleOutput: logConsoleOutput,
  setValue: setValue,
  wait: wait,
  waitForElementToGo: waitForElementToGo
};

exports.default = Helpers;

