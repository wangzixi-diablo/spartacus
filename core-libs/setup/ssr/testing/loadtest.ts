import loadtest from 'loadtest';
import { productCodes } from './data/product-codes';
import { CONFIG } from './loadtest-config';

/**
 * Adds a space in between every 3 digits of a number.
 */
function formatInteger(x: number): string {
  return Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Returns a formatted string interpreted as milliseconds.
 */
function formatMs(x: number): string {
  return `${formatInteger(x)} ms`;
}

/**
 * Generates requests
 */
class RequestGenerator {
  private maxDifferentUrls;
  private urlId = 0;
  private testNumber = Date.now(); // used to group all requests from a single test run

  constructor({ maxDifferentUrls }: { maxDifferentUrls?: any } = {}) {
    this.maxDifferentUrls = maxDifferentUrls ?? Number.MAX_VALUE;
  }

  private generateProductUrl = () => {
    this.urlId = (this.urlId + 1) % this.maxDifferentUrls;
    const productCode = productCodes?.[CONFIG.baseSite]?.[this.urlId];
    return `p/${productCode}`;
  };

  private generateContentPageUrl = () => {
    return `/faq?query=${this.urlId}`;
  };

  generateRequest = (
    _params: any,
    options: any,
    client: any,
    callback: any
  ) => {
    const url = true
      ? this.generateProductUrl()
      : this.generateContentPageUrl();

    const path = `/${CONFIG.baseSite}/${url}?test=${this.testNumber}`;

    options.path = path;
    options.pathname = path;

    const request = client(options, callback);
    return request;
  };
}

/**
 * Data related to the http response.
 */
interface ResponseResult {
  /** time in milliseconds it took to complete this individual request. */
  requestElapsed: number;
  /** 0-based index of this particular request in the sequence of all requests to be made.  */
  requestIndex: number;
  /** the loadtest(...) instance index. This is useful if you call loadtest() more than once. */
  instanceIndex: number;

  /** other keys */
  [key: string]: any;
}

/**
 * Interceptor of the http responses.
 */
class ResponsesHandler {
  private responses: { error: any; result: ResponseResult }[] = [];
  private responsesCount = 0;

  handleResponse = (error: any, result: ResponseResult, _latency: any) => {
    this.responses.push({ error, result });
    console.log(++this.responsesCount, result?.path);
  };

  get allCount(): number {
    return this.responses.length;
  }

  get cacheNoStoreCount(): number {
    return this.responses.filter(
      ({ result }) => result?.headers?.['cache-control'] === 'no-store'
    ).length;
  }

  get errorCount(): number {
    return this.responses.filter(({ error }) => !!error).length;
  }

  get responseTimes(): number[] {
    return this.responses.map(({ result }) => result?.requestElapsed);
  }
}

/**
 * Test reports
 */
class Report {
  constructor(private responses: ResponsesHandler) {}

  getCacheNoStoreRatio() {
    return (100 * this.responses.cacheNoStoreCount) / this.responses.allCount;
  }

  getResponseTimes(): { max: string; min: string; avg: string } {
    let responseTimes = this.responses.responseTimes;

    responseTimes = responseTimes.filter((time) => time <= 19000); // SPIKE TODO REMOVE

    return {
      max: formatMs(Math.max(...responseTimes)),
      min: formatMs(Math.min(...responseTimes)),
      avg: formatMs(
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      ),
    };
  }
}

////// TEST //////
const responsesHandler = new ResponsesHandler();
const requestGenerator = new RequestGenerator({
  maxDifferentUrls: CONFIG.maxDifferentUrls,
});
const report = new Report(responsesHandler);
loadtest.loadTest(
  {
    url: CONFIG.host,
    maxRequests: CONFIG.maxRequests,
    concurrency: CONFIG.concurrency,
    requestGenerator: requestGenerator.generateRequest,
    statusCallback: responsesHandler.handleResponse,
  },
  (error: any, _result: any) => {
    setTimeout(() => {
      console.log('Tests run successfully!');
      console.log('CSR/total ratio', report.getCacheNoStoreRatio(), `%`);
      console.log('Response times:', report.getResponseTimes());

      if (error) {
        return console.error('Got an error: %s', error);
      }
    });
  }
);
