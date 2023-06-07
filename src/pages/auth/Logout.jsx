import { useNavigate } from 'react-router-dom';
import './auth.css';

export default function Logout() {
	const navigate = useNavigate();
	return (
		<div className="logoutContainer">
			<div className="leftLogoutCard">
				<h2>You are currently logged out</h2>
				<button onClick={() => navigate('/product')}>See Products</button>
			</div>
			<div className="rightLogoutCard">
				<img src="https://dummyimage.com/200x200/000/fff" alt="logout" />
			</div>
		</div>
	);
}
