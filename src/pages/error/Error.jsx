import { useNavigate } from 'react-router-dom';
import './error.css';

export default function Error() {
	const navigate = useNavigate();
	return (
		<div className="errorContainer">
			<div className="errorImageContainer">
				<img
					className="img-responsive"
					src="https://res.cloudinary.com/donqbxlnc/image/upload/v1649229364/Saly-44_ulssjz.png"
					alt=""
				/>
			</div>

			<div className="errorText">
				<div className="errorHeading">
					<h1>We looked everywhere</h1>
				</div>
				<div className="errorSubheading">Looks like this page is missing</div>
				<div>
					<button onClick={() => navigate('/')} className="errorButton">
						Go to Homepage
					</button>
				</div>
			</div>
		</div>
	);
}
