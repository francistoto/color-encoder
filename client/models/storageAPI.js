/*
  *******************************************************************

  Model file.  These functions control how the client interacts with
  the server.  These functions are intentionally kept separate for
  organization and efficiency purposes.

  *******************************************************************
*/

import fetch from 'isomorphic-fetch';

const StorageAPI = {};

/*
  *******************************************************************

  Provides for the incrementing of a character's cumulative count.

  Input: string
  Output: none

  *******************************************************************
*/
StorageAPI.setCharacterCount = (string) => {
  fetch('/api/char_count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ string }),
  })
  .then(() => { console.log('success'); });
};

/*
  *******************************************************************

  Provides for obtaining the cumulative character counts for all
  characters that users have input.

  Input: none
  Output: Array of objects containing character counts
  EX: [
    { character: 'a', count: 3 },
    { character: 'x', count: 4 }
  ]

  *******************************************************************
*/

StorageAPI.getAllCharacterCounts = () =>
  fetch('/api/char_count', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
  .then((charObjArray) => {
    const charCountObj = {};
    charObjArray.forEach((element) => {
      charCountObj[element.character] = element.count;
    });
    return charCountObj;
  });

export default StorageAPI;
