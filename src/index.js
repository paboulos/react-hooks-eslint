import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Count from './CountHook';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Count />, document.getElementById('root'));
registerServiceWorker();
