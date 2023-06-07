import Favorite from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { useData } from '../../../context/ProductContext';
import {
	PostWishlist,
	DeleteWishlist,
	AddToCart
} from '../../../api/allApiCalls';
import { ActionTypes } from '../../../data/actionConstants';

export default function ProductCard({ product }) {
	const { state, dispatch } = useData();
	const { filteredProduct } = state;
	const {
		_id,
		id,
		image,
		rating,
		reviews,
		size,
		title,
		original_price,
		price,
		wishlist,
		addToCart,
		trending
	} = product;

	let currentProduct = state.products.find(item => item.id === id);

	//console.log(currentProduct);

	const [wishlistDisbale, setWishlistDisable] = useState(
		currentProduct.wishlist
	);
	const { token } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	//const { state, dispatch } = useData();

	const wishlistHandler = async () => {
		try {
			if (!token) {
				navigate('/login', { state: { from: location } });
				return;
			}

			if (currentProduct.wishlist) {
				const response = await PostWishlist({
					product: { ...product, wishlist: true },
					encodedToken: token
				});
				if (response.status === 200 || response.status === 201) {
					dispatch({
						type: ActionTypes.SetWishList,
						payload: response.data.wishlist
					});
					product.wishlist = true;
				}
				//console.log(response);
			} else {
				const response = await DeleteWishlist({
					productId: _id,
					encodedToken: token
				});
				if (response.status === 200 || response.status === 201) {
					dispatch({
						type: ActionTypes.SetWishList,
						payload: { wishlist: response.data.wishlist }
					});
					product.wishlist = false;
					console.log(response);
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setWishlistDisable(!wishlistDisbale);
		}
	};

	const cartHandler = async () => {
		//console.log(currentProduct);
		try {
			//console.log(product);
			if (!token) {
				navigate('/login', { state: { from: location } });
				return;
			}
			if (addToCart) {
				navigate('/cart');
				// console.log(addToCart);
				return;
			} else {
				const response = await AddToCart({
					product: {
						...product,
						quantity: 1,
						addToCart: true
					},
					encodedToken: token
				});
				// console.log(response.data);
				if (response.status === 200 || response.status === 201) {
					dispatch({
						type: ActionTypes.SetCartList,
						payload: {
							cartlist: response.data.cart,
							filteredData: [
								...filteredProduct,
								{ ...currentProduct, addToCart: true }
							]
						}
					});
				} else {
					navigate('/cart');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const offer = ((original_price - price) * 100) / original_price;

	return (
		<div className="product-card">
			<div className="image-card">
				<img
					src={image}
					alt="product"
					onClick={() => navigate(`/product/${id}`)}
				/>
				<div className="icon-container ">
					<div className="icon favorite">
						<Favorite
							style={{
								color: wishlistDisbale ? 'red' : 'white'
							}}
							onClick={wishlistHandler}
							disabled={wishlistDisbale}
						/>
					</div>
					{trending ? (
						<div className="icon trending">
							<TrendingUpIcon />
						</div>
					) : null}
				</div>
				<div className="other-icon-container ">
					<div className="other-icon rating-container">
						<StarIcon className=" star" />
						<span className="rating-text">
							{' '}
							{rating} | {reviews}
						</span>
					</div>
					<p className="other-icon size">{size}</p>
				</div>
			</div>
			<div className="product-details">
				<p className="product-title">{title}</p>
				<div className="product-price">
					<span className="price">
						<span>${price}</span>
						<span style={{ textDecoration: 'line-through', color: '#cccccc' }}>
							${original_price}
						</span>
					</span>

					<p>${offer.toFixed(0)}% OFF</p>
				</div>
			</div>

			<button
				className="add-to-cart"
				style={{
					backgroundColor: addToCart ? '#a7978a' : '#1e1318',
					color: addToCart ? '#0e090b' : '#f7f7f7'
				}}
				onClick={() => cartHandler()}
			>
				<AddShoppingCartIcon className="cart" />{' '}
				{addToCart ? 'Go to Cart' : 'Add to Cart'}
			</button>
		</div>
	);
}
