import React, {PropTypes, Component} from 'react';
import CategoryTreeItem from './CategoryTreeItem';
import {observer, inject} from 'mobx-react';
import './CategoryTree.scss';

@inject('categoryStore')
@observer
class CategoryTree extends Component {
	render() {
		let {treeEditMode, categoryStore} = this.props;
		let categories = categoryStore.categories;

		return (
			<div className="category-tree">
				{categories.map(category => {
					return (
						<CategoryTreeItem
							key={category.id}
							category={category}
							treeEditMode={treeEditMode}/>
					);
				})}
			</div>
		);
	}
}

CategoryTree.propTypes = {
	treeEditMode: PropTypes.bool
};

export default CategoryTree;