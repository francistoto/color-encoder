const config = require('../knexfile.js');

const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[env]);

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
