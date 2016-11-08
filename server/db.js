const config = require('../knexfile.js');

// const env = process.env.NODE_ENV || 'development';
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'ec2-54-225-246-33.compute-1.amazonaws.com',
    user: process.env.DB_USER, // 'ugadlepvqhddrm',
    password: process.env.DB_PASSWORD, // 'u-MAQ1y4g19twhRJfOVtgr4VIR',
    database: process.env.DATABASE_URL, // 'd26u7kfh0e6jfl',
    ssl: true
  }
});

module.exports = knex;

knex.migrate.latest([config]);

/*
  ***********************************************************************

  Returns an array of character count objects.

  ***********************************************************************
*/

knex.getCharacterCounts = () => knex('char_counts');

/*
  ***********************************************************************

  Iterates through the submitted string and stores each character in the
  database.

  Depending on whether a character has already been entered, this function
  will either initialize that character with a count of 1 or increment the
  count of that character by 1.

  ***********************************************************************
*/

knex.setCharacterCount = string =>
  Promise.all(string
    .split('')
    .map(char =>
      knex('char_counts').where('character', char)
      .then((data) => {
        if (!(data.length)) {
          return knex('char_counts').insert({ character: char, count: 1 });
        }
        return knex('char_counts').where('character', char).increment('count', 1);
      })
    )
  );
