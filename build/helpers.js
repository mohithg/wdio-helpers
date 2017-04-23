'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @function wait
 * @desc Accepts selector to wait for the element to appear on the screen and scroll the page to that element in the screen.
 * @param {string} selector - The Selector element.
 */
var wait = exports.wait = function wait(selector) {
  browser.waitForExist(selector);
  browser.scroll(selector);
};

/**
 * @function click
 * @desc If there is multiple elememts with the same Selector it will choose based on the index.
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
    if (!_.isEmpty($$(selector))) {
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

var Helpers = {
  click: click,
  setValue: setValue,
  findElementFromGroupWithText: findElementFromGroupWithText,
  wait: wait,
  waitForElementToGo: waitForElementToGo
};

exports.default = Helpers;

