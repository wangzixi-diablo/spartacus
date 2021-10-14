import { LoadtestRequestGenerator } from '../framework/loadtest-request-generator';
import { productCodes } from '../sample-data/product-codes';

class Range {
  protected readonly max: number;
  protected current = 0;

  constructor({ max }: { max?: number } = {}) {
    this.max = max ?? 1;
  }

  getNext(): number {
    this.current = (this.current + 1) % this.max;
    return this.current;
  }
}

export class PdpRequestGenerator extends LoadtestRequestGenerator {
  protected readonly maxDifferentUrls = 50;
  readonly description = `Iterate over ${this.maxDifferentUrls} different PDP`;

  constructor({ baseSite }: { baseSite?: string } = {}) {
    super({ baseSite });
  }

  range = new Range({ max: this.maxDifferentUrls });

  protected generateUrl = () => {
    const urlId = this.range.getNext();
    const productCode = productCodes?.[this.baseSite]?.[urlId];
    return `p/${productCode}`;
  };
}
