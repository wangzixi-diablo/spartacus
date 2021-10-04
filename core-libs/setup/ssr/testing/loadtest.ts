import loadtest from 'loadtest';
import { productCodes } from './data/product-codes';
import { CONFIG } from './loadtest-config';

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

  generateRequest = (
    _params: any,
    options: any,
    client: any,
    callback: any
  ) => {
    const path = `/${CONFIG.baseSite}/${this.generateProductUrl()}?test=${
      this.testNumber
    }`;

    options.path = path;
    options.pathname = path;

    const request = client(options, callback);
    return request;
  };
}

class ResponsesHandler {
  private noCacheCount = 0;
  private errorCount = 0;
  private responseCount = 0;

  handleResponse = (error: any, result: any, _latency: any) => {
    this.responseCount++;
    console.log(this.responseCount, result?.path);

    if (error) {
      this.errorCount++;
    }

    if (result?.headers?.['cache-control'] === 'no-store') {
      this.noCacheCount++;
    }
  };

  getNoCacheRatio = () => (this.noCacheCount * 100) / this.responseCount;

  getErrorRatio = () => this.errorCount / this.responseCount;
}

////// TEST //////
const responsesHandler = new ResponsesHandler();
const requestGenerator = new RequestGenerator({
  maxDifferentUrls: CONFIG.maxDifferentUrls,
});
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
      console.log('CSR/total ratio', responsesHandler.getNoCacheRatio(), `%`);

      if (error) {
        return console.error('Got an error: %s', error);
      }
    });
  }
);
