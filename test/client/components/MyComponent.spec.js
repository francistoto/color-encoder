import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../../../client/components/App';

describe('<App />', () => {
  let wrapper;
  beforeEach('Setup App wrapper', () => {
    wrapper = shallow(
      <App title="Hello World!" />
    );
  });
  it('should render the title', () => {
    expect(wrapper.find('h1').text()).to.equal('The Color Encoder');
  });
});
