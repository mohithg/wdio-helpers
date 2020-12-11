import * as _ from 'lodash';

declare global {
  var browser: any;
}

/**
 * @function load
 * @desc loads the url in the browser.
 * @param {string} url - The url to navigate to.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const load = (url: string, useBrowser: any = browser) => {
  useBrowser.url(url);
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
* @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
*/
export const waitForUrl = (url: string, timeout: number, regex: boolean = false, useBrowser: any = browser) => {
  useBrowser.waitUntil(() => {
    if (regex) {
      // @ts-ignore
      return url.test(useBrowser.getUrl());
    }
    return useBrowser.getUrl() === url;
  },
  timeout,
  `***Expected ${url} instead of ${useBrowser.getUrl()}***`
  );
};

/**
 * @function wait
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * @param {string} selector - The Selector element.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const wait = (selector: string, useBrowser: any = browser) => {
  const element = useBrowser.$(selector);
  element.waitForExist({});
  element.moveTo({});
}

/**
 * @function click
 * @desc clicks the selector specified and if there are multiple elememts with the same selector it will choose based on the index.
 * Note that it waits until selector appears in the DOM. And clicks only the visible element.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const click = (selector: string, index: number = 0, useBrowser: any = browser) => {
  wait(selector, useBrowser);
  const element = useBrowser.$$(selector)[index];
  if (element.isDisplayedInViewport()) {
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
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const waitForVisible = (selector, useBrowser = browser) => {
  wait(selector);
  useBrowser.waitUntil(function() {
    return useBrowser.$(selector).isDisplayedInViewport();
  }, 100000, `Selector ${selector} is not visible`);
};

/**
 * @function waitForTextToAppear
 * @desc Accepts selector and the text of the selector to wait for the element with that text to appear in the DOM and scroll the page to that element in the screen
 * and waits until the selector with text is visible
 * @param {string} selector - The Selector element.
 * @param {string} textToSearch - Text to search in the selectors.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const waitForTextToAppear = (selector: string, textToSearch: string, useBrowser: any = browser) => {
  wait(selector, useBrowser);
  const group = useBrowser.$$(selector);
  useBrowser.waitUntil(function() {
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
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const clickWithText = (selector: string, text: string, index: number = 0, useBrowser: any = browser) => {
  const element = findElementFromGroupWithText(selector, text, index, useBrowser);
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
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const setValue = (selector: string, index: number = 0, value: string = '', useBrowser: any = browser) => {
  wait(selector, useBrowser);
  useBrowser.$$(selector)[index].clearValue();
  useBrowser.$$(selector)[index].setValue(value);
}

/**
 * @function waitForElementToGo
 * @desc Waits until element is not visible in DOM. Selector will choose based on the index.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const waitForElementToGo = (selector: string, index: number = 0, useBrowser: any = browser) => {
  useBrowser.waitUntil(() => {
    if (!_.isEmpty(useBrowser.$$(selector))) {
      const element = useBrowser.$$(selector)[index];
      return element && element.isDisplayedInViewport();
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
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export const findElementFromGroupWithText = (groupSelector: string, textToSearch: string, index: number = 0, useBrowser: any = browser) => {
  wait(groupSelector, useBrowser);
  const group = useBrowser.$$(groupSelector);
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

const Helpers = {
  click,
  clickWithText,
  waitForTextToAppear,
  findElementFromGroupWithText,
  load,
  setValue,
  wait,
  waitForElementToGo,
  waitForUrl,
  waitForVisible
};

export default Helpers;

