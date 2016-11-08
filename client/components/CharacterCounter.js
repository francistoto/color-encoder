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
