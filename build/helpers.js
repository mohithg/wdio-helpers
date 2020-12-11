"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findElementFromGroupWithText = exports.waitForElementToGo = exports.setValue = exports.clickWithText = exports.waitForTextToAppear = exports.waitForVisible = exports.click = exports.wait = exports.waitForUrl = exports.load = void 0;
const lodash_1 = require("lodash");
/**
 * @function load
 * @desc loads the url in the browser.
 * @param {string} url - The url to navigate to.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const load = (url, useBrowser = browser) => {
    useBrowser.url(url);
};
exports.load = load;
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
const waitForUrl = (url, timeout, regex = false, useBrowser = browser) => {
    useBrowser.waitUntil(() => {
        if (regex) {
            // @ts-ignore
            return url.test(useBrowser.getUrl());
        }
        return useBrowser.getUrl() === url;
    }, timeout, `***Expected ${url} instead of ${useBrowser.getUrl()}***`);
};
exports.waitForUrl = waitForUrl;
/**
 * @function wait
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * @param {string} selector - The Selector element.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const wait = (selector, useBrowser = browser) => {
    const element = useBrowser.$(selector);
    element.waitForExist({});
    element.moveTo({});
};
exports.wait = wait;
/**
 * @function click
 * @desc clicks the selector specified and if there are multiple elememts with the same selector it will choose based on the index.
 * Note that it waits until selector appears in the DOM. And clicks only the visible element.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const click = (selector, index = 0, useBrowser = browser) => {
    exports.wait(selector, useBrowser);
    const element = useBrowser.$$(selector)[index];
    if (element.isDisplayedInViewport()) {
        element.click();
    }
    else {
        console.log('Element is not visible to click');
    }
};
exports.click = click;
/**
 * @function waitForVisible
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * and waits until the selector is visible
 * @param {string} selector - The Selector element.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const waitForVisible = (selector, useBrowser = browser) => {
    exports.wait(selector);
    useBrowser.waitUntil(function () {
        return useBrowser.$(selector).isDisplayedInViewport();
    }, 100000, `Selector ${selector} is not visible`);
};
exports.waitForVisible = waitForVisible;
/**
 * @function waitForTextToAppear
 * @desc Accepts selector and the text of the selector to wait for the element with that text to appear in the DOM and scroll the page to that element in the screen
 * and waits until the selector with text is visible
 * @param {string} selector - The Selector element.
 * @param {string} textToSearch - Text to search in the selectors.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const waitForTextToAppear = (selector, textToSearch, useBrowser = browser) => {
    exports.wait(selector, useBrowser);
    const group = useBrowser.$$(selector);
    useBrowser.waitUntil(function () {
        for (let i = 0; i < group.length; i++) {
            const element = group[i];
            if (element.getText().includes(textToSearch)) {
                return true;
            }
        }
    }, 100000, `${selector} with ${textToSearch} is not visible`);
};
exports.waitForTextToAppear = waitForTextToAppear;
/**
 * @function clickWithText
 * @desc finds the selector with text and clicks and if there are multiple elememts with the same text, it will click based on the index. Note that it waits until selector appears in the DOM.
 * @param {string} selector - Selector for the element.
 * @param {string} text - The text element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const clickWithText = (selector, text, index = 0, useBrowser = browser) => {
    const element = exports.findElementFromGroupWithText(selector, text, index, useBrowser);
    if (element) {
        element.click();
    }
    else {
        new Error('No Element with text found');
    }
};
exports.clickWithText = clickWithText;
/**
 * @function setValue
 * @desc Set Value in any selector
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param {string} [value = ''] - Value to be set in the selector
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const setValue = (selector, index = 0, value = '', useBrowser = browser) => {
    exports.wait(selector, useBrowser);
    useBrowser.$$(selector)[index].clearValue();
    useBrowser.$$(selector)[index].setValue(value);
};
exports.setValue = setValue;
/**
 * @function waitForElementToGo
 * @desc Waits until element is not visible in DOM. Selector will choose based on the index.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const waitForElementToGo = (selector, index = 0, useBrowser = browser) => {
    useBrowser.waitUntil(() => {
        if (!lodash_1.default.isEmpty(useBrowser.$$(selector))) {
            const element = useBrowser.$$(selector)[index];
            return element && element.isDisplayedInViewport();
        }
        else {
            return true;
        }
    }, 100000, `${selector} didnot go until timeout`);
};
exports.waitForElementToGo = waitForElementToGo;
/**
 * @function findElementFromGroupWithText()
 * @desc Finds and returns the element that matches the text from the group of selectors
 * @param {string} groupSelector - The groupSelector element.
 * @param {string} textToSearch - Enter the text to search in elements
 * @param {number} [index = 0] - index number
 * @return {element} element - The element which matches the textToSearch from group of groupSelector or returns null if nothing is found
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
const findElementFromGroupWithText = (groupSelector, textToSearch, index = 0, useBrowser = browser) => {
    exports.wait(groupSelector, useBrowser);
    const group = useBrowser.$$(groupSelector);
    let elements = [];
    for (let i = 0; i < group.length; i++) {
        const element = group[i];
        if (element.getText().includes(textToSearch)) {
            elements = lodash_1.default.concat(elements, element);
        }
    }
    if (!lodash_1.default.isEmpty(elements)) {
        return elements[index];
    }
    return null;
};
exports.findElementFromGroupWithText = findElementFromGroupWithText;
const Helpers = {
    click: exports.click,
    clickWithText: exports.clickWithText,
    waitForTextToAppear: exports.waitForTextToAppear,
    findElementFromGroupWithText: exports.findElementFromGroupWithText,
    load: exports.load,
    setValue: exports.setValue,
    wait: exports.wait,
    waitForElementToGo: exports.waitForElementToGo,
    waitForUrl: exports.waitForUrl,
    waitForVisible: exports.waitForVisible
};
exports.default = Helpers;
