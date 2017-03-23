import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'mobx-react';
import './App.scss';

// Pages
import Shell from './components/Shell';
import MobxTodoPage from './components/Pages/MobxTodoPage/MobxTodoPage';
import TestPage from './components/Pages/TestPage/TestPage';

const routes = (
	<Route path="/" component={Shell}>
		<IndexRoute component={MobxTodoPage}/>
		<Route path="form" component={TestPage}/>
	</Route>
);

// Stores
import pageStore from './stores/PageStore';
import taskStore from './stores/TaskStore';
import categoryStore from './stores/CategoryStore';
import {modalStore} from './components/Common/ModalDialog';


const App = () => {
	return (
		<Provider
			pageStore={pageStore}
			taskStore={taskStore}
			categoryStore={categoryStore}
			modalStore={modalStore}>
			<Router history={hashHistory} routes={routes}/>
		</Provider>
	);
};

export default App;
