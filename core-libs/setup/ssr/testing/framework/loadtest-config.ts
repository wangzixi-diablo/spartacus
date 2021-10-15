import { LoadtestRequestGenerator } from './loadtest-request-generator';
import { LoadtestResponseHandler } from './loadtest-response-handler';

export interface LoadtestConfig {
  /**
   * Host of the tested server
   */
  host: string;

  /**
   * Total number of requests to make to the tested server
   */
  totalRequests: number;

  /**
   * The limit of pending concurrent requests at the same time.
   */
  concurrencyLimit: number;

  /**
   * Generator of the requests.
   */
  requestGenerator: LoadtestRequestGenerator;

  /**
   * Handler of http responses.
   */
  responseHandler?: LoadtestResponseHandler;
}

// DEFAULT CONFIG FROM EXEC ARGUMENTS:
const execArgs = process.argv.slice(2);
const execParams = {
  totalRequests: Number(execArgs[0]) || undefined,
  concurrencyLimit: Number(execArgs[1]) || undefined,
};

/**
 * Default config
 */
export const DEFAULT_CONFIG: Pick<
  LoadtestConfig,
  'concurrencyLimit' | 'host' | 'totalRequests'
> = Object.freeze({
  host: 'http://localhost:4000/',
  totalRequests: execParams.totalRequests ?? 100,
  concurrencyLimit: execParams.concurrencyLimit ?? 10,
});
