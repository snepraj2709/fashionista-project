import './styles.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';
import ProductList from './pages/product/productList/ProductList';
import Wishlist from './pages/wishlist/Wishlist';
import ProductDetails from './pages/product/productDetail/ProductDetails';
import Profile from './pages/profile/Profile';
import Mockman from 'mockman-js';
import ProfileAddress from './pages/profile/ProfileAddress';
import ProfileDetails from './pages/profile/ProfileDetails';
import ProfileOrder from './pages/profile/ProfileOrder';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Logout from './pages/auth/Logout';
import CartList from './pages/cart/CartList';
import Error from './pages/error/Error';
import Checkout from './pages/cart/Checkout';

export default function App() {
	//console.log(state);
	return (
		<div className="App">
			<div>
				<Header />
				<Routes>
					<Route path="/mockman" element={<Mockman />} />
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/product" element={<ProductList />} />
					<Route path="/wishlist" element={<Wishlist />} />
					<Route path="/product/:id" element={<ProductDetails />} />
					<Route path="/cart" element={<CartList />} />
					<Route path="/checkout" element={<Checkout />} />

					<Route path="/profile" element={<Profile />}>
						<Route path="details" element={<ProfileDetails />} />
						<Route path="address" element={<ProfileAddress />} />
						<Route path="order" element={<ProfileOrder />} />
					</Route>

					<Route path="/404" element={<Error />} />
					<Route path="*" element={<Navigate to={'/404'} />} />
				</Routes>
			</div>
		</div>
	);
}
