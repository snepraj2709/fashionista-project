import { useNavigate } from 'react-router-dom';
import { useData } from '../.././context/ProductContext';

export default function ProfileOrder() {
	const navigate = useNavigate();
	const { state } = useData();
	console.log(state.orderList);
	return (
		<div>
			{state.orderList.length === 0 ? (
				<div>
					<h3>No order to display</h3>
				</div>
			) : (
				<div>
					<div>
						{state.orderList.map(element => {
							return (
								<div key={element.id}>
									<div>
										<p>
											payment id: <span>{element.id}</span>
										</p>
										<p>
											Total amount: <span>₹{element.amount}</span>
										</p>
										<p>
											Order date: <span>{element.date.toDateString()}</span>
										</p>
										<p>
											Order will be delivered in{' '}
											{element.cart.reduce((acc, curr) => {
												if (Number(curr.delivery_time) > acc)
													return curr.delivery_time;
												return acc;
											}, 0)}{' '}
											days
										</p>
										<p>Order address:</p>
										<p>
											{element.address.address} {element.address.city}{' '}
											{element.address.state}
										</p>
										<p>
											Mobile: <span>{element.address.mobile}</span> pin:{' '}
											<span>{element.address.pincode}</span>
										</p>
									</div>
									<div className="order-item-right">
										{element.cart.map(item => {
											return (
												<div
													key={item._id}
													className="card-container card-container-hz brd-rd-semi-sq cart-card-container"
												>
													<div className="card-img-container-hz cart-card-img-container">
														<img
															className="card-img brd-rd-semi-sq"
															src={item.image}
															alt="card"
															onClick={() => navigate(`/product/${item._id}`)}
														/>
													</div>
													<div className="card-content">
														<div className="cart_mngmt-card-container">
															<div className="cart_mngmt-card-item">
																<h4
																	className="cursor-pointer"
																	onClick={() =>
																		navigate(`/product/${item._id}`)
																	}
																>
																	{item.title}
																</h4>
															</div>
															<div className="cart_mngmt-card-item">
																<p className="font-wt-semibold">
																	₹ {item.price}
																</p>
																<p className="text-secondary-color">
																	<del>{item.original_price}</del>
																</p>
															</div>
															<div className="cart_mngmt-card-item">
																<div className="text-secondary-color font-wt-bold">
																	{Math.floor(
																		((item.original_price - item.price) /
																			item.original_price) *
																			100
																	)}
																	% OFF
																</div>
															</div>
															<div className="cart_mngmt-card-item">
																<p>Quantity: {item.qty}</p>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
