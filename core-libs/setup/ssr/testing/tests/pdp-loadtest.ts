import { CsvFile } from '../framework/csv-file';
import { DEFAULT_CONFIG, LoadtestConfig } from '../framework/loadtest-config';
import { LoadtestRunner } from '../framework/loadtest-runner';
import { BaseSites } from '../sample-data/base-sites';
import { generatePdpUrls } from '../sample-data/url-generators/generate-pdp-urls';

export function pdpLoadtest() {
  const MAX_DIFFERENT_PDP_URLS = 50;

  const testConfig: LoadtestConfig = {
    ...DEFAULT_CONFIG,
    urls: generatePdpUrls(MAX_DIFFERENT_PDP_URLS, BaseSites.ELECTRONICS_SPA),
  };

  new LoadtestRunner().run(testConfig).then((results) => {
    const report = new CsvFile({
      filename: `${MAX_DIFFERENT_PDP_URLS}-different-pdp.csv`,
    });

    report.appendRow({
      // == GIVEN ==
      '[TEST SETUP] Urls': `${MAX_DIFFERENT_PDP_URLS} different PDP`,
      '[TEST SETUP] Total requests': testConfig.totalRequests,
      '[TEST SETUP] Concurrency limit': testConfig.concurrencyLimit,
      /*
      For reference, you might want to add below more information about the custom setup of app or ssr.
      NOTE: if any value is hardcoded, ensure it's actual!
      e.g. '[APP SETUP] Static Basesite Config': true,
      e.g. '[APP SETUP] OCC Cached': false,
      e.g. '[APP SETUP] SSR Reuse Current Rendering': true,
      */

      // == RESULTS ==
      'Avg response time': results.avgResponseTime,
      'Max response time': results.maxResponseTime,
      'Min response time': results.minResponseTime,
    });
  });
}
