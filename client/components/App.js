import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

// Module imports
import UserInput from './UserInput';
import ColorContainer from './ColorContainer';

// Model imports for interfacing with the server
import Storage from '../models/storageAPI';

// Converts numbers in base 10 (decimal) to base 16 (hexadecimal) and prepends with '0'
// until a string length of 6 is reached.  This is to provide a color code for CSS
const decToHexColor = (number) => {
  let hexColor = number.toString(16);
  while (hexColor.length < 6) {
    hexColor = `0${hexColor}`;
  }
  return `#${hexColor}`;
};

// Converts a character to its ASCII code, then converts it to a dynamic range between
// zero and 256^3 according to it's place in the ASCII code.  Since the first character,
// space, is located at ASCII code 32, we reduce the character code by 32 then multiply by
// (256^3) / 94, which gives us a decent distribution of the most commonly used characters.
const strToColors = string =>
  string.split('').map(e => decToHexColor((e.charCodeAt(0) - 32) * 178481));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textString: '',
      colorArray: [],
    };

    // Bind all methods of this "class" to this context
    this.textChange = e => this.handleTextChange(e);
    this.submitText = e => this.handleSubmitText(e);
  }

  handleTextChange(e) {
    this.setState({
      textString: e.currentTarget.value,
    });
  }

  handleSubmitText() {
    // Add submitted characters to database
    this.state.textString.split('').forEach(e => Storage.setCharacterFrequency(e));

    // Start the conversion of text to colors
    this.setState({
      colorArray: strToColors(this.state.textString),
      textString: '',
    }, Storage.getAllCharacterFrequencies);
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="title">{this.props.title}</h1>
        </div>
        <UserInput
          textString={this.state.textString}
          textChange={this.textChange}
          submitText={this.submitText}
        />
        <Grid>
          <Row>
            <Col sm={8} smOffset={2}>
              <div>
                {this.state.colorArray.length
                  ? <h2>Code:</h2>
                  : null
                }
                <ColorContainer colors={this.state.colorArray} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
