/* eslint-disable spellcheck/spell-checker */
import {
  describe, expect, it,
} from '@jest/globals';
import CardView from '@ts/grids/new/card_view/widget';
import type { Options as GridCoreOptions } from '@ts/grids/new/grid_core/options';
import { rerender } from 'inferno';

const SELECTORS = {
  cardContent: 'dx-cardview-card-content',
};

const setup = (options: GridCoreOptions = {}) => {
  const container = document.createElement('div');
  const cardView = new CardView(container, options);

  return { container, cardView };
};

const getCardContent = (container: Element) => container
  .querySelector(`.${SELECTORS.cardContent}`);

describe('Options', () => {
  it('searchPanel.text (match)', () => {
    const { container } = setup({
      dataSource: [
        { Name: 'John Doe' },
      ],
      columns: [
        'Name',
      ],
      searchPanel: {
        text: 'John',
      },
    });

    rerender();

    const highlightedText = container?.querySelectorAll('[class$="__text-part--highlighted"]');

    expect(highlightedText).not.toBeNull();
    expect(highlightedText?.length).toEqual(1);
    expect(highlightedText?.length).not.toEqual(3);
    expect(highlightedText?.[0]?.innerHTML).toEqual('John');
  });

  it('searchPanel.text (mismatch)', () => {
    const { container } = setup({
      dataSource: [
        { Name: 'John Doe' },
      ],
      searchPanel: {
        text: 'ABC',
      },
    });

    rerender();
    const content = getCardContent(container);
    expect(content).toMatchSnapshot();
  });

  it('searchPanel.highlightCaseSensitive = true', () => {
    const { container } = setup({
      dataSource: [
        { Name: 'John Doe john' },
      ],
      searchPanel: {
        text: 'john',
        highlightCaseSensitive: true,
      },
    });

    const content = getCardContent(container);

    expect(content).toMatchSnapshot();
  });

  it('searchPanel.highlightCaseSensitive = false', () => {
    const { container } = setup({
      dataSource: [
        { Name: 'John Doe john' },
      ],
      searchPanel: {
        text: 'john',
        highlightCaseSensitive: false,
      },
    });

    const content = getCardContent(container);

    expect(content).toMatchSnapshot();
  });

  it('searchPanel.highlightSearchText = false', () => {
    const { container } = setup({
      dataSource: [
        { Name: 'John Doe john' },
      ],
      searchPanel: {
        text: 'john',
        highlightSearchText: false,
      },
    });

    const content = getCardContent(container);

    expect(content).toMatchSnapshot();
  });
});
