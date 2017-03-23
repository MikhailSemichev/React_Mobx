// import fetch from 'isomorphic-fetch';
import fetch from './fetch-mock';

export default {
	getTasks() {
		let tasks = getFakeTasks();
		return fetch('url').mock(tasks).then(res => res.json());
	},

	addTask(task) {
		let fromServer = {
			...task,
			id: new Date().getTime()
		};
		return fetch('url').mock(fromServer).then(res => res.json());
	},

	updateTask(task) {
		return fetch('url').mock({...task}).then(res => res.json());
	},

	getTask(id) {
		let task;
		let tasksByCategory = getFakeTasks();
		Object.keys(tasksByCategory).map(k => tasksByCategory[k])
			.some(tasks => {
				task = tasks.find(t => t.id === id);
				return !!task;
			});
		return fetch('url').mock(task).then(res => res.json());
	}
};

function getFakeTasks() {
	let taskId = 0;
	let tasks = [];
	for (let categoryId = 1; categoryId <= 5; categoryId++) {
		for (let i = 1; i <= 5; i++) {
			taskId++;
			tasks.push({
				id: taskId,
				name: `Task_${taskId}`,
				categoryId,
				isDone: taskId % 4 !== 0,
				description: `Description_${taskId}`
			});
		}
	}

	return tasks;
}