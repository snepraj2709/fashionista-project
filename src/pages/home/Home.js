import Footer from '../../components/Footer';
import Category from '../../components/Category';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();
	return (
		<div>
			<img
				onClick={() => navigate('/product')}
				className="img-responsive cursor-pointer"
				src="https://res.cloudinary.com/dqg4mckho/image/upload/v1685980497/E-Commerce_Facebook_Ad_cm59xu.png"
				alt="Hero banner "
			/>

			<h2>Categories</h2>
			<Category />
			<Footer />
		</div>
	);
}
