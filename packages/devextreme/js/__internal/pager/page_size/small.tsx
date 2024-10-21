/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RefObject } from '@devextreme/runtime/inferno';
import { InfernoComponent, InfernoEffect } from '@devextreme/runtime/inferno';

import messageLocalization from '../../../localization/message';
import { PaginationDefaultProps, type PaginationProps } from '../common/pagination_props';
import type { FullPageSize } from '../common/types';
import { SelectBox } from '../drop_down_editors/select_box';
import { calculateValuesFittedWidth } from '../utils/calculate_values_fitted_width';
import { getElementMinWidth } from '../utils/get_element_width';

export interface PaginationSmallProps {
  parentRef?: RefObject<HTMLElement>;
  allowedPageSizes: FullPageSize[];
  inputAttr?: any;
}

const PaginationSmallDefaultProps: PaginationSmallProps = {
  inputAttr: {
    'aria-label': messageLocalization.format('dxPager-ariaPageSize'),
  },
  allowedPageSizes: [],
};

type PageSizeSmallPropsType = PaginationSmallProps & Pick<PaginationProps, 'pageSize' | 'pageSizeChangedInternal'>;

const PageSizeSmallDefaultProps: PageSizeSmallPropsType = {
  ...PaginationSmallDefaultProps,
  pageSize: PaginationDefaultProps.pageSize,
  pageSizeChangedInternal: PaginationDefaultProps.pageSizeChangedInternal,
};

export class PageSizeSmall extends InfernoComponent<PageSizeSmallPropsType> {
  public state = {
    minWidth: 10,
  };

  public refs: any = null;

  constructor(props) {
    super(props);
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentWillUpdate(nextProps: PageSizeSmallPropsType, nextState, context): void {
    super.componentWillUpdate(nextProps, nextState, context);
  }

  createEffects(): InfernoEffect[] {
    const dependency = [
      this.props,
      this.state.minWidth,
      this.props.pageSize,
      this.props.pageSizeChangedInternal,
      this.props.allowedPageSizes,
      this.props.inputAttr,
    ];
    return [new InfernoEffect(this.updateWidth, dependency)];
  }

  updateEffects(): void {
    const dependency = [
      this.props,
      this.state.minWidth,
      this.props.pageSize,
      this.props.pageSizeChangedInternal,
      this.props.allowedPageSizes,
      this.props.inputAttr,
    ];
    this._effects[0]?.update(dependency);
  }

  updateWidth(): void {
    this.setState((state) => ({
      minWidth: getElementMinWidth(this.props.parentRef?.current) || state.minWidth,
    }));
  }

  getWidth(): number {
    return calculateValuesFittedWidth(
      this.state.minWidth,
      this.props.allowedPageSizes?.map((p) => p.value),
    );
  }

  render(): JSX.Element {
    const {
      inputAttr,
      allowedPageSizes,
      pageSize,
      pageSizeChangedInternal,
    } = this.props;
    return (
      <SelectBox
        displayExpr="text"
        valueExpr="value"
        dataSource={allowedPageSizes}
        value={pageSize}
        valueChange={pageSizeChangedInternal}
        width={this.getWidth()}
        inputAttr={inputAttr}
      />
    );
  }
}
PageSizeSmall.defaultProps = PageSizeSmallDefaultProps;
