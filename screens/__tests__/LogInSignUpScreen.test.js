import React from 'react';
import { render, act } from 'react-native-testing-library';
import { fireEvent } from '@testing-library/react-native';

import LogInSignUpScreen from '../LogInSignUpScreen';
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
    useState: jest.fn(),
}));


describe('LogInSignUpScreen', () => {
	beforeEach(() => {
		const initialState = [];
		store = mockStore(initialState);
		wrapper = render(
			<Provider store={store}>
				<LogInSignUpScreen
					navigation={{ getParam: jest.fn(), setParams: jest.fn() }}
				/>
			</Provider>
		);
	});

	test('Should render correct labels', () => {
		//act
		const { getByTestId } = wrapper;

		//assert
        expect(getByTestId('LogInSignUpScreen.email').props.label).not.toBeNull();
        expect(getByTestId('LogInSignUpScreen.email').props.label).toBe('E-Mail');
        expect(getByTestId('LogInSignUpScreen.password').props.label).not.toBeNull();
        expect(getByTestId('LogInSignUpScreen.password').props.label).toBe('Password');


    });





    test('Should set correct input values', () => {
		//act
		const { getByTestId } = wrapper;

		fireEvent.changeText(getByTestId('LogInSignUpScreen.email'), 'test@test.com');
		fireEvent.changeText(getByTestId('LogInSignUpScreen.password'), '123456');

		//assert

		expect(getByTestId('LogInSignUpScreen.email').props.value).not.toBeNull();
		expect(getByTestId('LogInSignUpScreen.email').props.value).toBe("test@test.com");



		expect(getByTestId('LogInSignUpScreen.password').props.value).not.toBeNull();
		//expect(getByTestId('LogInSignUpScreen.password').props.value).toBe('123456');
	});



    xtest('Should fire button press', () => {
		//act
		const onSubmit = jest.fn();
        const { getByTestId  } = wrapper;
        //wrapper.setIsSignUp(true);


        console.log(getByTestId('LogInSignUpScreen.submitButton').props.title);
        setIsSignUp(true);
        console.log(getByTestId('LogInSignUpScreen.submitButton').props.title);


		//fireEvent.changeText(getByTestId('LogInSignUpScreen.email'), 'test@test.com');
		//fireEvent.changeText(getByTestId('LogInSignUpScreen.password'), "123456");
	    //fireEvent.press(getByTestId('LogInSignUpScreen.submitButton'));

		//assert
		//expect(getByTestId('LogInSignUpScreen.email').props.value).
	});


});
