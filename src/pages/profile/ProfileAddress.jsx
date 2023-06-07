import { initialState } from '../../data/apiReducer';
import './profileAddress.css';

export default function ProfileAddress() {
	const { addressList } = initialState;

	//console.log(addressList);
	return (
		<div className="address">
			<div>
				<button className="addNewAddress">Add new Address</button>
			</div>
			<div>
				{addressList.map(
					({ address, alternateMobile, city, id, mobile, pincode, state }) => (
						<div className="addressCard">
							<p>
								{address},{city}, {state}
							</p>
							<p>
								<b>Mobile:</b> {mobile}
							</p>
							<p>
								<b>Alternate Mobile:</b> {alternateMobile}
							</p>

							<p>
								<b>Pincode :</b> {pincode}
							</p>
							<div className="buttonContaniner">
								<button className="buttonCard edit">Edit</button>
								<button className=" buttonCard delete">Delete</button>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
