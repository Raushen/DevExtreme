import { describe, expect, it } from '@jest/globals';

import type { OptionsControllerMock } from '../../card_view/options_controller.mock';
import { DataController } from '../data_controller/data_controller';
import type { Options } from '../options';
import { OptionsController } from '../options_controller/options_controller';
import { getContext } from '../test_utils';
import { PagerView } from './view';

const createPagerView = (config?: Options) => {
  const rootElement = document.createElement('div');
  const actualOptions = config ?? {
    dataSource: [],
    pager: {
      visible: true,
    },
  };

  const context = getContext(actualOptions);

  const dataController = context.get(DataController);
  const options = context.get(OptionsController) as OptionsControllerMock;

  const pager = new PagerView(dataController, options);

  pager.render(rootElement);

  return {
    rootElement,
    options,
  };
};

describe('render', () => {
  it('empty PagerView', () => {
    const { rootElement } = createPagerView();

    expect(rootElement).toMatchSnapshot();
  });

  it('PagerView with options', () => {
    const { rootElement } = createPagerView({
      dataSource: [...new Array(20)].map((_, index) => ({ field: `test_${index}` })),
      paging: {
        pageIndex: 2,
      },
      pager: {
        showPageSizeSelector: true,
      },
    });

    expect(rootElement).toMatchSnapshot();
  });
});

describe('Applying options', () => {
  describe('when visible = \'auto\' and pageCount <= 1', () => {
    it('Pager should be hidden', () => {
      const { rootElement } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: 'auto',
          showPageSizeSelector: true,
        },
      });

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when visible = \'auto\' and pageCount > 1', () => {
    it('Pager should be visible', () => {
      const { rootElement } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: 'auto',
          showPageSizeSelector: true,
        },
      });

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when visible = \'true\'', () => {
    it('Pager should be visible', () => {
      const { rootElement } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: true,
          showPageSizeSelector: true,
        },
      });

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when visible = \'false\'', () => {
    it('Pager should be hidden', () => {
      const { rootElement } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: false,
          showPageSizeSelector: true,
        },
      });

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when changing a visible to \'false\' at runtime', () => {
    it('Pager should be hidden', () => {
      const { rootElement, options } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: true,
          showPageSizeSelector: true,
        },
      });

      options.option('pager.visible', false);

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when changing a visible to \'true\' at runtime', () => {
    it('Pager should be visible', () => {
      const { rootElement, options } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: false,
          showPageSizeSelector: true,
        },
      });

      options.option('pager.visible', true);

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when allowedPageSizes = \'auto\'', () => {
    it('calculates pageSizes by pageSize', () => {
      const { rootElement } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: true,
          allowedPageSizes: 'auto',
          showPageSizeSelector: true,
        },
      });

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when allowedPageSizes with custom values', () => {
    it('displays custom values', () => {
      const { rootElement } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          visible: 'auto',
          allowedPageSizes: [4, 10, 20],
          showPageSizeSelector: true,
        },
      });

      expect(rootElement).toMatchSnapshot();
    });
  });

  describe('when changing an allowedPageSizes to custom values at runtime', () => {
    it('applies custom values', () => {
      const { rootElement, options } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({ field: `test_${index}` })),
        paging: {
          pageIndex: 6,
        },
        pager: {
          allowedPageSizes: 'auto',
          showPageSizeSelector: true,
        },
      });

      options.option('pager.allowedPageSizes', [4, 10, 20]);

      expect(rootElement).toMatchSnapshot();
    });
  });
});
