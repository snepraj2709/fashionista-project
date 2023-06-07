import { useData } from '../../context/ProductContext';

export default function Checkout() {
	const { state } = useData();
	const totalPrice = state.cartlist.reduce(
		(acc, curr) => acc + Number(curr.price) * Number(curr.qty),
		0
	);
	return (
		<div className="price-details">
			<h2>Order Summary</h2>
			<hr />
			{state.cartlist.map(({ title, qty }) => (
				<div>
					<p>
						{title}({qty})
					</p>
					<hr />
				</div>
			))}
			<h3>Total Price: {totalPrice}</h3>
			<button>Checkout</button>
		</div>
	);
}
