import React from 'react';

import Header from './Common/Header/Header';
import {ModalDialog} from './Common/ModalDialog';

const Shell = (props) => {
	return (
		<div className="App">
			<Header/>

			<div className="page">
				{props.children}
			</div>

			<ModalDialog/>
		</div>
	);
};

export default Shell;
