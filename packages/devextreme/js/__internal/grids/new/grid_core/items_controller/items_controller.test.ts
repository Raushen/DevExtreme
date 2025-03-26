/* eslint-disable spellcheck/spell-checker */
import { describe, expect, it } from '@jest/globals';

import { ColumnsController } from '../columns_controller/columns_controller';
import type { Options } from '../options';
import { getContext } from '../test_utils';
import { ItemsController } from './items_controller';

const setup = (config: Options = {}) => {
  const context = getContext(config);

  const columnsController = context.get(ColumnsController);
  const itemsController = context.get(ItemsController);

  return {
    columnsController,
    itemsController,
  };
};

describe('ItemsController', () => {
  describe('createDataRow', () => {
    it('should process data object to data row using column configuration', () => {
      const dataObject = { id: 1, a: 'my a value', b: 'my b value' };
      const { columnsController, itemsController } = setup({
        keyExpr: 'id',
        dataSource: [dataObject],
        columns: [
          'a',
          { dataField: 'b' },
        ],
      });

      const columns = columnsController.columns.unreactive_get();
      const dataRow = itemsController.createDataRow(dataObject, columns, 0);
      expect(dataRow).toMatchSnapshot();
    });

    it('should process data object to data row using column configuration', () => {
      const dataObject = { id: 1, a: 'my a value', b: 'my b value' };
      const { columnsController, itemsController } = setup({
        keyExpr: 'id',
        dataSource: [dataObject],
        columns: [
          'a',
          { dataField: 'b' },
        ],
      });

      const columns = columnsController.columns.unreactive_get();
      const dataRow = itemsController.createDataRow(dataObject, columns, 0);
      expect(dataRow).toMatchSnapshot();
    });
  });
});
