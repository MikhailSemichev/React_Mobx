import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import './Header.scss';

@inject('pageStore')
@observer
class Header extends Component {
	render() {
		let {page} = this.props.pageStore;
		return (
			<div className="header">
				<h1 className="page-title">{page.title}</h1>
			</div>
		);
	}
}

export default Header;