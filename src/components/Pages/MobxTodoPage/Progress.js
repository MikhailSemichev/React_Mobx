import React, {Component, PropTypes} from 'react';

class Progress extends Component {
	render() {
		return <div>Progress: {60}</div>;
	}
}

Progress.propTypes = {
	progress: PropTypes.number
};

export default Progress;