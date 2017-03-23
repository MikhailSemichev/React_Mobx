import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Field extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		control: PropTypes.func.isRequired,
		placeholder: PropTypes.string
	};

	static contextTypes = {
		store: PropTypes.object
	};

	getCtrl() {
		return this.context.store.ctrls[this.props.name];
	}

	onChange = (e) => {
		let value = e;

		// if standard form inputs
		let target = e.target;
		if (target) {
			value = target.type === 'checkbox' ? target.checked : target.value;
		}

		let ctrl = this.getCtrl();
		ctrl.value = value;
		this.context.store.validateCtrl(this.props.name);
	};

	onBlur = () => {
		let ctrl = this.getCtrl();
		ctrl.touched = true;
		this.context.store.validateCtrl(this.props.name);
	};

	render() {
		let {name, control, placeholder} = this.props;
		let {value, error, touched} = this.getCtrl();

		let controlEl = control({
			name,
			value,
			placeholder,
			touched,
			error,
			onChange: this.onChange,
			onBlur: this.onBlur
		});

		return (
			<div className={`field ${error ? 'field-error' : ''}`}>
				{controlEl}
				{error &&
				<small className="field-error-text form-text text-muted">{error}</small>
				}
			</div>
		);
	}
}
