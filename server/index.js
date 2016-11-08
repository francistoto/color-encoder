const browserify = require('browserify-middleware');
const express = require('express');
const Path = require('path');
const bodyParser = require('body-parser');
const pg = require('pg');

const db = require('./db.js');

const routes = express.Router();

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/main.js', {
    // Bundles all client-side es6, JSX, and CSS/SCSS/SASS
    transform: ['babelify', 'scssify'],
  })
);

//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', (req, res) => {
  res.send(['node', 'express', 'browserify', 'mithril']);
});

//
// Static assets (html, etc.)
//
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
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', (req, res) => {
    res.sendFile(`${assetFolder}/index.html`);
  });

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  const app = express();

  // Parse incoming request bodies as JSON
  app.use(bodyParser.json());

  // Mount our main router
  app.use('/', routes);

  pg.defaults.ssl = true;
  pg.connect(process.env.DATABASE_URL, (err, client) => {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client
      .query('SELECT * FROM color_encoder;')
      .on('row', (row) => {
        console.log(JSON.stringify(row));
      });
  });
  // app.get('/db', (req, res) => {
  //   pg.connect(process.env.DATABASE_URL, (err, client, done) => {
  //     client.query('SELECT * FROM test_table', (error, result) => {
  //       done();
  //       if (err) {
  //         console.error(err);
  //         res.send(`Error ${err}`);
  //       } else {
  //         res.render('pages/db', { results: result.rows });
  //       }
  //     });
  //   });
  // });

  // Start the server!
  const port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
