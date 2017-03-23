import React, {PropTypes, Component} from 'react';
import {observer, inject} from 'mobx-react';
import {computed} from 'mobx';

const ENTER_KEY = 13;

class CategoryTreeItem extends Component {
	state = {
		isExpanded: true,
		savingName: null,
		errorRequiredName: false
	};

	updateInput = null;
	addNewInput = null;

	toggleExpanded = () => {
		this.setState({isExpanded: !this.state.isExpanded});
	};

	goToEditMode = () => {
		this.setState({
			isEditingMode: true,
			isExpanded: true
		});
		setTimeout(() => {
			this.updateInput.focus();
		}, 0);
	};

	goToAddNewMode = () => {
		this.setState({
			isAddNewMode: true,
			isExpanded: true
		});
		setTimeout(() => {
			this.addNewInput.focus();
		}, 0);
	};

	cancelEditMode = () => {
		this.setState({
			savingName: null,
			isEditingMode: false,
			isAddNewMode: false,
			errorRequiredName: false
		});
	};

	saveCategory = (e) => {
		if (e.keyCode === ENTER_KEY) {
			let savingName = e.target.value;
			if (savingName) {
				this.setState({savingName});

				let promise;

				// Update
				if (this.state.isEditingMode) {
					let category = {...this.props.category, name: savingName};
					promise = this.props.categoryStore.updateCategory(category);
				}

				// Add New
				if (this.state.isAddNewMode) {
					let category = {parentId: this.props.category.id, name: savingName};
					promise = this.props.categoryStore.addCategory(category);
				}

				promise.then(() => this.cancelEditMode(), () => this.cancelEditMode());
			}
			else {
				this.setState({errorRequiredName: true});
			}
		}
	};

	deleteCategory = () => {
		let category = this.props.category;
		this.props.categoryStore.deleteCategory(category);
	};

	selectCategory = () => {
		if (this.props.treeEditMode) {
			this.props.categoryStore.selectCategory(this.props.category.id);
		}
	};

	moveToCategory = () => {
		console.log(this.props.category);
	};

	@computed get isSelected() {
		let {categoryStore, category} = this.props;
		return categoryStore.selectedCategoryId === category.id;
	}

	render() {
		let {category, treeEditMode} = this.props;

		let {isExpanded, isEditingMode, isAddNewMode, savingName, errorRequiredName}
			= this.state;

		if (!category) return null;

		let expanderIcon = '';
		if ((category.childs && category.childs.length) || isAddNewMode) {
			expanderIcon += isExpanded
				? 'glyphicon-chevron-down'
				: 'glyphicon-chevron-right';
		}

		let showChildren = category.childs && category.childs.length > 0 && isExpanded;

		// eslint-disable-next-line
		let headerClass = 'category-tree-item__header' +
			(errorRequiredName && isEditingMode ? ' category-tree-item__header--error' : '') +
			(this.isSelected ? ' category-tree-item__header--selected' : '');

		return (
			<div className="category-tree-item">
				<div className={headerClass}>
					<i
						className={`glyphicon ${expanderIcon}`}
						onClick={this.toggleExpanded}/>
					<div className="category-tree-item__name-block">
						{!isEditingMode &&
						<div className="category-tree-item__name">
							<a
								className="category-tree-item__name-link"
								onClick={this.selectCategory}>
								{category.name}
							</a>

							{treeEditMode &&
							<i
								className="glyphicon glyphicon-edit"
								onClick={this.goToEditMode}/>
							}
						</div>
						}
						{isEditingMode &&
						<div className="category-tree-item__name">
							<input
								type="text"
								id={`category_txt_id${category.id}`}
								className="category-tree-item__name-txt"
								defaultValue={savingName || category.name}
								onKeyDown={this.saveCategory}
								onBlur={this.cancelEditMode}
								ref={r => this.updateInput = r}/>
							{errorRequiredName &&
							<span className="error">Category name is required</span>
							}
							{savingName &&
							<span>saving...</span>
							}
						</div>
						}
					</div>
					{treeEditMode && !isEditingMode &&
					<span>
						<i
							className="glyphicon glyphicon-remove"
							onClick={this.deleteCategory}/>
						<i
							className="glyphicon glyphicon-plus"
							onClick={this.goToAddNewMode}/>
					</span>
					}
					{!treeEditMode && !this.isSelected &&
					<span>
						<i
							className="glyphicon"
							onClick={this.moveToCategory}>move</i>
					</span>
					}
				</div>
				<div className="category-tree-item__children">
					{isAddNewMode &&
					<div className={`category-tree-item__name ${errorRequiredName ? ' error' : ''}`}>
						<input
							id={`category_txt_id${category.id}`}
							className="category-tree-item__name-txt new"
							defaultValue={savingName}
							onKeyDown={this.saveCategory}
							onBlur={this.cancelEditMode}
							ref={r => this.addNewInput = r}/>
						{errorRequiredName &&
						<span className="error">Category name is required</span>
						}
						{savingName &&
						<span>saving...</span>
						}
					</div>
					}
					{showChildren && <List childs={category.childs} treeEditMode={treeEditMode}/>}
				</div>
			</div>
		);
	}
}


const List = observer(({childs, treeEditMode}) => (
	<div>
		{childs.map(child =>
			<CategoryTreeItemObserved
				key={child.id}
				category={child}
				treeEditMode={treeEditMode}/>
		)}
	</div>
));

const CategoryTreeItemObserved = inject('categoryStore')(observer(CategoryTreeItem));

CategoryTreeItemObserved.propTypes = {
	category: PropTypes.object,
	treeEditMode: PropTypes.bool
};

export default CategoryTreeItemObserved;