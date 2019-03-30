import React from 'react';
import ReactDOM from 'react-dom'

console.log(process);

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.render(<p>This is an application built with {process.env.LIBRARY}</p>, rootEl);
}

