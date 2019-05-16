import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HighlightableText from '../core/HighlightableText';
import "../../sass/style.scss";

const sampleText = `
  public static void main(String[] args) {
          System.out.println("Hello, world");
  }

  public static void main(String[] args) {
    System.out.println("Hello, world");
  }
`;


class App extends Component {


}
ReactDOM.render(<HighlightableText highlightedLines highlightedCharacters={{1:'blue', 74: '#e8e8e8'}} text={sampleText} />,
  document.body)

// setInterval(() => {
//   console.log('hello')
// }, 300);