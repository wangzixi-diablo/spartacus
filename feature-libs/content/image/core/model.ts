import { CmsComponent } from '@spartacus/core';
import '../core/model';

export interface ImageComponentModel extends CmsComponent {
  url: string;
  imageUrl: string;

  headline: string;
  subHeadline: string;
  link?: {
    value?: string;
    type?: string;
    contentIds?: string[];
  };
}
