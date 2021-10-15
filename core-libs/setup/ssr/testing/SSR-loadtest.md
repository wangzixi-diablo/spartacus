# SSR loadtest

To run an SSR loadtest, execute the command:
```bash
yarn loadtest:ssr
```

## Total number of requests
The total number of requests is controlled with the first command argument. For example to run 500 requests, execute the command:
```bash
yarn loadtest:ssr 500
```

## Limit of concurrent requests
The concurrency limit is controlled with the second command argument. For example to run 500 requests with a concurrency limit 15, execute the command:
```bash
yarn loadtest:ssr 500 15
```

## URL paths
The url paths to make requests to can be passed via the `LoadtestConfig` to the `LoadtestRunner.run` method.
