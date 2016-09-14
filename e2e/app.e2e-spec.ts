import { AmbassadeursPage } from './app.po';

describe('ambassadeurs App', function() {
  let page: AmbassadeursPage;

  beforeEach(() => {
    page = new AmbassadeursPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
