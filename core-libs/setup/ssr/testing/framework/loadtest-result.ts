import { LoadtestResponse } from './loadtest-response-handler';

/**
 * Test results
 */
export class LoadtestResult {
  constructor(protected responses: LoadtestResponse[]) {}

  /**
   * Returns the number of all responses.
   */
  get responsesCount(): number {
    return this.responses.length;
  }

  /**
   * Returns the number of error responses.
   */
  get errorResponsesCount(): number {
    return this.responses.filter(({ error }) => !!error).length;
  }

  /**
   * Returns all raw data about responses
   */
  get rawResponses(): LoadtestResponse[] {
    return [...this.responses];
  }

  /**
   * Returns the number of responses that had a header 'cache-control' set to 'no-store'.
   * This should happen only for CSR fallback responses (e.g in case of timeout).
   */
  get csrFallbackResponsesCount() {
    return this.responses.filter(
      ({ result }) => result?.headers?.['cache-control'] === 'no-store'
    ).length;
  }

  get responseTimes(): number[] {
    return this.responses.map(({ result }) => result?.requestElapsed);
  }

  get maxResponseTime(): number {
    return Math.round(Math.max(...this.responseTimes));
  }

  get avgResponseTime(): number {
    const responseTimes = this.responseTimes;
    return Math.round(
      responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
    );
  }

  get minResponseTime(): number {
    return Math.round(Math.min(...this.responseTimes));
  }
}
