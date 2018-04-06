import { ContentfulWebPage } from './app.po';
import { browser } from 'protractor';

describe('contentful-web App', () => {
  let page: ContentfulWebPage;

  beforeEach(() => {
    page = new ContentfulWebPage();
    browser.waitForAngularEnabled(false);
  });

  it('should contain ASSEMBLY logo, menu item and partners block', () => {
    page.navigateTo().then(() => {
      setTimeout(() => {
        expect(page.hasLogo()).toBeTruthy();
        expect(page.hasMenuItem()).toBeTruthy();
        expect(page.hasPartnersBlock()).toBeTruthy();
      }, 1000);
    });
  });

});
