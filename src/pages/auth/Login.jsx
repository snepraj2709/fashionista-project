import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Login() {
	const { token, loginHandler } = useAuth();
	const defaultLoginCred = {
		email: 'adarshbalika@gmail.com',
		password: 'adarshbalika'
	};

	const [login, setLogin] = useState({ email: '', password: '' });
	const location = useLocation();
	const navigate = useNavigate();

	const guestLoginHandler = () => {
		loginHandler(defaultLoginCred.email, defaultLoginCred.password);
	};
	//console.log(location);

	const newLoginHandler = e => {
		e.preventDefault();
		loginHandler(login.email, login.password);
	};

	useEffect(() => {
		if (token) {
			navigate(location?.state?.from.pathname || '/', { replace: true });
		}
	}, [token]);

	return (
		<div>
			<form>
				<h2>Sign In</h2>
				<div>
					<label for="email">Email</label>
					<input
						type="text"
						placeholder="adarshbalika@gmail.com"
						required={true}
						value={login.email}
						onChange={e =>
							setLogin(prevState => ({ ...prevState, email: e.target.value }))
						}
					/>
				</div>

				<div>
					<label for="password">
						Password
						<input
							type="password"
							placeholder="adarshBalika"
							required={true}
							value={login.password}
							onChange={e =>
								setLogin(prevState => ({
									...prevState,
									password: e.target.value
								}))
							}
						/>
					</label>
				</div>
				<button type="submit" onClick={e => newLoginHandler(e)}>
					Login
				</button>
				<button onClick={guestLoginHandler}>Login as Guest</button>
				<span>
					<p>
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</p>
				</span>
			</form>
		</div>
	);
}
