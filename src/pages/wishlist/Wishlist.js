import './wishlist.css';
import ProductCard from '../../pages/product/productCard/ProductCard';
import { useData } from '../../context/ProductContext';
import { GetWishlist } from '../../api/allApiCalls';
import { useAuth } from '../../context/authContext';
import { useEffect, useState } from 'react';

export default function Wishlist() {
	const { token } = useAuth();
	const [wishlist, setWishlist] = useState([]);

	const wishlistData = async () => {
		try {
			const { status, data } = await GetWishlist({ encodedToken: token });

			if (status === 200 || status === 201) {
				setWishlist(data.wishlist);
				console.log(wishlist);
			}
		} catch (e) {
			console.error(e);
		}
	};
	useEffect(() => {
		wishlistData();
	}, [token]);

	return (
		<div>
			{wishlist.length === 0 ? (
				<h2>No product in wishlist</h2>
			) : (
				<div className="wishlistProductCard">
					{wishlist?.map(product => (
						<div key={product.id}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
