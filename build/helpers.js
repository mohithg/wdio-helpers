'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findElementFromGroupWithText = exports.waitForElementToGo = exports.setValue = exports.clickWithText = exports.waitForTextToAppear = exports.waitForVisible = exports.click = exports.wait = exports.waitForUrl = exports.load = undefined;

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
  var element = $(selector);
  element.waitForExist({});
  element.moveTo({});
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
  if (element.isDisplayedInViewport()) {
    element.click();
  } else {
    console.log('Element is not visible to click');
  }
};

/**
 * @function waitForVisible
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * and waits until the selector is visible
 * @param {string} selector - The Selector element.
 */
var waitForVisible = exports.waitForVisible = function waitForVisible(selector) {
  wait(selector);
  browser.waitUntil(function () {
    return $(selector).isDisplayedInViewport();
  }, 100000, 'Selector is not visible');
};

/**
 * @function waitForTextToAppear
 * @desc Accepts selector and the text of the selector to wait for the element with that text to appear in the DOM and scroll the page to that element in the screen
 * and waits until the selector with text is visible
 * @param {string} selector - The Selector element.
 * @param {string} textToSearch - Text to search in the selectors.
 */
var waitForTextToAppear = exports.waitForTextToAppear = function waitForTextToAppear(selector, textToSearch) {
  wait(selector);
  var group = $$(selector);
  browser.waitUntil(function () {
    for (var i = 0; i < group.length; i++) {
      var element = group[i];
      if (element.getText().includes(textToSearch)) {
        return true;
      }
    }
  }, 100000, selector + ' with ' + textToSearch + ' is not visible');
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
  $$(selector)[index].clearValue();
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
      return element && element.isDisplayedInViewport();
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

var Helpers = {
  click: click,
  clickWithText: clickWithText,
  waitForTextToAppear: waitForTextToAppear,
  findElementFromGroupWithText: findElementFromGroupWithText,
  load: load,
  setValue: setValue,
  wait: wait,
  waitForElementToGo: waitForElementToGo,
  waitForUrl: waitForUrl
};

exports.default = Helpers;

