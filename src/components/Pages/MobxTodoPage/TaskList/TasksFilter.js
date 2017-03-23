import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import './TasksFilter.scss';

const ENTER_KEY = 13;

@inject('taskStore')
@observer
class TasksFilter extends Component {
	filterInput;

	onShowDoneCheck = () => {
		let {taskStore} = this.props;
		taskStore.setFilter(
			this.filterInput.value,
			!taskStore.filter.showDone
		);
	};

	onFilterEnter = (e) => {
		let {taskStore} = this.props;
		if (e.keyCode === ENTER_KEY) {
			taskStore.setFilter(
				this.filterInput.value,
				taskStore.filter.showDone
			);
		}
	};

	render() {
		let {taskStore} = this.props;
		let {filterText, showDone} = taskStore.filter;

		return (
			<div className="tasks-filter">
				<div className="tasks-filter__done">
					<label>
						<input
							type="checkbox"
							checked={showDone}
							onChange={this.onShowDoneCheck}/>
						Show done
					</label>
				</div>
				<div className="tasks-filter__text">
					<input
						type="text"
						placeholder="Tasks filter"
						defaultValue={filterText}
						key={`filerText_${filterText}`}
						onKeyDown={this.onFilterEnter}
						ref={r => this.filterInput = r}/>
				</div>
			</div>
		);
	}
}

export default TasksFilter;