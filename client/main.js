import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Import compiled SASS
require('./sass/app.sass');

ReactDOM.render(<App title="The Color Encoder" />, document.getElementById('app'));
