import React from 'react';
import { render, fireEvent, shallow } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { mockComponent } from '../../testing-config/mockComponent';
//import {  Button } from 'react-native';

import PatientsListScreen from '../PatientsListScreen';

const mockStore = configureStore([thunk]);
let store, wrapper;

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
	useEffect: jest.fn(),
	useDispatch: jest.fn(),
	useState: jest.fn(),
}));

jest.mock('react-native/Libraries/Components/Button.js', () => {
	return mockComponent(
		'react-native/Libraries/Components/Button.js',
		(props) => {
			return {
				onPress: props.onPress,
			};
		}
	);
});

describe('PatientListScreen', () => {
	xtest('can press the button', () => {
		const onPressMock = jest.fn();
		const initialState = [];
		store = mockStore(initialState);
		//const { getByText } = render(<Button text="Testing" onPress={onPressMock} />);

		const {
			getAllByTestId,
			getByTestId,
			getByText,
			queryAllByText,
			queryByText,
		} = render(
			<Provider store={store}>
				<PatientsListScreen
					navigation={{ getParam: jest.fn(), setParams: jest.fn() }}
				/>
			</Provider>
		);

		// fireEvent.press(getAllByTestId("PatientsListScreen.view"));
		expect(onPressMock).toHaveBeenCalled();
		expect(onPressMock.mock.calls.length).toBe(1);

		fireEvent.press(getByText('Testing'));
		expect(onPressMock.mock.calls.length).toBe(2);
	});

	xtest('Should set correct input values1', () => {
		//act
		const onSubmit = jest.fn();

		const onPressMock = jest.fn();
		const initialState = [];
		store = mockStore(initialState);
		//const { getByText } = render(<Button text="Testing" onPress={onPressMock} />);

		const {
			getAllByTestId,
			getByTestId,
			getByText,
			queryAllByText,
			queryByText,
		} = render(
			<Provider store={store}>
				<PatientsListScreen
					navigation={{ getParam: jest.fn(), setParams: jest.fn() }}
				/>
			</Provider>
		);

		fireEvent.changeText(getByTestId('EditPatientScreen.name'), 'Raj Kumar');
		fireEvent.changeText(getByTestId('EditPatientScreen.age'), 44);
		fireEvent.press(getByTestId('EditPatientScreen.submitButton'));

		//assert
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
});
