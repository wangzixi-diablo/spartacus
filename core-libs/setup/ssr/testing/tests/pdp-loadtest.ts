import { CsvFile } from '../framework/csv-file';
import { DEFAULT_CONFIG, LoadtestConfig } from '../framework/loadtest-config';
import { LoadtestRunner } from '../framework/loadtest-runner';
import { PdpRequestGenerator } from '../request-generators/pdp-request-generator';

export function pdpLoadtest() {
  const testConfig: LoadtestConfig = {
    ...DEFAULT_CONFIG,
    requestGenerator: new PdpRequestGenerator(),
  };

  new LoadtestRunner().run(testConfig).then((results) => {
    const report = new CsvFile({ filename: 'pdp-loadtest.csv' });

    report.appendRow({
      // == GIVEN ==
      '[TEST SETUP] Url generator': testConfig.requestGenerator.description,
      '[TEST SETUP] Total requests': testConfig.totalRequests,
      '[TEST SETUP] Concurrency limit': testConfig.concurrencyLimit,
      /*
      You might want to add below more information about the custom app's setup.
      NOTE: if any value is hardcoded, ensure it's actual!
      e.g. '[APP SETUP] Static Basesite Config': true,
      e.g. '[APP SETUP] OCC Cached': false,
      */

      // == RESULTS ==
      'Avg response time': results.avgResponseTime,
      'Max response time': results.maxResponseTime,
      'Min response time': results.minResponseTime,
    });
  });
}
