/** @jsx jsx */
import React, { Component } from 'react';
import { jsx, css, } from '@emotion/core';
import {PreDiv} from './Styled';
import PropTypes from 'prop-types'
import HighlightableLine from './HighlightableLine';


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
 *
 * TODO :Add mouse highlight suppoert
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
    }


    handleMouseDown(e) {
        this.setState({ dragged: true })
    }

    handleMouseUp(e) {
        if (this.state.dragged && this.props.onHighlight){
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
                      highlighted={ this.props.highlightedLines ? 
                                      this.props.highlightedLines.hasOwnProperty(i) ?
                                      this.props.highlightedLines[i]: false
                                    : false
                      }
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
    /** */ 
    highlightedLines: PropTypes.object,
    /** character indices that are to be highlighted */
    highlightedCharacters: PropTypes.object,
};

export default HighlightableText;
