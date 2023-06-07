import Favorite from '@mui/icons-material/Favorite';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './cart.css';
import { useAuth } from '../../context/authContext';
import { useData } from '../../context/ProductContext';
import {
	PostWishlist,
	DeleteWishlist,
	DeleteFromCart,
	PlusMinusCart
} from '../../api/allApiCalls';
import { ActionTypes, CartlistActionType } from '../../data/actionConstants';

export default function CartCard({ product }) {
	const { token } = useAuth();
	const { dispatch } = useData();
	const navigate = useNavigate();
	const { _id, id, image, title, price, original_price, qty } = product;

	const [wishlist, setWishlist] = useState(product.wishlist);

	const wishlistHandler = () => {
		setWishlist(!wishlist);
		if (!wishlist) {
			DeleteWishlist({ productId: id, encodedToken: token });
		} else {
			PostWishlist({
				product: {
					...product,
					wishlist: true
				},
				encodedToken: token
			});
		}
	};

	const deleteCartHandler = async () => {
		try {
			const { status, data } = await DeleteFromCart({
				productId: _id,
				encodedToken: token
			});
			if (status === 200 || status === 201) {
				dispatch({
					type: ActionTypes.SetCartList,
					payload: { cartlist: data.cart }
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const incrementCartHandler = async () => {
		try {
			const { status, data } = await PlusMinusCart({
				productId: _id,
				encodedToken: token,
				type: CartlistActionType.Increment
			});

			if (status === 200 || status === 201) {
				dispatch({
					type: ActionTypes.SetCartList,
					payload: { cartlist: data.cart }
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const decrementCartHandler = async () => {
		if (qty <= 1) {
			deleteCartHandler();
			return;
		}
		try {
			const { status, data } = await PlusMinusCart({
				productId: _id,
				encodedToken: token,
				type: CartlistActionType.Decrement
			});

			if (status === 200 || status === 201) {
				dispatch({
					type: ActionTypes.SetCartList,
					payload: { cartlist: data.cart }
				});
			}
		} catch (error) {
			console.error(error);
		}
	};
	//console.log(product);

	return (
		<div className="card">
			<div className="image-card">
				<img
					src={image}
					alt="product"
					onClick={() => navigate(`/product/${id}`)}
				/>

				<div className="icon-container ">
					<div className="icon favorite">
						<Favorite
							onClick={() => wishlistHandler()}
							style={{
								color: wishlist ? 'red' : 'white'
							}}
						/>
					</div>
				</div>
			</div>
			<div className="product-details">
				<p className="product-title">{title}</p>
				<div className="price-dtails">
					<p className="product-price">${price}</p>
					<p className="product-price">${original_price}</p>
				</div>
				<div className="product-quantity">
					<p className="product-title">Quantity</p>
					<i
						class="fa fa-minus-circle cursor-pointer"
						aria-hidden="true"
						onClick={() => decrementCartHandler()}
					></i>
					<p>{qty > 0 ? qty : 0}</p>
					<i
						class="fa-solid fa-circle-plus cursor-pointer"
						onClick={() => incrementCartHandler()}
					></i>
				</div>
				<button onClick={() => deleteCartHandler()}>Remove from cart</button>
			</div>
		</div>
	);
}
