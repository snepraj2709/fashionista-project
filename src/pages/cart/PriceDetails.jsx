import { useData } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function PriceDetails() {
	const { state } = useData();
	const navigate = useNavigate();

	const totalPrice = state.cartlist.reduce(
		(acc, curr) => acc + Number(curr.price) * Number(curr.qty),
		0
	);

	return (
		<div className="price-details">
			<h2>Cart Price details</h2>
			<hr />
			{state.cartlist.map(({ _id, title, quantity, qty }) => (
				<div>
					<p>
						{title}({qty})
					</p>
					<hr />
				</div>
			))}
			<h3>Total Price: {totalPrice}</h3>
			<button onClick={() => navigate('/checkout')}>Checkout</button>
		</div>
	);
}
