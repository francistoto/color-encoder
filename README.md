# ColorEncoder

## Getting Started

```
$ git clone https://github.com/francistoto/colorencoder
$ cd colorencoder
$ npm install
$ npm start
```

Now visit [localhost:4000](http://localhost:4000/)

### Running the Tests

ColorEncoder uses Enzyme for front-end React tests, Mocha and Chai for back-end server tests.

Client tests should be placed in `test/client` and server tests should be placed in `test/server`.

To run all tests, simply run `npm test`.

Additionally, you can run just client-side tests with `npm run test_client` or just server-side tests with `npm run test_server`.

## Browserify-Middleware

Browserify-Middleware is used to babelify, bundle, and compile all code and stylesheets into a single app-bundle.js file for inclusion in index.html.
