import React from 'react';
import { render, act } from 'react-native-testing-library';
import { fireEvent } from '@testing-library/react-native';

import EditPatientScreen from '../EditPatientScreen';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([thunk]);
let store, wrapper;
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
	useEffect: jest.fn(),
	useDispatch: jest.fn(),
}));

describe('EditPatientScreen', () => {
	beforeEach(() => {
		const initialState = [];
		store = mockStore(initialState);
		wrapper = render(
			<Provider store={store}>
				<EditPatientScreen
					navigation={{ getParam: jest.fn(), setParams: jest.fn() }}
				/>
			</Provider>
		);
	});

	test('Should render correct labels', () => {
		//act
		const { getByTestId } = wrapper;

		//assert
		expect(getByTestId('EditPatientScreen.name').props.label).not.toBeNull();
		expect(getByTestId('EditPatientScreen.name').props.label).toBe('Name');
		expect(getByTestId('EditPatientScreen.imageUrl').props.label).toBe('Image URL');
		expect(getByTestId('EditPatientScreen.diagnosis').props.label).toBe('Diagnosis');
		expect(getByTestId('EditPatientScreen.age').props.label).toBe('Age');
		expect(getByTestId('EditPatientScreen.phone').props.label).toBe('Phone');
		expect(getByTestId('EditPatientScreen.email').props.label).toBe('Email');
		expect(getByTestId('EditPatientScreen.address').props.label).toBe('Address');
		expect(getByTestId('EditPatientScreen.description').props.label).toBe('Description');
		expect(getByTestId('EditPatientScreen.bodyTemperature').props.label).toBe('Body Temperature');
		expect(getByTestId('EditPatientScreen.pulseRate').props.label).toBe('Pulse Rate');
		expect(getByTestId('EditPatientScreen.respirationRate').props.label).toBe('Respiration Rate');
		expect(getByTestId('EditPatientScreen.systolicBp').props.label).toBe('Systolic BP');
		expect(getByTestId('EditPatientScreen.diastolicBp').props.label).toBe('Diastolic BP');
		expect(getByTestId('EditPatientScreen.oxygenSat').props.label).toBe('Oxygen Saturation');

		expect(getByTestId('EditPatientScreen.oxygenSat').props.label).not.toBe('Oxygen Saturation1');
	});


	test('Should render correct values', () => {
		//act
		const { getByTestId } = wrapper;

		//assert
		expect(getByTestId('EditPatientScreen.name').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.imageUrl').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.diagnosis').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.age').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.phone').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.email').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.address').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.description').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.bodyTemperature').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.pulseRate').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.respirationRate').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.systolicBp').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.diastolicBp').props.value).toBe('');
		expect(getByTestId('EditPatientScreen.oxygenSat').props.value).toBe('');

	});


	test('Should set correct input values', () => {
		//act
		const { getByTestId } = wrapper;

		fireEvent.changeText(getByTestId('EditPatientScreen.name'), 'Raj Kumar');
		fireEvent.changeText(getByTestId('EditPatientScreen.age'), 44);

		//assert

		expect(getByTestId('EditPatientScreen.name').props.value).not.toBeNull();
		expect(getByTestId('EditPatientScreen.name').props.value).toBe("Raj Kumar");



		expect(getByTestId('EditPatientScreen.age').props.value).not.toBeNull();
		expect(getByTestId('EditPatientScreen.age').props.value).toBe(44);
	});

	test('Should set correct input values1', () => {
		//act
		//const onSubmit = jest.fn();
		const { getByTestId } = wrapper;

		expect(fireEvent.changeText(getByTestId('EditPatientScreen.name'), 'Raj Kumar'));
		expect(fireEvent.changeText(getByTestId('EditPatientScreen.age'), 44));
		//fireEvent.press(getByTestId('EditPatientScreen.submitButton'));

		//assert
		//expect(getParam).toHaveBeenCalledTimes(1);
	});


});
