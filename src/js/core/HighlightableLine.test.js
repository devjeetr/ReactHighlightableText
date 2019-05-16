import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';

import HighlightableLine from '../core/HighlightableLine';
import { LineSpan, TextSpan, CharSpan } from '../core/Styled';

Enzyme.configure({ adapter: new Adapter() });



describe('char indices are mapped accurately to TextSpan', () => {
    test('it should assign single line char indices correctly without offset', () => {
        const text = `I'm a single line\n`;
        const component = mount(<HighlightableLine text={text} />);
        expect(component.find(TextSpan)).toHaveLength(1);
        expect(component.find(CharSpan)).toHaveLength(text.length);
        component.find(CharSpan)
            .map((charspan, i) => {
                expect(+charspan.getDOMNode().id).toBe(i);
                expect(charspan.text()).toBe(text[i]);
            });
    });

    test('it should assign double line char indices correctly with offset', () => {
        const text = `I'm a single line\nI'm some other text`;
        const lines = text.split('\n');
        const offset = lines[0].length + 1;
        const component = mount(<HighlightableLine text={lines[1]} offset={offset}/>);

        expect(component.find(TextSpan)).toHaveLength(1);
        expect(component.find(CharSpan)).toHaveLength(lines[1].length);
        component.find(CharSpan)
            .map((charspan, i) => {
                expect(+charspan.getDOMNode().id).toBe(i + offset);
                expect(charspan.text()).toBe(text[i + offset]);
            });
    });

    test('it should assign double line char indices correctly with offset', () => {
        const text = `I'm a single line\nI'm some other text`;
        const lines = text.split('\n');
        const offset = lines[0].length + 1;
        const component = mount(<HighlightableLine text={lines[1]} offset={offset}/>);

        expect(component.find(TextSpan)).toHaveLength(1);
        expect(component.find(CharSpan)).toHaveLength(lines[1].length);
        component.find(CharSpan)
            .map((charspan, i) => {
                expect(+charspan.getDOMNode().id).toBe(i + offset);
                expect(charspan.text()).toBe(text[i + offset]);
            });
    });

    test('it should not expand tabs if props.tabspace not specified', () => {
        const text = `\tI'm a single line`;
        const component = mount(<HighlightableLine text={text}/>);

        expect(component.find(CharSpan)).toHaveLength(text.length);
        component.find(CharSpan)
            .map((charspan, i) => {
                expect(+charspan.getDOMNode().id).toBe(i);
                if (text[i] === '\t'){
                    expect(charspan.text()).toBe('\t');
                } else {
                   expect(charspan.text()).toBe(text[i]);
                }
            });
    });

    test('it should properly expand tabspaces', () => {
        const text = `\tI'm a single line`;
        const component = mount(<HighlightableLine text={text} tabspace={4}/>);

        expect(component.find(CharSpan)).toHaveLength(text.length);
        component.find(CharSpan)
            .map((charspan, i) => {
                expect(+charspan.getDOMNode().id).toBe(i);
                if (text[i] === '\t'){
                    expect(charspan.text()).toBe('    ');
                } else {
                   expect(charspan.text()).toBe(text[i]);
                }
            });
    });
})


