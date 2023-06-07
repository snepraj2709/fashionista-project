import { useNavigate, Outlet } from 'react-router-dom';

export default function Profile() {
	const navigate = useNavigate();
	return (
		<div>
			<div className="profileContainer">
				<div className="profileLinks">
					<p onClick={() => navigate('/profile/details')}>Account</p>
				</div>
				<div className="profileLinks">
					<p onClick={() => navigate('/profile/address')}>Address</p>
				</div>
				<div className="profileLinks">
					<p onClick={() => navigate('/profile/order')}>Orders</p>
				</div>
			</div>

			<div className="detailsContainer">
				<Outlet />
			</div>
		</div>
	);
}
