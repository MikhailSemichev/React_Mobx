import React, {Component} from 'react';
import AddItem from './../../../Common/AddItem/AddItem';
import TaskItem from './TaskItem';
import TasksFilter from './TasksFilter';
import './TaskList.scss';
import {observer, inject} from 'mobx-react';

@inject('taskStore', 'categoryStore')
@observer
export class TaskList extends Component {
	addTask = (text) => {
		this.props.taskStore.addTask({
			name: text,
			isDone: false,
			description: '',
			categoryId: this.props.categoryStore.selectedCategoryId
		});
	};

	render() {
		let {taskStore, categoryStore} = this.props;
		let tasks = taskStore.visibleTasks.filter(t => t.categoryId === categoryStore.selectedCategoryId);

		return (
			<div className="task-list">
				<div className="task-top-panel">
					<TasksFilter />

					<AddItem
						className="task-add-item"
						hintText="Task Title"
						onAdd={this.addTask}/>
				</div>

				{tasks.map(task => {
					return (
						<TaskItem
							key={task.id}
							task={task}/>
					);
				})}
			</div>
		);
	}
}

export default TaskList;