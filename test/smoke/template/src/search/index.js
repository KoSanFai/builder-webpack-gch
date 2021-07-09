import React from 'react';
import ReactDOM from 'react-dom';
import largeNumber from 'large-number-calc';
import { common } from '../../common';

console.log(common());

function Search() {
  const num = largeNumber('9999', '2');
  return (
    <div>
      {num}
      搜索引擎
    </div>
  );
}

ReactDOM.render(<Search />, document.getElementById('root'));
