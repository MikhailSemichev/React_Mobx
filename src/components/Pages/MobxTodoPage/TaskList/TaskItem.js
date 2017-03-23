import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {observer, inject} from 'mobx-react';

@inject('taskStore')
@observer
class TaskItem extends Component {
	onToggleDone = () => {
		let {task} = this.props;
		this.props.taskStore.updateTask({
			...task,
			isDone: !task.isDone
		});
	};

	render() {
		let {task} = this.props;
		return (
			<div className={`task-item ${task.isDone ? 'task-item--done' : ''}`}>
				<input
					type="checkbox"
					checked={task.isDone}
					onChange={this.onToggleDone}/>
				<div className="task-item__text">
					{task.name}
				</div>
				<Link to={`/edit/${task.id}`}>
					<i className="material-icons">edit</i>
				</Link>
			</div>
		);
	}
}

TaskItem.propTypes = {
	task: PropTypes.object.isRequired
};

export default TaskItem;