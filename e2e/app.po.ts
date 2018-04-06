import { browser, by, element } from 'protractor';

export class ContentfulWebPage {
  navigateTo() {
    const navigationPromise = browser.get('/');
    browser.driver.sleep(5000);
    return navigationPromise;
  }

  navigateToInfo() {
    const navigationPromise = browser.get('/info');
    browser.driver.sleep(5000);
    return navigationPromise;
  }

  hasLogo() {
    return element(by.css('asm-header .logo')).isPresent();
  }

  hasMenuItem() {
    return element(by.css('asm-menu .menuitem')).isPresent();
  }

  hasPartnersBlock() {
    return element(by.css('asm-block-sponrsors .sponsors')).isPresent();
  }
}
