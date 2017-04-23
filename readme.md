## WDIO Helpers
![alt wdio helpers](https://raw.githubusercontent.com/mohithg/mohithg.github.io/master/wdio-helpers/wdiohelpers.png)

## Functions

<dl>
<dt><a href="#wait">wait(selector)</a></dt>
<dd><p>Accepts selector to wait for the element to appear on the screen and scroll the page to that element in the screen.</p>
</dd>
<dt><a href="#click">click(selector, [index])</a></dt>
<dd><p>If there is multiple elememts with the same Selector it will choose based on the index.</p>
</dd>
<dt><a href="#setValue">setValue(selector, [index], [value])</a></dt>
<dd><p>Set Value in any selector</p>
</dd>
<dt><a href="#waitForElementToGo">waitForElementToGo(selector, [index])</a></dt>
<dd><p>Waits until element is not visible in DOM. Selector will choose based on the index.</p>
</dd>
<dt><a href="#findElementFromGroupWithText_new">findElementFromGroupWithText()(groupSelector, textToSearch)</a> ⇒ <code>element</code></dt>
<dd><p>Finds and returns the element that matches the text from the group of selectors</p>
</dd>
</dl>

<a name="wait"></a>

## wait(selector)
Accepts selector to wait for the element to appear on the screen and scroll the page to that element in the screen.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The Selector element. |

<a name="click"></a>

## click(selector, [index])
If there is multiple elememts with the same Selector it will choose based on the index.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | The Selector element. |
| [index] | <code>number</code> | <code>0</code> | index number |

<a name="setValue"></a>

## setValue(selector, [index], [value])
Set Value in any selector

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | The Selector element. |
| [index] | <code>number</code> | <code>0</code> | index number |
| [value] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Value to be set in the selector |

<a name="waitForElementToGo"></a>

## waitForElementToGo(selector, [index])
Waits until element is not visible in DOM. Selector will choose based on the index.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | The Selector element. |
| [index] | <code>number</code> | <code>0</code> | index number |

<a name="findElementFromGroupWithText_new"></a>

## findElementFromGroupWithText()(groupSelector, textToSearch) ⇒ <code>element</code>
Finds and returns the element that matches the text from the group of selectors

**Kind**: global function  
**Returns**: <code>element</code> - element - The element which matches the textToSearch from group of groupSelector or returns null if nothing is found  

| Param | Type | Description |
| --- | --- | --- |
| groupSelector | <code>string</code> | The groupSelector element. |
| textToSearch | <code>string</code> | Enter the text to search in elements |

