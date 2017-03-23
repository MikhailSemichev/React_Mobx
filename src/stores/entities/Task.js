import {observable} from 'mobx';

export class Task {
	id;
	@observable name;
	@observable isDone;
	@observable categoryId;
	@observable description;

	constructor(id, name, isDone, categoryId, description) {
		this.id = id;
		this.name = name;
		this.isDone = isDone;
		this.categoryId = categoryId;
		this.description = description;
	}
}