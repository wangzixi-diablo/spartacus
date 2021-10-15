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

## Other parameters
For controlling other test parameters, see the docs of `LoadtestConfig` interface and the example usage in the file `./tests/pdp-loadtest.ts`.

### Custom generation of request URLs
Create a custom class that derives from the abstract class `LoadtestRequestGenerator`, then implement 2 fields:
- `generateUrl()` method for generating URLs
- `description` a human readable description of the generator (for the purpose of generating report)

Then pass the instance of your custom request generator class to option `requestGenerator` in the `LoadtestRunner.run({request }) 
