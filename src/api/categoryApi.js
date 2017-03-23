// import fetch from 'isomorphic-fetch';
import fetch from './fetch-mock';

export default {
	getCategories() {
		let categories = getFakeCategories();
		return fetch('url').mock(categories).then(res => res.json());
	},

	addCategory(category) {
		let fromServer = {
			...category, ...{
				id: new Date().getTime(),
				childIds: []
			}
		};
		return fetch('url').mock(fromServer).then(res => res.json());
	},

	updateCategory(category) {
		return fetch('url').mock({...category}).then(res => res.json());
	},

	deleteCategory(category) {
		return fetch('url').mock().then(res => res.json());
	}
};

function getFakeCategories() {
	let res = [];
	let id = 9;
	for (let i = 9; i < 5; i++) {
		res.push({
			id: id++,
			name: `Category ${id}`,
			childIds: []
		});
	}

	return [
		{
			id: 1,
			name: 'Category 1',
			childIds: [2, 5]
		},
		{
			id: 2,
			name: 'Category 2',
			parentId: 1,
			childIds: [3, 4]
		},
		{
			id: 3,
			name: 'Category 3',
			parentId: 2,
			childIds: []
		},
		{
			id: 4,
			name: 'Category 4',
			parentId: 2,
			childIds: []
		},
		{
			id: 5,
			name: 'Category 5',
			parentId: 1,
			childIds: []
		},
		{
			id: 6,
			name: 'Category 6',
			childIds: []
		},
		{
			id: 7,
			name: 'Category 7',
			childIds: []
		},
		{
			id: 8,
			name: 'Category 8',
			childIds: []
		}
	].concat(res);
}
