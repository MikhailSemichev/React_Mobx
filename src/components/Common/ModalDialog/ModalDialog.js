import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Modal from 'react-modal';
import _ from 'lodash';

import {MODAL_TYPES} from './ModalStore';

import './ModalDialog.scss';

@inject('modalStore')
@observer
export default class ModalDialog extends Component {
	static noBackdropStyle = {
		overlay: {
			backgroundColor: 'transparent',
			pointerEvents: 'none'
		}
	};

	render() {
		const {isOpen, noBackdrop, modalType, modalClassName, title, body, close} = this.props.modalStore;

		return (
			<Modal
				isOpen={isOpen}
				onRequestClose={() => close()}
				style={noBackdrop ? ModalDialog.noBackdropStyle : {}}
				className={`modal modal-dialog-container ${modalClassName}`}
				contentLabel={''}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="close"
								onClick={() => close()}>
								&times;
							</button>
							<h3 className="modal-title">
								{title}
							</h3>
						</div>
						{modalType === MODAL_TYPES.custom &&
							<div className="modal-custom-body">
								{body}
							</div>
						}
						{modalType !== MODAL_TYPES.custom &&
							<div>
								<div className="modal-body">
									{_.isArray(body) ? body.map(item => <p key={item}>{item}</p>) : body}
								</div>
								<div className="modal-footer">
									<button
										className="btn btn-primary"
										type="button"
										onClick={() => close(true)}>
										OK
									</button>
									{modalType === MODAL_TYPES.confirm &&
									<button
										className="btn btn-default"
										type="button"
										onClick={() => close(false)}>
										Cancel
									</button>
									}
								</div>
							</div>
						}
					</div>
				</div>
			</Modal>
		);
	}
}
