import {observable, action} from 'mobx';
import categoryApi from '../api/categoryApi';
import {Category} from './entities/Category';
import taskStore from './TaskStore';

class CategoryStore {
	@observable categories = [];
	@observable selectedCategoryId = 1;

	loadCategoriesFromServer() {
		return categoryApi.getCategories().then(action(res => {
			const categoriesList = res.map(c => new Category(c.id, c.name, c.parentId));
			this.categories = categoriesList.filter(c => !c.parentId);
			this.categories.forEach(c => this.buildChilds(c, categoriesList));
		}));
	}

	buildChilds(category, categoriesList) {
		category.childs = categoriesList.filter(c => c.parentId === category.id);
		category.childs.forEach(c => this.buildChilds(c, categoriesList));
	}

	@action selectCategory(categoryId) {
		this.selectedCategoryId = categoryId;
	}

	addCategory(category) {
		return categoryApi.addCategory(category).then(action(res => {
			const newCategory = new Category(res.id, res.name, res.parentId, []);
			if (newCategory.parentId) {
				const parentCategory = this._searchCategoryById(this.categories, category.parentId);
				parentCategory.childs.unshift(newCategory);
			}
			else {
				this.categories.unshift(newCategory);
			}
		}));
	}

	updateCategory(category) {
		return categoryApi.updateCategory(category).then(action(() => {
			const categoryToUpdate = this._searchCategoryById(this.categories, category.id);
			categoryToUpdate.name = category.name;
		}));
	}

	deleteCategory(category) {
		return categoryApi.deleteCategory(category.id).then(action(() => {
			if (category.parentId) {
				const parentCategory = this._searchCategoryById(this.categories, category.parentId);
				parentCategory.childs.replace(parentCategory.childs.filter(c => c.id !== category.id));
			}
			else {
				this.categories = observable(this.categories.filter(c => c.id !== category.id));
			}

			// Remove child tasks (TODO: recursive)
			taskStore.deleteTasksByCategoryId(category.id);
		}));
	}

	_searchCategoryById(categories, categoryId) {
		for (let i = 0; i < categories.length; i++) {
			let category = categories[i];
			if (category.id === categoryId) {
				return category;
			}

			let foundCategory = this._searchCategoryById(category.childs, categoryId);
			if (foundCategory) {
				return foundCategory;
			}
		}
		return null;
	}
}

export default new CategoryStore();
