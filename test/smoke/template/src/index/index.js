import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import '../../common';
// 开启 tree-shaking 时不会被打包进去
// 不开启 tree-shaking 时会被打包进去
import { a } from './tree-shaking';

const lnc = require('large-number-calc');

console.log('lnc: ', lnc('2012', '2021'));
// 同上
// if (false) {
//   a()
// }

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      Text: null,
    };
  }

  handleClick() {
    import('./text.js').then((data) => {
      this.setState({
        Text: data.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div
        onClick={this.handleClick.bind(this)}
        onKeyDown={this.handleClick.bind(this)}
      >
        {Text ? <Text /> : null}
        Hello World
        {a()}
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
