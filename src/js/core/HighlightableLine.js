/** @jsx jsx */
import { jsx, css, } from '@emotion/core';
import {LineSpan, TextSpan, CharSpan} from './Styled';
import PropTypes from 'prop-types'


/**
 * A line of text that is highlightable, either entirely or
 * for specific characters.
 */
const HighlightableLine = (props) => {
    const chars = props.text.split('')
        .map((c, i) => (
            <CharSpan
                backgroundColor={props.highlightedCharacters ? 
                        props.highlightedCharacters.hasOwnProperty((props.offset || 0) + i) && c != ' ' ?
                        props.highlightedCharacters[(props.offset || 0) + i] : ''
                    : ''}
                key={i}
                id={(props.offset || 0) + i}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}>{c === '\t' ? props.tabspace ? ' '.repeat(props.tabspace) :  c : c}</CharSpan>
        ));
    return (
        <LineSpan>
            <TextSpan highlightColor={props.highlighted || 'white'}>{chars}</TextSpan>
        </LineSpan>
    );
};

HighlightableLine.propTypes = {
    /** The text to be displayed */
    text: PropTypes.string.isRequired,
    /** whether this line is highlighted or not */
    highlighted: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    /**  each character displayed has in id equal to its
     *   position in the line. props.offset is added to the
     *   position if specified
    */
    offset: PropTypes.number,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    /** how many spaces to use for each tab */
    tabspace: PropTypes.number,
}

export default HighlightableLine;