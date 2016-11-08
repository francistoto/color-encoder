/*
  *******************************************************************

  A Container Module that encapsulates and manages the position of
  the Color modules.

  *******************************************************************
*/

import React from 'react';

import Color from './Color';

// I use a container module whenever I am mapping an array of other modules that
// are passed properties.  This helps mitigate issues involving application state.
const ColorContainer = props => (
  props.colors.length
  ? <div className="color-container">
    <ul>
      {props.colors.map((color, index) =>
        <Color key={index} color={color} />,
      )}
    </ul>
  </div>
  : <h3>No Text Entered!</h3>
);

export default ColorContainer;
