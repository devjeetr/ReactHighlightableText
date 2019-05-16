import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';

import HighlightableText from '../core/HighlightableText';
import { LineSpan, TextSpan, PreDiv } from '../core/Styled';

Enzyme.configure({ adapter: new Adapter() });


describe('sanity check for props', () => {
  test('it renders the correct number of spans',  () => {
    const component = mount(<HighlightableText
                                text='I\m some text'
                              />);

    expect(component.find(PreDiv)).toHaveLength(1);
    expect(component.find(LineSpan)).toHaveLength(1);
  });
});

describe('char indices are mapped accurately to TextSpan', () => {
})


