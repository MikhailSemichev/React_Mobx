import {observable, action} from 'mobx';
import _ from 'lodash';

export default class FormStore {
	@observable ctrls = {};

	constructor(controls) {
		let ctrls = {...controls};
		_.forOwn(ctrls, (ctrl, name) => {
			ctrl.error = null;
			ctrl.validators = ctrl.validators || [];
		});
		this.ctrls = observable(ctrls);
	}

	// methods

	@action setFormData(data) {
		_.forOwn(data, (value, name) => {
			this.ctrls[name].value = value;
		});
	}

	@action validate() {
		let errors = {};
		_.forOwn(this.ctrls, (ctrl, name) => {
			let error = this.validateCtrl(name);
			if (error) {
				errors[name] = error;
			}
		});
		return {
			valid: _.isEmpty(errors),
			errors
		};
	}

	@action validateCtrl(name) {
		let ctrl = this.ctrls[name];
		let values = this.getValues();

		for (let i = 0; i < ctrl.validators.length; i++) {
			let validator = ctrl.validators[i];
			ctrl.error = validator(ctrl.value, values);
			if (ctrl.error) {
				return ctrl.error;
			}
		}

		return null;
	}

	getValues() {
		let values = {};
		_.forOwn(this.ctrls, (ctrl, name) => {
			values[name] = ctrl.value;
		});
		return values;
	}
}
