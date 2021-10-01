const loadtest = require('loadtest');
const { productCodes } = require('./data/product-codes');
const CONFIG = require('./loadtest-config');

const baseSite = 'electronics-spa';

class RequestGenerator {
  _maxDifferentUrls = 50;
  _urlId = 0;
  _testNumber = Date.now(); // used to group all requests from a single test run

  constructor({ maxDifferentUrls } = {}) {
    this._maxDifferentUrls = maxDifferentUrls ?? Number.MAX_VALUE;
  }

  _generateProductUrl = () => {
    this._urlId = (this._urlId + 1) % this._maxDifferentUrls;
    const productCode = productCodes[baseSite][this._urlId];
    return `p/${productCode}`;
  };

  generateRequest = (params, options, client, callback) => {
    const path = `/${baseSite}/${this._generateProductUrl()}?test=${
      this._testNumber
    }`;

    options.path = path;
    options.pathname = path;

    const request = client(options, callback);
    return request;
  };
}

class TestResults {
  _csrCount = 0;
  _ssrCount = 0;
  _errorCount = 0;
  _responseCount = 0;

  handleResponse = (error, result, latency) => {
    this._responseCount++;
    console.log(this._responseCount, result.path);

    if (error) {
      this._errorCount++;
      return;
    }

    if (result?.headers?.['cache-control'] === 'no-store') {
      this._csrCount++;
    } else {
      this._ssrCount++;
    }
  };

  geCsrRatio = () => (this._csrCount * 100) / this._responseCount;
}

////// TEST //////
const testResults = new TestResults();

const requestGenerator = new RequestGenerator({
  maxDifferentUrls: CONFIG.maxDifferentUrls,
});

const options = {
  url: CONFIG.host,
  maxRequests: CONFIG.maxRequests,
  concurrency: CONFIG.concurrency,
  requestGenerator: requestGenerator.generateRequest,
  statusCallback: testResults.handleResponse,
};

loadtest.loadTest(options, (error, result) => {
  setTimeout(() => {
    console.log('Tests run successfully!');
    console.log('CSR/total ratio', testResults.geCsrRatio(), `%`);

    if (error) {
      return console.error('Got an error: %s', error);
    }
  });
});
