/*
  *******************************************************************

  Module that iterates through an object and lists the key-value
  pairs in "key: value" format.  The object passed in contains the
  cumulative count of all characters entered by all users.

  *******************************************************************
*/

import React from 'react';

const CharacterCounter = (props) => {
  // Obtain an array of the currently stored characters.  We will use this array
  // to access all counts of the individual characters and display them
  const letters = Object.keys(props.charCount).sort();
  return (
    <div className="char-list-container">
      <ul>
        {letters.map((letter, index) =>
          <li className="char-list-item" key={index}>
            <span className="character">{`${letter === ' ' ? 'spaces' : letter}: `}</span>
            <span className="count">{`${props.charCount[letter]}  `}</span>
            <br />
          </li>,
        )
        }
      </ul>
    </div>
  );
};

export default CharacterCounter;
