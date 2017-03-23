import {observable, action, computed} from 'mobx';
import taskApi from '../api/taskApi';
import {Task} from './entities/Task';

class TaskStore {
	@observable tasks = [];
	@observable filter = {filterText: '', showDone: true};

	@computed get visibleTasks() {
		return this.tasks.filter(task => {
			if (!this.filter.showDone && task.isDone) {
				return false;
			}
			return task.name.toLowerCase().indexOf(this.filter.filterText.toLowerCase()) >= 0;
		});
	}

	loadTasksFromServer() {
		taskApi.getTasks().then(action(res => {
			this.tasks.replace(
				res.map(t => {
					return new Task(t.id, t.name, t.isDone, t.categoryId, t.description);
				})
			);
		}));
	}

	@action setFilter(filterText, showDone) {
		this.filter.filterText = filterText;
		this.filter.showDone = showDone;
	}

	updateTask(task) {
		taskApi.updateTask(task)
			.then(action(res => {
				const taskToUpdate = this.tasks.find(t => t.id === res.id);
				taskToUpdate.name = res.name;
				taskToUpdate.isDone = res.isDone;
				taskToUpdate.categoryId = res.categoryId;
				taskToUpdate.description = res.description;
			}));
	}

	addTask(task) {
		taskApi.addTask(task)
			.then(action(t => {
				const newTask = new Task(t.id, t.name, t.isDone, t.categoryId, t.description);
				this.tasks.unshift(newTask);
			}));
	}

	deleteTasksByCategoryId(categoryId) {
		this.tasks.replace(this.tasks.filter(t => t.categoryId !== categoryId));
	}
}

export default new TaskStore();
