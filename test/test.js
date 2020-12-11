import {click,
    clickWithText,
    waitForTextToAppear,
    load,
    setValue,
    waitForVisible,
    waitForElementToGo,
    waitForUrl} from '../build/helpers';

describe ('Google', () => {
    it('Navigate to gooole', () => {
        load('https://webdriver.io');
        click('.slidingNav');
        waitForVisible('a');
        clickWithText('a', 'API');
        waitForTextToAppear("h1", "API Docs");
        waitForElementToGo('h1', 0);
        setValue('input', 0, "something");
        browser.pause(3000);
        clickWithText('a', 'API');
        waitForUrl("https://webdriver.io/docs/api.html");
        browser.pause(3000);
        // setValue('.gLFyf.gsfi', 0, 'wdio-helpers');
    })
})
