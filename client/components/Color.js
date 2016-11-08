/*
  *******************************************************************

  Module that displays a simple block of color.  Color is passed down
  from the ColorContainer module.  Each color corresponds to a
  different character.

  *******************************************************************
*/

import React from 'react';

const Color = props =>
  <li className="color-box" style={{ backgroundColor: props.color }} />;

export default Color;
