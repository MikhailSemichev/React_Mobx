import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Field, Form, FormStore, Validators} from '../../Common/Form';
import './TestPage.scss';

@inject('pageStore')
@observer
export default class TestPage extends Component {
	componentWillMount() {
		this.props.pageStore.setPage({title: 'Test Form Page'});

		this.formStore = new FormStore({
			'firstName': {
				value: '',
				validators: [
					Validators.required('First Name is required'),
					Validators.minLength(3, 'Name cant be less then 3 symbols'),
					(value, values) => {
						if (value === 'aaa') {
							return 'First Name cant be "aaa" !';
						}
						return null;
					}
				]
			},
			'emailIsRequired': {
				value: false
			},
			'email': {
				value: '',
				validators: [
					(value, values) => {
						const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						if (value.length && !regex.test(value)) {
							return 'Invalid e-mail format';
						}
						if (!value.length && values.emailIsRequired) {
							return 'Email is required due to checkbox';
						}

						return null;
					}
				]
			}
		});
		this.formStore.setFormData({
			firstName: 'Ivan Ivanov',
			emailIsRequired: true,
			email: 'abc@aa.ru'
		});
	}

	submit = (e) => {
		e.preventDefault();

		let result = this.formStore.validate();
		if (!result.valid) {
			console.log('Errors:', result.errors);
			return;
		}

		let values = this.formStore.getValues();
		console.log(values);
	};

	render() {
		return (
			<div className="test-page">
				<Form
					store={this.formStore}
					onSubmit={this.submit}>
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<Field
							name="firstName"
							control={firstNameCtrl}
							placeholder="First Name"/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email is Required</label>
						<Field
							name="emailIsRequired"
							control={emailIsRequiredCtrl}/>
						<small
							id="emailHelp"
							className="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<Field
							name="email"
							control={emailCtrl}
							placeholder="Email"/>
						<small
							id="emailHelp"
							className="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
					</div>

					<div className="form-group">
						<label
							htmlFor="exampleSelect1">
							Example select
						</label>
						<select
							className="form-control"
							id="exampleSelect1">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="exampleTextarea">Example textarea</label>
						<textarea className="form-control" id="exampleTextarea" rows="3"/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputFile">File input</label>
						<input
							type="file"
							className="form-control-file"
							id="exampleInputFile"/>
						<small className="form-text text-muted">
							This is some placeholder block-level help text for the
							above input. It's a bit lighter and easily wraps to a new line.
						</small>
					</div>
					<fieldset className="form-group">
						<legend>Radio buttons</legend>
						<div className="form-check">
							<label className="form-check-label">
								<input
									type="radio"
									className="form-check-input"
									name="optionsRadios"
									id="optionsRadios1"
									value="option"/>
								<span>Option one is this and that&mdash;be sure to include why it's great</span>
							</label>
						</div>
						<div className="form-check">
							<label className="form-check-label">
								<input
									type="radio"
									className="form-check-input"
									name="optionsRadios"
									id="optionsRadios2"
									value="option2"/>
								<span>Option two can be something else and selecting it will deselect option one</span>
							</label>
						</div>
						<div className="form-check disabled">
							<label className="form-check-label">
								<input
									type="radio"
									className="form-check-input"
									name="optionsRadios"
									id="optionsRadios3"
									value="option3"
									disabled/>
								<span>Option three is disabled</span>
							</label>
						</div>
					</fieldset>
					<div className="form-check">
						<label className="form-check-label">
							<input
								type="checkbox"
								className="form-check-input"/>
							Check me out
						</label>
					</div>
					<button
						type="submit"
						className="btn btn-primary">
						Submit
					</button>
				</Form>
			</div>
		);
	}
}

// fields
function firstNameCtrl({name, value, placeholder, error, onChange, onBlur}) {
	return (
		<input
			type="text"
			id={name}
			name={name}
			value={value}
			placeholder={placeholder}
			className="form-control"
			onChange={onChange}
			onBlur={onBlur}/>
	);
}

function emailIsRequiredCtrl({name, value, onChange, onBlur}) {
	return (
		<input
			type="checkbox"
			id={name}
			name={name}
			checked={value}
			value={value}
			onChange={onChange}
			onBlur={onBlur}/>
	);
}

function emailCtrl({name, value, placeholder, onChange, onBlur}) {
	return (
		<input
			type="text"
			id={name}
			name={name}
			value={value}
			placeholder={placeholder}
			className="form-control"
			onChange={onChange}
			onBlur={onBlur}/>
	);
}

