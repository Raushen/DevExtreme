/* eslint-disable spellcheck/spell-checker */

import { describe, expect, it } from '@jest/globals';
import { state } from '@ts/core/reactive';

import type { Options } from '../options';
import { getContext } from '../test_utils';
import { ToolbarController } from './controller';

const setup = (config?: Options) => {
  const actualOptions = config ?? {
    toolbar: {
      visible: true,
    },
  };
  const context = getContext(actualOptions);

  const toolbarController = context.get(ToolbarController);

  return {
    toolbarController,
  };
};

describe('ToolbarController', () => {
  describe('items', () => {
    describe('when user items are specified', () => {
      it('should contain processed toolbar items', () => {
        const { toolbarController } = setup({
          toolbar: {
            items: [{ location: 'before' }],
          },
        });

        expect(toolbarController.items.unreactive_get()).toStrictEqual([{ location: 'before' }]);
      });
    });

    describe('when default items and user items are specified', () => {
      it('should contain processed toolbar items', () => {
        const { toolbarController } = setup({
          toolbar: {
            items: ['searchPanel', { location: 'before' }],
          },
        });

        toolbarController.addDefaultItem({ name: 'searchPanel', location: 'after' });

        expect(toolbarController.items.unreactive_get()).toStrictEqual([
          { name: 'searchPanel', location: 'after' },
          { location: 'before' },
        ]);
      });
    });
  });

  describe('addDefaultItem', () => {
    it('should add new default item to items', () => {
      const { toolbarController } = setup();

      toolbarController.addDefaultItem({ name: 'searchPanel', location: 'after' });

      expect(toolbarController.items.unreactive_get()).toStrictEqual([
        { name: 'searchPanel', location: 'after' },
      ]);
    });

    it('item should toggle default item when needUpdate changes', () => {
      const { toolbarController } = setup();
      const needRender = state(true);

      toolbarController.addDefaultItem({ name: 'searchPanel', location: 'after' }, needRender);

      expect(toolbarController.items.unreactive_get()).toStrictEqual([
        { name: 'searchPanel', location: 'after' },
      ]);

      needRender.update(false);
      expect(toolbarController.items.unreactive_get()).toStrictEqual([]);

      needRender.update(true);
      expect(toolbarController.items.unreactive_get()).toStrictEqual([
        { name: 'searchPanel', location: 'after' },
      ]);
    });
  });
});
