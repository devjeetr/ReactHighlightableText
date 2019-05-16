import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';

import HighlightableText from '../core/HighlightableText';
import { LineSpan, TextSpan, PreDiv, CharSpan } from '../core/Styled';
import { start } from 'repl';

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

describe('test drag highlight', () => {
  test('it should return correct indices for drag highlight', () => {
    const startIndex = 2;
    const endIndex = 4;

    const component = mount(<HighlightableText
      text='I\m some text'
      onHighlight={(s, e) => {
        expect(s).toBe(startIndex);
        expect(e).toBe(endIndex);
      }}
    />);
    
    const charSpans = component.find(CharSpan);
    charSpans.at(startIndex).simulate('mousedown');
    charSpans.at(endIndex).simulate('mouseup');
  });

  test('it should cancel drag on mouse leave', () => {
    const startIndex = 2;
    const endIndex = 4;
    const called = 0;
    const component = mount(<HighlightableText
      text='I\m some text'
      onHighlight={(s, e) => {
        called += 1;
      }}
    />);
    
    const charSpans = component.find(CharSpan);
    charSpans.at(startIndex).simulate('mousedown');
    component.simulate('mouseleave');
    charSpans.at(endIndex).simulate('mouseup');
    expect(component.state('dragged')).toBeFalsy();
    expect(component.state('dragStart')).toBeNull();
    expect(called).toBe(0);
  });

  test('it udpate dragstart on multiple mousedowns', () => {
    const startIndex = 2;
    const endIndex = 4;
    const called = 0;
    const component = mount(<HighlightableText
      text='I\m some text'
    />);
    
    const charSpans = component.find(CharSpan);
    charSpans.at(startIndex + 2).simulate('mousedown');
    expect(component.state('dragStart')).toBe(startIndex + 2);
    charSpans.at(startIndex).simulate('mousedown');
    expect(component.state('dragStart')).toBe(startIndex);
  });

  test('it works on multiline strings', () => {
    const startIndex = 10;
    const endIndex = 30;
    const called = 0;
    const component = mount(<HighlightableText
      text='Im some text\nim some other text\nand im another line'
      onHighlight={(s, e) => {
        expect(s).toBe(startIndex);
        expect(e).toBe(endIndex);
      }}
    />);
    
    const charSpans = component.find(CharSpan);
    charSpans.at(startIndex).simulate('mousedown');
    expect(component.state('dragStart')).toBe(startIndex);
    charSpans.at(endIndex).simulate('mouseup');
  });
})


