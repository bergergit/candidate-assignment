import { browser, by, element, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './app.po';

export class CompetitionsPage extends PageObjectBase {
  constructor() {
    super('app-competitions', '/competitions');
  }

  competitionList() {
    return this.allElements('ion-list ion-item');
  }

  waitForActionSheetToBeVisible() {
    const actionSheetElement = element(by.css('ion-action-sheet'));
    return browser.wait(ExpectedConditions.visibilityOf(actionSheetElement), 3000);
  }

  waitForCompetitionsToBeVisible() {
    const listElement = element(by.css(`${this.tag} ion-list`));
    return browser.wait(ExpectedConditions.presenceOf(listElement), 15000);
  }

  actionSheetButtons() {
    const actionSheetButtons = element.all(by.css('ion-action-sheet button'));
    return element.all(by.css('ion-action-sheet button'));
  }
}
