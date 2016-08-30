# HTTP Client
## Node Foundations / Exercise 11 / HTTP Client


![HTTP Client](httpClientScrn.jpg?raw=true "HTTP Client Screenshot")
***


Write a program that performs an HTTP GET request to get the average stock
price. Use the first argument for a ticker symbol. Use the `get` method in the
`http` module with the API provided by
[MarkitOnDemand](http://dev.markitondemand.com/).

It would certainly be easier to test if you can grab the latest stock price, but
because the response is so small, there may not be an opportunity to demonstrate
chunking. On the docs you will see an example request for data to create a
chart. This will give 365 of daily prices. Use these prices to get an average.

Expected:

```bash
$ ./10.js AAPL
$123.45
```

## Bonus

-   Avoid using encoded characters in your url: %22%3A%5B%22c%22%5D%7D%5D%7D
-   Full Destructuring on the API response object and `http` module
-   Abstract a getJSON function:

```js
const getJSON = (url, cb) => { ... }
getJSON('http://example.com', data => { ... })
```

-   Promisify the getJSON function:

```js
const getJSON = url => { ... }
getJSON('http://example.com').then(data => { ... })
```

***
[Original Exercise Link](https://github.com/nashville-software-school/node-milestones/blob/master/01-foundations/exercises/09-streaming-io.md)
