import React from 'react';
import AddItem from './AddItem';
import {mount} from 'enzyme';

describe('Component <AddItem>', () => {
	let component,
		HINT_TEXT = 'HINT_TEXT',
		INPUT_TEXT = 'INPUT_TEXT',
		onAddFn;

	beforeEach(() => {
		onAddFn = jest.fn();
		component = mount(<AddItem hintText={HINT_TEXT} onAdd={onAddFn}/>);
	});

	it('renders with appropriate text in placeholder', () => {
		expect($input().length).toBe(1);
	});

	it('disables button when input is empty and enable on typing', () => {
		expect($addBtn().prop('disabled')).toBeTruthy();

		$inputI().simulate('change', {target: {value: INPUT_TEXT}});

		expect($addBtn().prop('disabled')).toBeFalsy();
	});

	it('executes callback onAdd with text and clears input', () => {
		$inputI().simulate('change', {target: {value: INPUT_TEXT}});

		$addBtn().simulate('click');
		expect(onAddFn).toHaveBeenCalledWith(INPUT_TEXT);

		expect($inputI().prop('value')).toBe('');
	});

	///

	function $input() {
		return component.find('.add-item__input');
	}

	function $inputI(sel) {
		return component.find('.add-item__input input');
	}

	function $addBtn(sel) {
		return component.find('.add-item__btn button');
	}
});

