import { useData } from '../../context/ProductContext';
import './cart.css';
import CartCard from './CartCard';
import PriceDetails from './PriceDetails';

export default function CartList() {
	const { state } = useData();

	return (
		<div>
			{state.cartlist.length === 0 ? (
				<h2>No product in Cart</h2>
			) : (
				<div>
					<h2>My Cart({state.cartlist.length})</h2>
					<div className="cart-container">
						<div className="leftContainer">
							<div>
								{state.cartlist?.map(item => (
									<div key={item.id}>
										<CartCard product={item} />
									</div>
								))}
							</div>
						</div>
						<div className="rightContainer">
							<PriceDetails />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
