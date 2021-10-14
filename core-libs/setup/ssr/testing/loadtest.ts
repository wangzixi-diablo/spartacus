import { CsvFile } from './framework/csv-file';
import { DEFAULT_CONFIG, LoadtestConfig } from './framework/loadtest-config';
import { LoadtestRunner } from './framework/loadtest-runner';
import { PdpRequestGenerator } from './url-generators/pdp-request-generator';

const testConfig: LoadtestConfig = {
  ...DEFAULT_CONFIG,
  requestGenerator: new PdpRequestGenerator(),
};

new LoadtestRunner().run(testConfig).then((results) => {
  const report = new CsvFile({ filename: 'loadtest-report.csv' });

  report.appendRow({
    // == GIVEN ==
    '[TEST SETUP] Url generator': testConfig.requestGenerator.description,
    '[TEST SETUP] Total requests': testConfig.totalRequests,
    '[TEST SETUP] Concurrency limit': testConfig.concurrencyLimit,

    // Optimizations are not set in the test. Please inspect your app's setup and ensure the values below are correct:
    '[APP SETUP] Cache OCC': true,
    '[APP SETUP] Static Basesite Config': true,

    // == RESULTS ==
    'Avg response time': results.avgResponseTime,
    'Max response time': results.maxResponseTime,
    'Min response time': results.minResponseTime,
  });
});
