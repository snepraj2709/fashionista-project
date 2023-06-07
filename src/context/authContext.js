//import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { LoginService } from '../api/allApiCalls';
import { SignUpService } from '../api/allApiCalls';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const localStorageToken = JSON.parse(localStorage.getItem('loginItems'));
	const [token, setToken] = useState(localStorageToken?.token);
	const [currentUser, setCurrentUser] = useState(localStorageToken?.user);

	const loginHandler = async (email, password) => {
		try {
			const {
				data: { foundUser, encodedToken },
				status
			} = await LoginService({ email, password });
			if (status === 200) {
				localStorage.setItem(
					'loginItems',
					JSON.stringify({ token: encodedToken, user: foundUser })
				);
				setCurrentUser(foundUser);
				setToken(encodedToken);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const logoutHandler = () => {
		localStorage.removeItem('loginItems');
		setToken(null);
		setCurrentUser(null);
	};

	const signupHandler = async (email, password, name) => {
		try {
			const {
				data: { createdUser, encodedToken },
				status
			} = await SignUpService({ email, password, name });
			if (status === 200 || status === 201) {
				// saving the encodedToken in the localStorage
				localStorage.setItem(
					'loginItems',
					JSON.stringify({ token: encodedToken, user: currentUser })
				);
			}
			setCurrentUser(createdUser);
			setToken(encodedToken);
		} catch (error) {
			console.log(error);
		}
	};
	//console.log(currentUser);

	return (
		<AuthContext.Provider
			value={{ token, currentUser, loginHandler, logoutHandler, signupHandler }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
