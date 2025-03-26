/* eslint-disable spellcheck/spell-checker */
import { describe, expect, it } from '@jest/globals';

import { getContext } from '../test_utils';
import { ToolbarController } from '../toolbar/controller';
import type { Options } from './options';

const setup = (config: Options) => {
  const context = getContext(config);

  const toolbarController = context.get(ToolbarController);

  return {
    toolbarController,
  };
};

describe('EditingController', () => {
  describe('addButton', () => {
    it.skip('should be added to toolbar', () => {
      const { toolbarController } = setup({});

      expect(
        toolbarController.items.unreactive_get(),
      ).toMatchSnapshot('should contain correct text, css class');
    });
  });
});
