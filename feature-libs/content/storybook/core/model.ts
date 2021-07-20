import { CmsComponent } from '@spartacus/core';

export declare enum StoryBookLayoutBehaviorStyle {
  SLIDER = 'SLIDER',
  STACKED = 'STACKED',
}
export interface StorybookComponentModel extends CmsComponent {
  layoutType?: StoryBookLayoutType;
  layoutBehaviorStyle?: StoryBookLayoutBehaviorStyle;
  layoutOptionStyle?: StoryBookLayoutOptionStyle;
  showAsSliderOnMobile?: boolean;

  articleDisplayBlocks?: {
    name: string;
    show: boolean;
  }[];
  contentIds?: string[];
}

export declare enum StoryBookLayoutType {
  ASYMMETRICAL = 'ASYMMETRICAL',
  GRID = 'GRID',
}

export declare enum StoryBookLayoutOptionStyle {
  ONE_HIGHLIGHT_SIX_DETAILS = 'ONE_HIGHLIGHT_SIX_DETAILS',
  TWO_HIGHLIGHTS_THREE_DETAILS = 'TWO_HIGHLIGHTS_THREE_DETAILS',
  ONE_HIGHLIGHT_TWO_DETAILS = 'ONE_HIGHLIGHT_TWO_DETAILS',
  ONE_HIGHLIGHT_FOUR_DETAILS = 'ONE_HIGHLIGHT_FOUR_DETAILS',
  ONE_HIGHLIGHT_TWO_BOTTOM_DETAILS = 'ONE_HIGHLIGHT_TWO_BOTTOM_DETAILS',
  ONE_HIGHLIGHT_TWO_RIGHT_DETAILS_SHORT = 'ONE_HIGHLIGHT_TWO_RIGHT_DETAILS_SHORT',
  ONE_HIGHLIGHT_ONE_DETAIL = 'ONE_HIGHLIGHT_ONE_DETAIL',
  ONE_HIGHLIGHT_FOUR_DETAILS_SQUARE = 'ONE_HIGHLIGHT_FOUR_DETAILS_SQUARE',
}
