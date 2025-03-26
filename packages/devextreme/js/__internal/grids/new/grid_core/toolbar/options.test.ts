import { describe, expect, it } from '@jest/globals';

import type { Options } from '../options';
import { OptionsController } from '../options_controller/options_controller';
import type { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { getContext } from '../test_utils';
import { ToolbarController } from './controller';
import { ToolbarView } from './view';

const setup = (config?: Options) => {
  const actualOptions = config ?? {
    toolbar: {
      visible: true,
    },
  };
  const context = getContext(actualOptions);

  const toolbarController = context.get(ToolbarController);
  const options = context.get(OptionsController) as OptionsControllerMock;

  const rootElement = document.createElement('div');
  const toolbarView = new ToolbarView(toolbarController, options);
  toolbarView.render(rootElement);

  return {
    rootElement,
    options,
  };
};

describe('Options', () => {
  describe('visilbe', () => {
    describe('when it is \'true\'', () => {
      it('Toolbar should be visible', () => {
        const { rootElement } = setup({
          toolbar: {
            visible: true,
          },
        });

        expect(rootElement).toMatchSnapshot();
      });
    });

    describe('when it is \'false\'', () => {
      it('Toolbar should be hidden', () => {
        const { rootElement } = setup({
          toolbar: {
            visible: false,
          },
        });

        expect(rootElement).toMatchSnapshot();
      });
    });

    describe('when changing it to \'false\' at runtime', () => {
      it('Toolbar should be hidden', () => {
        const { rootElement, options } = setup({
          toolbar: {
            visible: true,
          },
        });

        options.option('toolbar.visible', false);

        expect(rootElement).toMatchSnapshot();
      });
    });

    describe('when changing it to \'true\' at runtime', () => {
      it('Toolbar should be visible', () => {
        const { rootElement, options } = setup({
          toolbar: {
            visible: false,
          },
        });

        options.option('toolbar.visible', true);

        expect(rootElement).toMatchSnapshot();
      });
    });
  });

  describe('items', () => {
    describe('when these are not set', () => {
      it('Toolbar should be hidden', () => {
        const { rootElement } = setup({
          toolbar: {
            items: [],
          },
        });

        expect(rootElement).toMatchSnapshot();
      });
    });

    describe('when these are set', () => {
      it('Toolbar should be visible', () => {
        const { rootElement } = setup({
          toolbar: {
            items: [{
              location: 'before',
              widget: 'dxButton',
              options: {
                text: 'button1',
              },
            }, {
              location: 'after',
              widget: 'dxButton',
              options: {
                text: 'button2',
              },
            }],
          },
        });

        expect(rootElement).toMatchSnapshot();
      });
    });
  });

  describe('disabled', () => {
    describe('when it is \'true\'', () => {
      it('Toolbar should be disabled', () => {
        const { rootElement } = setup({
          toolbar: {
            visible: true,
            disabled: true,
          },
        });

        expect(rootElement).toMatchSnapshot();
      });
    });

    describe('when it is \'false\'', () => {
      it('Toolbar should not be disabled', () => {
        const { rootElement } = setup({
          toolbar: {
            visible: true,
            disabled: false,
          },
        });

        expect(rootElement).toMatchSnapshot();
      });
    });
  });
});
