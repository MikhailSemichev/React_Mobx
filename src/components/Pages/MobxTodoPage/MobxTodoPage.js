import React, {Component} from 'react';
import TaskList from './TaskList/TaskList';
import Progress from './Progress';
import AddItem from '../../../components/Common/AddItem/AddItem';
import CategoryTree from './CategoryTree/CategoryTree';
import {observer, inject} from 'mobx-react';
import './MobxTodoPage.scss';

@inject('taskStore', 'categoryStore', 'pageStore')
@observer
class MobxTodoPage extends Component {
	componentDidMount() {
		this.props.pageStore.setPage({title: 'Todo List Mobx'});
		this.props.taskStore.loadTasksFromServer();
		this.props.categoryStore.loadCategoriesFromServer();
	}

	addCategory = (text) => {
		this.props.categoryStore.addCategory({
			name: text,
			parentId: null
		});
	};

	render() {
		return (
			<div className="task-list-page">
				<div className="progress-panel">
					<a href="#/1">Test Page</a>
					<Progress />
				</div>
				<div className="main-panel">
					<div className="category-tree-panel">
						<div className="editable-category-tree">
							<AddItem hintText="Category Title" onAdd={this.addCategory}/>
							<CategoryTree treeEditMode={true}/>
						</div>
					</div>
					<div className="task-list-panel">
						<TaskList />
					</div>
				</div>
			</div>
		);
	}
}

export default MobxTodoPage;
