import { BaseSites } from '../sample-data/base-sites';

/**
 * Generates requests
 */
export abstract class LoadtestRequestGenerator {
  private testNumber = Date.now(); // used to group all requests from a single test run
  protected readonly baseSite: string;

  constructor({ baseSite }: { baseSite?: string } = {}) {
    this.baseSite = baseSite ?? BaseSites.ELECTRONICS_SPA;
  }

  /**
   * Template method to be implemented by child class to generate specific URL.
   */
  protected abstract generateUrl(): string;

  /**
   * Description of the generator
   */
  abstract readonly description: string;

  /**
   * It's used by `loadtest` tool to generate a request.
   */
  generateRequest(_params: any, options: any, client: any, callback: any) {
    const url = this.generateUrl();

    const path = `/${this.baseSite}/${url}?testId=${this.testNumber}`;

    options.path = path;
    options.pathname = path;

    const request = client(options, callback);
    return request;
  }
}
