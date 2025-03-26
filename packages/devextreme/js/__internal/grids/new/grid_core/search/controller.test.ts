/* eslint-disable spellcheck/spell-checker */
import {
  afterEach,
  describe, expect, it, jest,
} from '@jest/globals';
import type { Options } from '@ts/grids/new/grid_core/options';
import { splitHighlightedText } from '@ts/grids/new/grid_core/search/utils';

import { getContext } from '../test_utils';
import { SearchController } from './controller';

jest.mock('@ts/grids/new/grid_core/search/utils', () => ({
  splitHighlightedText: jest.fn(),
}));

const setup = (config: Options = {}) => {
  const context = getContext(config);

  const searchController = context.get(SearchController);

  return {
    searchController,
  };
};

describe('Search', () => {
  describe('Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should have highlightTextOptions$ from widget options', () => {
      const { searchController } = setup({
        searchPanel: {
          highlightSearchText: true,
          highlightCaseSensitive: false,
          text: 'TEST_SEARCH_STR',
        },
      });

      const stateSlice = searchController.highlightTextOptions.unreactive_get();

      expect(stateSlice).toStrictEqual({
        enabled: true,
        caseSensitive: false,
        searchStr: 'TEST_SEARCH_STR',
      });
    });

    it('getHighlightText should call util function', () => {
      const { searchController } = setup({
        searchPanel: {
          highlightSearchText: true,
          highlightCaseSensitive: false,
          text: 'TEST_SEARCH_STR',
        },
      });

      searchController.getHighlightedText('SOURCE_TEXT');

      expect(splitHighlightedText).toHaveBeenCalledTimes(1);
      expect(splitHighlightedText).toHaveBeenCalledWith('SOURCE_TEXT', {
        enabled: true,
        caseSensitive: false,
        searchStr: 'TEST_SEARCH_STR',
      });
    });
  });
});
