/** @jsx jsx */
import React, { Component } from 'react';
import { jsx, css, } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'

const PreDiv = styled.pre`    
    white-space: pre-wrap;
    display: table;
    counter-reset: line;
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

const HighlightableLine = (props) => {
    const chars = props.text.split('')
        .map((c, i) => (
            <span
                css={props.highlightedCharacters ? 
                        props.highlightedCharacters.hasOwnProperty((props.offset || 0) + i) && c != ' ' ?
                        css`background-color: ${props.highlightedCharacters[(props.offset || 0) + i]}` : ''
                    : ''}
                key={i}
                id={(props.offset || 0) + i}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}>{c}</span>
        ));
                    console.log(props.offset);
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
}

/** 
 * returns starting index for each line
 * @param {Array} lines array of lines
 * @returns {Array} array of starting indices
 */
const calculateLineLengths = (lines) => {
    const lengths = [];

    lines.forEach((line) => {
        const len = line.length + (lengths.length ? lengths[lengths.length - 1] : 0) + 1;
        lengths.push(len);
    })
    return lengths;
}

/**
 * Displays text and provides the ability to highlight
 * lines and characters within this text.
 */
class HighlightableText extends Component {
    

    constructor(props) {
        super(props);

        this.preNode = React.createRef();
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.state = {
            dragged: false,
            highlightSet: new Set(),
        }
    }

    handleMouseOver(e) {
        console.log(e.target)
    }


    handleMouseDown(e) {
        console.log(e.target)
        this.setState({ dragged: true })
    }

    handleMouseUp(e) {
        console.log(e.target)
        if (this.state.dragged && this.props.onHighlight){
            console.log(e.target)
            this.props.onHighlight(this.highlightSet)
        }
        this.setState({dragged: false});
    }

    handleMouseLeave(e) {
        if(this.state.dragged){
            this.setState({ dragged: false })
        }
    }


    render() {
        const lengths = calculateLineLengths(this.props.text.split('\n'));
        const lines = this.props.text
            .split('\n').map((line, i) => {
                return (
                    <HighlightableLine
                        highlighted={this.props.highlightedLines.hasOwnProperty(i) ?
                                    this.props.highlightedLines[i]: false}
                        highlightedCharacters={this.props.highlightedCharacters}
                        lineNumber={i}
                        key={i}
                        offset={i > 0 ? lengths[i - 1] : 0}
                        text={`${line}\n`} // add the newline here so we don't screw up
                        // char indices while highlighting
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                    />)
                }
            );
        return (
            <PreDiv ref={this.preNode} onMouseLeave={this.handleMouseLeave}>
                {
                    lines
                }
            </PreDiv>
        );
    }
}

HighlightableText.propTypes = {
    /** the text be be displayed */
    text: PropTypes.string.isRequired,
    /** character indices that are to be highlighted */
    highlightedLines: PropTypes.object,
    /** character indices that are to be highlighted */
    highlightedCharacters: PropTypes.object,
    /** a string that contains an html colorcode*/
    lineHighlightColor: PropTypes.string,
    charHighlightColor: PropTypes.string,
};

export default HighlightableText;