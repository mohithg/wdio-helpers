import _ from 'lodash';
/**
 * @function load
 * @desc loads the url in the browser.
 * @param {string} url - The url to navigate to.
 */
export const load = (url) => {
  browser.url(url);
}

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
export const waitForUrl = (url, timeout, regex = false) => {
  browser.waitUntil(() => {
    if (regex) {
      return url.test(browser.getUrl());
    }
    return browser.getUrl() === url;
  },
  timeout,
  `***Expected ${url} instead of ${browser.getUrl()}***`
  );
};

/**
 * @function wait
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * @param {string} selector - The Selector element.
 */
export const wait = (selector) => {
  browser.waitForExist(selector);
  browser.scroll(selector);
}

/**
 * @function click
 * @desc clicks the selector specified and if there are multiple elememts with the same selector it will choose based on the index.
 * Note that it waits until selector appears in the DOM. And clicks only the visible element.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 */
export const click = (selector, index = 0) => {
  wait(selector);
  const element = $$(selector)[index];
  if (element.isVisible()) {
    element.click();
  } else {
    console.log('Element is not visible to click');
  }
}

/**
 * @function waitForVisible
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * and waits until the selector is visible
 * @param {string} selector - The Selector element.
 */
export const waitForVisible = (selector) => {
  wait(selector);
  browser.waitUntil(function() {
    return $(selector).isVisible();
  }, 100000, 'Selector is not visible');
};

/**
 * @function waitForTextToAppear
 * @desc Accepts selector and the text of the selector to wait for the element with that text to appear in the DOM and scroll the page to that element in the screen
 * and waits until the selector with text is visible
 * @param {string} selector - The Selector element.
 * @param {string} textToSearch - Text to search in the selectors.
 */
const waitForTextToAppear = (selector, textToSearch) => {
  wait(selector);
  const group = $$(selector);
  browser.waitUntil(function() {
    for (let i = 0; i < group.length; i++) {
      const element = group[i];
      if (element.getText().includes(textToSearch)) {
        return true;
      }
    }
  }, 100000, `${selector} with ${textToSearch} is not visible`);
};

/**
 * @function clickWithText
 * @desc finds the selector with text and clicks and if there are multiple elememts with the same text, it will click based on the index. Note that it waits until selector appears in the DOM.
 * @param {string} selector - Selector for the element.
 * @param {string} text - The text element.
 * @param {number} [index = 0] - index number
 */
export const clickWithText = (selector, text, index = 0) => {
  const element = findElementFromGroupWithText(selector, text, index);
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
export const setValue = (selector, index = 0, value = '') => {
  wait(selector);
  $$(selector)[index].clearElement();
  $$(selector)[index].setValue(value);
}

/**
 * @function waitForElementToGo
 * @desc Waits until element is not visible in DOM. Selector will choose based on the index.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 */
export const waitForElementToGo = (selector, index = 0) => {
  browser.waitUntil(() => {
    if (!_.isEmpty($$(selector))) {
      const element = $$(selector)[index];
      return element.isVisible();
    } else {
        return true;
    }
  }, 100000, `${selector} didnot go until timeout`);
}

/**
 * @function findElementFromGroupWithText()
 * @desc Finds and returns the element that matches the text from the group of selectors
 * @param {string} groupSelector - The groupSelector element.
 * @param {string} textToSearch - Enter the text to search in elements
 * @param {number} [index = 0] - index number
 * @return {element} element - The element which matches the textToSearch from group of groupSelector or returns null if nothing is found
 */
export const findElementFromGroupWithText = (groupSelector, textToSearch, index = 0) => {
  wait(groupSelector);
  const group = $$(groupSelector);
  let elements = [];
  for (let i = 0; i < group.length; i++) {
    const element = group[i];
    if (element.getText().includes(textToSearch)) {
      elements = _.concat(elements, element);
    }
  }
  if (!_.isEmpty(elements)) {
    return elements[index];
  }
  return null;
}

/**
 * @function logConsoleOutput(type)
 * @desc Returns the console errors from browser
 * @param {string} type - Type can be INFO, WARNING, SEVERE. If no type is provided, all messages are returned.
 * @return {array} array - Returns the console errors from browser
 */
export const logConsoleOutput = (type) => {
  let data = browser.log('browser').value;
  if (type) {
    data = _.filter(data, each => each.level == type)
  }
  return _.map(data, field => field.message);
};

const Helpers = {
  click,
  clickWithText,
  waitForTextToAppear,
  findElementFromGroupWithText,
  load,
  logConsoleOutput,
  setValue,
  wait,
  waitForElementToGo,
};

export default Helpers;

