/* eslint-disable spellcheck/spell-checker */
import { DIContext } from '@ts/core/di';

import { ColumnsController } from './columns_controller';
import { DataController } from './data_controller';
import { EditingController } from './editing/controller';
import { FilterController } from './filtering';
import { HeaderFilterController } from './filtering/header_filter';
import { ItemsController } from './items_controller/items_controller';
import type { Options } from './options';
import { OptionsController } from './options_controller/options_controller';
import { OptionsControllerMock } from './options_controller/options_controller.mock';
import { SearchController } from './search';
import { SortingController } from './sorting_controller';
import { ToolbarController } from './toolbar/controller';

function registerControllers(diContext: DIContext): void {
  diContext.register(FilterController);
  diContext.register(ColumnsController);
  diContext.register(ToolbarController);
  diContext.register(SearchController);
  diContext.register(SortingController);
  diContext.register(EditingController);
  diContext.register(DataController);
  diContext.register(ItemsController);
  diContext.register(HeaderFilterController);
}

export function getContext(config: Options = {}): DIContext {
  const diContext = new DIContext();
  registerControllers(diContext);

  const options = new OptionsControllerMock(config);
  diContext.registerInstance(OptionsController, options);

  return diContext;
}
