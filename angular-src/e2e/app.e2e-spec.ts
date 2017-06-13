import { AngularStatustrackingPage } from './app.po';

describe('angular-statustracking App', () => {
  let page: AngularStatustrackingPage;

  beforeEach(() => {
    page = new AngularStatustrackingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
