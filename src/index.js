import React from 'react';
import {render} from 'react-dom';
//
// if (process.env.NODE_ENV === 'development') {
// 	require('preact/devtools');
// 	console.log('devtools');
// }
//

import App from './App';

render(<App />, document.getElementById('root'));
