import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import CharacterCounter from './CharacterCounter';

import Storage from '../models/storageAPI';

export default class CharacterCounterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      charCount: {},
    };

    // Bind all methods of this "class" to this context
    this.open = () => this.handleOpen();
    this.close = () => this.handleClose();
  }

  handleOpen() {
    // Obtain cumulative, persistent character counts
    Storage.getAllCharacterFrequencies()
    .then((charObjCount) => {
      this.setState({
        charCount: charObjCount,
        show: true,
      });
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.open}>
          Character Count
        </Button>
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Character Count</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.keys(this.state.charCount).length
              ? <CharacterCounter charCount={this.state.charCount} />
              : <h3>No characters entered yet</h3>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
