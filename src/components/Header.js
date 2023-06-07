import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { InputAdornment, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Badge, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import { useData } from '../context/ProductContext';
import { useAuth } from '../context/authContext';
import { useRef } from 'react';

export default function Header() {
	const { state } = useData();
	const { token, logoutHandler } = useAuth();

	const inputRef = useRef(null);
	//const wishlist = state.products.filter(item => item.wishlist);
	const navigate = useNavigate();
	const wishlist = state.wishlist;

	const logoutClickHandler = () => {
		logoutHandler();
		navigate('/logout');
	};

	return (
		<div className="header">
			<div className="headerContainer">
				<h2 onClick={() => navigate('./')} className="cursor-pointer">
					Fashionista
				</h2>
				<Input
					ref={inputRef}
					placeholder="Search"
					style={{ border: '1px solid var(--brown)', borderRadius: '10px' }}
					startAdornment={
						<InputAdornment
							position="start"
							onClick={() => inputRef.current.focus()}
						>
							<SearchIcon />
						</InputAdornment>
					}
				/>
				<div className="header-login-container">
					<p
						onClick={() => {
							navigate('/product');
						}}
						className="cursor-pointer"
					>
						Explore
					</p>

					{token ? (
						<button
							onClick={() => logoutClickHandler()}
							className="cursor-pointer"
						>
							Log Out
						</button>
					) : (
						<button
							onClick={() => {
								navigate('/login');
							}}
							className="cursor-pointer"
						>
							Login
						</button>
					)}
					<IconButton
						onClick={() => {
							navigate('/profile');
						}}
						className="cursor-pointer"
					>
						<AccountCircleOutlinedIcon />
					</IconButton>
					<IconButton
						onClick={() => {
							navigate('/wishlist');
						}}
						className="cursor-pointer"
					>
						<Badge badgeContent={wishlist.length} color="primary">
							<FavoriteBorderOutlinedIcon />
						</Badge>
					</IconButton>
					<IconButton
						onClick={() => {
							navigate('/cart');
						}}
						className="cursor-pointer"
					>
						<Badge badgeContent={state.cartlist.length} color="primary">
							<ShoppingCartOutlinedIcon />
						</Badge>
					</IconButton>
				</div>
			</div>
		</div>
	);
}
