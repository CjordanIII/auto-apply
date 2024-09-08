## To run playwrite

npx playwright install

## common commands for playwright

```
bashscript

Snippet	Content
p-td	test.describe()
p-t	test()
p-ts	test.step()
p-tbe	test.beforeEach()
p-tae	test.afterEach()
p-tba	test.beforeAll()
p-taa	test.afterAll()
p-tuse	test.use()
Imports
Snippet	Content
p-i-pw	Playwright module
p-i-chromium	Import Chromium
p-i-firefox	Import Firefox
p-i-webkit	Import Webkit
p-i-devices	Import devices
Browser actions
Snippet	Content
p-browser-newContext	browser.newContext()
p-browser-newPage	browser.newPage()
p-connect-chromium	Connect Chromium
p-l-chromium	Launch Chromium
p-ls-chromium	Launch Chromium Server
p-connect-firefox	Connect Firefox
p-l-firefox	Launch Firefox
p-ls-firefox	Launch Firefox Server
p-connect-webkit	Connect Webkit
p-l-webkit	Launch Webkit
p-ls-webkit	Launch Webkit Server
p-b-contexts	browser.contexts
p-b-close	browser.close
p-b-isConnected	browser.isConnected
p-b-version	browser.version
p-b-on-disconnected	browser.on('disconnected')
p-bs-close	browserServer.close
p-bs-kill	browserServer.kill
p-bs-on-close	browserServer.on('close')
Context actions
Snippet	Content
p-context-newPage	context.newPage()
p-context-pages	context.pages()
p-bc-close	browserContext.close
p-bc-cookies	browserContext.cookies
p-bc-route	browserContext.route
p-bc-unroute	browserContext.unroute
p-bc-on-close	browserContext.on('close')
p-bc-on-page	browserContext.on('page')
Page actions
Snippet	Content
p-goto	page.goto()
p-clk	page.click()
p-dbclk	page.dblclick()
p-clki	page.nth().click()
p-chk	page.check()
p-uchk	page.uncheck()
p-hover	page.hover()
p-press	page.press() with options
p-sif	page.setInputFiles()
p-screenshot-full	Full page screenshot
p-screenshot-element	Element screenshot
p-title	page.title()
p-url	page.url()
p-fill	page.fill()
p-type	page.type()
p-so	page.selectOption()
p-isv	page.isVisible()
p-ish	page.isHidden()
p-isc	page.isChecked()
p-isen	page.isEnabled()
p-isd	page.isDisabled()
p-ised	page.isEditable()
p-getattr	page.getAttribute()
p-itxt	page.innerText()
p-count	page.count()
p-focus	page.focus()
p-goBack	page.goBack()
p-goFwd	page.goForward()
p-bringToFront	page.bringToFront
p-close	page.close
p-content	page.content
p-pdf	page.pdf
p-keyboard-press	page.keyboard.press
p-keyboard-insertText	page.keyboard.insertText
p-keyboard-up	page.keyboard.up
p-mouse-clk	page.mouse.click
p-mouse-dbclk	page.mouse.dblclick
p-mouse-down	page.mouse.down
p-mouse-move	page.mouse.move
p-mouse-up	page.mouse.up
Page.on snippets
Snippet	Content
p-on-close	page.on('close')
p-on-console	page.on('console')
p-on-crash	page.on('crash')
p-on-dialog	page.on('dialog')
p-on-domcontentloaded	page.on('domcontentloaded')
p-on-frameattached	page.on('frameattached')
p-on-framedetached	page.on('framedetached')
p-on-framenavigated	page.on('framenavigated')
p-on-load	page.on('load')
p-on-pageerror	page.on('pageerror')
p-on-popup	page.on('popup')
p-on-request	page.on('request')
p-on-requestfailed	page.on('requestfailed')
p-on-requestfinished	page.on('requestfinished')
p-on-response	page.on('response')
p-on-worker	page.on('worker')
Page assertion/expect actions
Snippet	Content
p-etbv	page.toBeVisible()
p-etbh	page.toBeHidden()
p-etbe	page.toBeEnabled()
p-etbd	page.toBeDisabled()
p-etbc	page.toBeChecked()
p-etb	expect.toBe()
p-etht	expect.toHaveTitle()
p-etctxt	expect.toContainText()
p-ethattr	expect.toHaveAttribute()
p-ethc	expect.toHaveCount()
p-ethtxt	expect.toHaveText()
p-ethURL	expect.toHaveURL()
p-ethss	expect.toHaveScreenshot()
New Advanced Locators
Snippet	Content
p-get-txt	page.getByText
p-get-r	page.getByRole
p-get-l	page.getByLabel
p-get-ti	page.getByTestId
p-get-p	page.getByPlaceholder
p-get-atxt	page.getByAltText
p-get-title	page.getByTitle
p-locator	page.locate
p-$	page.$
p-$$	page.$$
p-$eval	page.$eval
p-$$eval	page.$$eval
p-locator-filter	page.locator.filter
Page wait actions
Snippet	Content
p-wf	page.waitFor()
p-wfs	page.waitForSelector()
p-wfls	page.waitForLoadState()
p-wft	page.waitForTimeout()
p-wfe	page.waitForEvent()
p-wff	page.waitForFunction()
p-wfn	page.waitForNavigation()
p-wfreq	page.waitForRequest()
p-wfres	page.waitForResponse()
Other actions
Snippet	Content
p-pam	public async method() {...}
p-newPage	Handle new tab/ page
p-newPopup	Handle popups
p-testBlock	Complete test block
p-saveHAR	Save HAR file
p-route	page.route
p-sample	Sample playwright test
p-dragdrop-sample	drag and drop example
p-config-expect	expect.configure()
```

## for code gen

```bashscript
npx playwright codegen <URL>
npx playwright codegen https://example.com
```
# auto-apply
