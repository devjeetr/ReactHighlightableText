import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HighlightableText from '../core/HighlightableText';
import "../../sass/style.scss";

const sampleText = `
\tpublic static void main(String[] args) {
          System.out.println("Hello, world");
  }

  public static void main(String[] args) {
    System.out.println("Hello, world");
  }
`;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabspace: 0,
      highlightedCharacters: { 1: 'blue', 74: '#e8e8e8' },
      highlightedLines: { 2: 'yellow' }
    }

    this.onChangeTabspace = this.onChangeTabspace.bind(this);
  }

  componentDidMount() {
    const lineLength = sampleText.length;
    setInterval(() => {
      this.setState({
        highlightedCharacters: {
          [Math.floor(lineLength * Math.random())]: 'blue'
        }
      })
    }, 500)
  }
  onChangeTabspace(e) {
    this.setState({
      tabspace: +e.target.value
    })
  }
  render() {
    return (
      <div>
        <input value={this.state.value} onChange={this.onChangeTabspace} placeholder='tabspace'></input>
        <HighlightableText highlightedLines
          highlightedCharacters={this.state.highlightedCharacters}
          highlightedLines={this.state.highlightedLines}
          text={sampleText}
          tabspace={this.state.tabspace} />
      </div>
    )
  }
}
ReactDOM.render(<App />,
  document.body)

// setInterval(() => {
//   console.log('hello')
// }, 300);