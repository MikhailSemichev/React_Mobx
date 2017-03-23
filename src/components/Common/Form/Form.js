import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import './Form.scss';

@observer
export default class Form extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		children: PropTypes.any.isRequired,
		onSubmit: PropTypes.func
	};

	static childContextTypes = {
		store: PropTypes.object
	};

	getChildContext() {
		return {
			store: this.props.store
		};
	}

	render() {
		let {onSubmit, children} = this.props;

		return (
			<form onSubmit={onSubmit}>
				{children}
			</form>
		);
	}
}
