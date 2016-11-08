import React from 'react';
import { FormControl, Button, InputGroup, Grid, Row, Col } from 'react-bootstrap';

import CharacterCounterModal from './CharacterCounterModal';

const UserInput = props => (
  <div className="user-input">
    <Grid>
      <Row>
        <Col sm={8} smOffset={2}>
          <InputGroup>
            <FormControl
              type="text"
              value={props.textString}
              placeholder="Enter a string to encode"
              onChange={props.textChange}
            />
            <InputGroup.Button>
              <Button onClick={props.submitText}>
                Submit
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </Col>
        <Col sm={2}>
          <CharacterCounterModal
            displayCharacterCount={props.displayCharacterCount}
            charCount={props.charCount}
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default UserInput;
