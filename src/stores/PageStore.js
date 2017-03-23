import {observable, action} from 'mobx';

class PageStore {
	@observable page = {title: 'Default'};

	@action setPage(page) {
		this.page.title = page.title;
	}
}
export default new PageStore();
