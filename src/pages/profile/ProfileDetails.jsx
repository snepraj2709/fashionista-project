import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export default function ProfileDetails() {
	const { currentUser, logoutHandler } = useAuth();
	const navigate = useNavigate();

	const currentProfileLogout = () => {
		logoutHandler();
		navigate('/logout');
	};
	console.log(currentUser);

	return (
		<div>
			<div>
				<h2>Name: {currentUser?.firstName}</h2>
			</div>
			<div>
				<h2>Email: {currentUser?.email}</h2>
			</div>
			<div>
				<button onClick={currentProfileLogout}>Logout</button>
			</div>
		</div>
	);
}
