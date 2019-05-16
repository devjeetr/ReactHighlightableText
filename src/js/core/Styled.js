/** @jsx jsx */
import styled  from '@emotion/styled';
import { jsx} from '@emotion/core';

const CharSpan = styled.span `
    background-color: ${props => props.backgroundColor}
`;
const LineSpan = styled.span`
    display: table-row;
    background-color: white;
    counter-increment: line;
    overflow: hidden;
    &:before {
        content: counter(line);
        padding: 0.5em;
        background-color: none;
    }
    
`;

const TextSpan = styled.span`
    overflow: hidden;
    display: table-cell;
    background-color: ${props => `${props.highlightColor || 'white'}`}
`;

const PreDiv = styled.pre`    
white-space: pre-wrap;
display: table;
counter-reset: line;
`;

export { LineSpan, TextSpan, PreDiv, CharSpan };