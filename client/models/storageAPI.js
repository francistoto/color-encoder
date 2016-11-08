import fetch from 'isomorphic-fetch';

const StorageAPI = {};

StorageAPI.setCharacterFrequency = (string) => {
  fetch('/api/char_count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ string }),
  })
  .then(() => { console.log('success'); });
};

StorageAPI.getAllCharacterFrequencies = () =>
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
