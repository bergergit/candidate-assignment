import { browser, by, element, ExpectedConditions } from 'protractor';

export class PageObjectBase {
  protected tag: string;
  private path: string;

  constructor(tag: string, path: string) {
    this.tag = tag;
    this.path = path;
  }

  load() {
    return browser.get(this.path);
  }

  rootElement() {
    return element(by.css(this.tag));
  }

  allElements(sel: string) {
    return element.all(by.css(`${this.tag} ${sel}`));
  }

  waitUntilInvisible() {
    browser.wait(ExpectedConditions.invisibilityOf(this.rootElement()), 3000);
  }

  waitUntilPresent() {
    browser.wait(ExpectedConditions.presenceOf(this.rootElement()), 3000);
  }

  waitUntilNotPresent() {
    browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(this.rootElement())), 3000);
  }

  waitUntilVisible() {
    browser.wait(ExpectedConditions.visibilityOf(this.rootElement()), 3000);
  }

  getTitle() {
    return element(by.css(`${this.tag} ion-title`)).getText();
  }

  navigateTo(destination) {
    return browser.get(destination);
  }

  async clickButton(sel: string) {
    const el = element(by.id(sel));
    await browser.wait(ExpectedConditions.visibilityOf(el), 5000);
    return browser.executeScript('arguments[0].click();', el.getWebElement());
  }

}
