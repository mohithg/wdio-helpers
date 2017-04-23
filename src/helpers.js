/**
 * @function wait
 * @desc Accepts selector to wait for the element to appear on the screen and scroll the page to that element in the screen.
 * @param {string} selector - The Selector element.
 */
export const wait = (selector) => {
  browser.waitForExist(selector);
  browser.scroll(selector);
}

/**
 * @function click
 * @desc If there is multiple elememts with the same Selector it will choose based on the index.
 * @param {string} selector - The Selector element.
 * @param {number} [index = 0] - index number
 */
export const click = (selector, index = 0) => {
  wait(selector);
  $$(selector)[index].click();
}

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
    return $$(selector)[index] && !$$(selector)[index].isVisible();
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
 * @return {element} element - The element which matches the textToSearch from group of groupSelector or returns null if nothing is found
 */
export const findElementFromGroupWithText = (groupSelector, textToSearch) => {
  wait(groupSelector);
  const group = $$(groupSelector);
  for (let i = 0; i < group.length; i++) {
    const element = group[i];
    if (element.getText().includes(textToSearch)) {
      return element;
    }
  }
  return null;
}

const Helpers = {
  click,
  setValue,
  findElementFromGroupWithText,
  wait,
  waitForElementToGo,
};

export default Helpers;

