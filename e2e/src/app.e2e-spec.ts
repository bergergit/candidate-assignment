import { browser } from 'protractor';
import { CompetitionsPage } from './competitions.po';
import { RootPage } from './root.po';

describe('When App is opened', () => {
  const rootPage = new RootPage();
  const competitionsPage = new CompetitionsPage();

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    rootPage.load();
  });

  it('should say Competitions', async () => {
    rootPage.waitUntilVisible();
    const pageTitle = await rootPage.getTitle();
    expect(pageTitle).toBe('Competitions');
  });

  describe('Competitions screen', () => {
    beforeEach(async () => {
      await rootPage.navigateTo('/competitions');
    });

    it('should display the main Competitions element', async () => {
      const isDisplayed = await (competitionsPage.rootElement().isDisplayed());
      expect(isDisplayed).toEqual(true);
    });

    it('should show a list of Competitions after selecting a season', async () => {
      await competitionsPage.clickButton('selectSeasonButton');
      await competitionsPage.waitForActionSheetToBeVisible();
      const actionSheetButtons = await competitionsPage.actionSheetButtons();
      browser.executeScript('arguments[0].click();', actionSheetButtons[4].getWebElement());
      await competitionsPage.waitForCompetitionsToBeVisible();
      const competitionListLength = (await competitionsPage.competitionList()).length;
      expect(competitionListLength).toBeGreaterThanOrEqual(5);

    });
  });
});
