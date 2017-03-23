import {observable} from 'mobx';

export class Category {
	id;
	@observable name;
	@observable parentId;
	@observable childs = [];

	constructor(id, name, parentId, childs) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;
		this.childs = childs || [];
	}
}
