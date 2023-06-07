import { useState, useReducer, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './auth.css';
import {
	validateOnlyString,
	validateEmail,
	validatePassword
} from '../../utils/inputChecks';

export default function SignUp() {
	const { token, currentUser } = useAuth();
	const [alertMessage, setAlertMessage] = useState({
		error: false,
		nameError: '',
		emailError: '',
		passwordError: '',
		confirmPasswordError: ''
	});
	const { signupHandler } = useAuth();
	const navigate = useNavigate();

	const changeHandlerReducer = (state, action) => {
		switch (action.type) {
			case 'name': {
				state.name = action.payload;
				if (!validateOnlyString(action.payload)) {
					setAlertMessage(prevState => ({
						...prevState,
						error: true,
						nameError: 'Enter a valid name'
					}));
				} else {
					setAlertMessage(prevState => ({
						...prevState,
						error: false,
						nameError: ''
					}));
				}
				return state;
			}
			case 'email': {
				state.email = action.payload;
				if (!validateEmail(action.payload)) {
					setAlertMessage(prevState => ({
						...prevState,
						error: true,
						emailError: 'Enter a valid email'
					}));
				} else {
					setAlertMessage(prevState => ({
						...prevState,
						error: false,
						emailError: ''
					}));
				}
				return state;
			}
			case 'password': {
				state.password = action.payload;

				if (!validatePassword(action.payload)) {
					setAlertMessage(prevState => ({
						...prevState,
						error: true,
						passwordError: 'Password should be 8-20 characters long'
					}));
				} else {
					setAlertMessage(prevState => ({
						...prevState,
						error: false,
						passwordError: ''
					}));
				}
				return state;
			}

			case 'confirmPassword': {
				state.confirmPassword = action.payload;
				if (!passwordMatched(state.password, state.confirmPassword)) {
					setAlertMessage(prevState => ({
						...prevState,
						error: true,
						confirmPasswordError:
							'Password and confirm password did not matched'
					}));
				} else {
					setAlertMessage(prevState => ({
						...prevState,
						error: false,
						confirmPasswordError: ''
					}));
				}
				return state;
			}
			default:
				return state;
		}
	};

	const submitHandler = e => {
		e.preventDefault();
		let newAlertMessage = {
			...alertMessage,
			error: false,
			nameError: '',
			emailError: '',
			passwordError: '',
			confirmPasswordError: ''
		};

		if (state.name === '') {
			newAlertMessage.error = true;
			newAlertMessage.nameError = 'Name can not be empty';
		}

		if (state.email === '') {
			newAlertMessage.error = true;
			newAlertMessage.emailError = 'Email can not be empty';
		}

		if (state.password === '') {
			newAlertMessage.error = true;
			newAlertMessage.passwordError = 'Password can not be empty';
		}

		if (!newAlertMessage.error) {
			signupHandler(state.email, state.password, state.name);
		}
		setAlertMessage(newAlertMessage);
	};

	const passwordMatched = (password, confirmPassword) => {
		return password === confirmPassword;
	};

	const [state, dispatch] = useReducer(changeHandlerReducer, {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	console.log(currentUser);

	useEffect(() => {
		if (token) {
			navigate('/');
		}
	}, [token]);

	return (
		<div>
			<form className="formCard" onSubmit={submitHandler}>
				<div className="formInputContainer">
					<label>Name </label>
					<input
						type="text"
						placeholder="Adarsh Balika"
						required={true}
						value={state.name}
						onChange={e =>
							dispatch({
								type: 'name',
								payload: e.target.value
							})
						}
					/>
					{alertMessage?.nameError && (
						<div className="errorMessage">{alertMessage?.nameError}</div>
					)}
				</div>

				<div className="formInputContainer">
					<label>Email</label>
					<input
						type="text"
						placeholder="adarshbalika@gmail.com"
						required={true}
						value={state.email}
						onChange={e => dispatch({ type: 'email', payload: e.target.value })}
					/>
					{alertMessage?.emailError && (
						<div className="errorMessage">{alertMessage?.emailError}</div>
					)}
				</div>

				<div className="formInputContainer">
					<label>Password</label>
					<input
						type="password"
						required={true}
						value={state.password}
						onChange={e =>
							dispatch({ type: 'password', payload: e.target.value })
						}
					/>
					{alertMessage?.passwordError && (
						<div className="errorMessage">{alertMessage?.passwordError}</div>
					)}
				</div>

				<div className="formInputContainer">
					<label>Confirm Password</label>
					<input
						type="password"
						required={true}
						value={state.confirmPassword}
						onChange={e =>
							dispatch({ type: 'confirmPassword', payload: e.target.value })
						}
					/>
					{alertMessage?.confirmPasswordError && (
						<div className="errorMessage">
							{alertMessage?.confirmPasswordError}
						</div>
					)}
				</div>
				<button type="submit" onClick={e => submitHandler(e)}>
					Create New Account
				</button>
				<div>
					<span>
						<p>Already have an account ?</p>
						<Link to="/login">Sign In</Link>
					</span>
				</div>
			</form>
		</div>
	);
}
