import { LoadtestRequestGenerator } from './loadtest-request-generator';
import { LoadtestResponseHandler } from './loadtest-response-handler';

const execArgs = process.argv.slice(2);
const execParams = {
  totalRequests: Number(execArgs[0]) || undefined,
  concurrencyLimit: Number(execArgs[1]) || undefined,
};

export interface LoadtestConfig {
  host: string;
  totalRequests: number;
  concurrencyLimit: number;
  requestGenerator: LoadtestRequestGenerator;
  responseHandler?: LoadtestResponseHandler;
}

export const DEFAULT_CONFIG: Pick<
  LoadtestConfig,
  'concurrencyLimit' | 'host' | 'totalRequests'
> = Object.freeze({
  host: 'http://localhost:4000/',
  totalRequests: execParams.totalRequests ?? 100,
  concurrencyLimit: execParams.concurrencyLimit ?? 10,
});
