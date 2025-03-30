import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import CardView from 'devextreme-testcafe-models/cardView';
import url from '../../../helpers/getPageUrl';
import { createWidget } from '../../../helpers/createWidget';
import { testScreenshot } from '../../../helpers/themeUtils';
import { data } from '../helpers/simpleArrayData';

fixture`Search.Visual`
  .page(url(__dirname, '../../container.html'));

const CARD_VIEW_SELECTOR = '#container';

test('highlighted search text', async (t) => {
  const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

  const cardView = new CardView(CARD_VIEW_SELECTOR);

  await testScreenshot(t, takeScreenshot, 'card-view_search_text-highlighting.png', { element: cardView.element });

  await t
    .expect(compareResults.isValid())
    .ok(compareResults.errorMessages());
}).before(async () => createWidget('dxCardView', {
  dataSource: data,
  searchPanel: {
    visible: true,
    text: 'rt',
  },
  height: 600,
}));
