import React, {PropTypes, Component} from 'react';
import './AddItem.scss';

const ENTER_KEY = 13;

class AddItem extends Component {
	state = {text: ''};

	handleChange = (e) => {
		this.setState({text: e.target.value});
	};

	handleEnter = (e) => {
		if (e.keyCode === ENTER_KEY) {
			this.add();
		}
	};

	add = () => {
		this.props.onAdd(this.state.text);
		this.setState({text: ''});
	};

	render() {
		let {hintText} = this.props;
		let {text} = this.state;
		return (
			<div className="add-item">
				<input
					type="text"
					className="add-item__input"
					placeholder={hintText}
					style={{width: 'auto'}}
					value={text}
					onChange={this.handleChange}
					onKeyDown={this.handleEnter}/>
				<button
					className="add-item__btn"
					onClick={this.add}
					disabled={!text}>
					Add
				</button>
			</div>
		);
	}
}

AddItem.propTypes = {
	hintText: PropTypes.string,
	onAdd: PropTypes.func.isRequired
};

export default AddItem;
