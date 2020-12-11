declare global {
    var browser: any;
}
/**
 * @function load
 * @desc loads the url in the browser.
 * @param {string} url - The url to navigate to.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const load: (url: string, useBrowser?: any) => void;
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
export declare const waitForUrl: (url: string, timeout: number, regex?: boolean, useBrowser?: any) => void;
/**
 * @function wait
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * @param {string} selector - The Selector element.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const wait: (selector: string, useBrowser?: any) => void;
/**
 * @function click
 * @desc clicks the selector specified and if there are multiple elememts with the same selector it will choose based on the index.
 * Note that it waits until selector appears in the DOM. And clicks only the visible element.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const click: (selector: string, index?: number, useBrowser?: any) => void;
/**
 * @function waitForVisible
 * @desc Accepts selector to wait for the element to appear in the DOM and scroll the page to that element in the screen.
 * and waits until the selector is visible
 * @param {string} selector - The Selector element.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const waitForVisible: (selector: any, useBrowser?: any) => void;
/**
 * @function waitForTextToAppear
 * @desc Accepts selector and the text of the selector to wait for the element with that text to appear in the DOM and scroll the page to that element in the screen
 * and waits until the selector with text is visible
 * @param {string} selector - The Selector element.
 * @param {string} textToSearch - Text to search in the selectors.
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const waitForTextToAppear: (selector: string, textToSearch: string, useBrowser?: any) => void;
/**
 * @function clickWithText
 * @desc finds the selector with text and clicks and if there are multiple elememts with the same text, it will click based on the index. Note that it waits until selector appears in the DOM.
 * @param {string} selector - Selector for the element.
 * @param {string} text - The text element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const clickWithText: (selector: string, text: string, index?: number, useBrowser?: any) => void;
/**
 * @function setValue
 * @desc Set Value in any selector
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param {string} [value = ''] - Value to be set in the selector
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const setValue: (selector: string, index?: number, value?: string, useBrowser?: any) => void;
/**
 * @function waitForElementToGo
 * @desc Waits until element is not visible in DOM. Selector will choose based on the index.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const waitForElementToGo: (selector: string, index?: number, useBrowser?: any) => void;
/**
 * @function findElementFromGroupWithText()
 * @desc Finds and returns the element that matches the text from the group of selectors
 * @param {string} groupSelector - The groupSelector element.
 * @param {string} textToSearch - Enter the text to search in elements
 * @param {number} [index = 0] - index number
 * @return {element} element - The element which matches the textToSearch from group of groupSelector or returns null if nothing is found
 * @param useBrowser - Optional browser instance to use, otherwise defaults to global browser
 */
export declare const findElementFromGroupWithText: (groupSelector: string, textToSearch: string, index?: number, useBrowser?: any) => any;
declare const Helpers: {
    click: (selector: string, index?: number, useBrowser?: any) => void;
    clickWithText: (selector: string, text: string, index?: number, useBrowser?: any) => void;
    waitForTextToAppear: (selector: string, textToSearch: string, useBrowser?: any) => void;
    findElementFromGroupWithText: (groupSelector: string, textToSearch: string, index?: number, useBrowser?: any) => any;
    load: (url: string, useBrowser?: any) => void;
    setValue: (selector: string, index?: number, value?: string, useBrowser?: any) => void;
    wait: (selector: string, useBrowser?: any) => void;
    waitForElementToGo: (selector: string, index?: number, useBrowser?: any) => void;
    waitForUrl: (url: string, timeout: number, regex?: boolean, useBrowser?: any) => void;
    waitForVisible: (selector: any, useBrowser?: any) => void;
};
export default Helpers;
