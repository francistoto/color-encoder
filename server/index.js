const browserify = require('browserify-middleware');
const express = require('express');
const Path = require('path');
const bodyParser = require('body-parser');

const db = require('./db.js');

const routes = express.Router();

// Provide a browserified file at a specified path
routes.get('/app-bundle.js',
  browserify('./client/main.js', {
    // Bundles all client-side es6, JSX, and CSS/SCSS/SASS
    transform: ['babelify', 'scssify'],
  })
);

// Static assets (html, etc.)
const assetFolder = Path.resolve(__dirname, '../client/public');
routes.use(express.static(assetFolder));

routes.get('/api/char_count', (req, res) => {
  db.getCharacterCounts()
  .then((characters) => {
    res.send(characters);
  });
});

routes.post('/api/char_count', (req, res) => {
  db.setCharacterCount(req.body.string)
  .then((data) => {
    res.send(data);
  });
});

if (process.env.NODE_ENV !== 'test') {
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  routes.get('/*', (req, res) => {
    res.status(200).sendFile(`${assetFolder}/index.html`);
  });

  // We're in development or production mode;
  // create and run a real server.
  const app = express();

  // Parse incoming request bodies as JSON
  app.use(bodyParser.json());

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  const port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
