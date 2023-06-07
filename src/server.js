import { Server, Model, RestSerializer } from 'miragejs';
import {
	addNewAddressHandler,
	getAllAddressesHandler,
	removeAddressHandler
} from './backend/controllers/AddressController';
import {
	loginHandler,
	signupHandler
} from './backend/controllers/AuthController';
import {
	addItemToCartHandler,
	getCartItemsHandler,
	removeItemFromCartHandler,
	updateCartItemHandler
} from './backend/controllers/CartController';
import {
	getAllCategoriesHandler,
	getCategoryHandler
} from './backend/controllers/CategoryController';
import {
	getAllSizesHandler,
	getSizeHandler
} from './backend/controllers/SizeController';

import { getAllCouponsHandler } from './backend/controllers/CouponController';
import {
	getAllProductsHandler,
	getProductHandler
} from './backend/controllers/ProductController';
import {
	addItemToWishlistHandler,
	getWishlistItemsHandler,
	removeItemFromWishlistHandler
} from './backend/controllers/WishlistController';
import { categories } from './backend/db/categories';
import { sizes } from './backend/db/sizes';
import { products } from './backend/db/products';
import { users } from './backend/db/users';

export function makeServer({ environment = 'development' } = {}) {
	return new Server({
		serializers: {
			application: RestSerializer
		},
		environment,
		models: {
			product: Model,
			category: Model,
			user: Model,
			size: Model,
			cart: Model,
			wishlist: Model,
			address: Model
		},

		// Runs on the start of the server
		seeds(server) {
			// disballing console logs from Mirage
			server.logging = false;
			products.forEach(item => {
				server.create('product', { ...item });
			});

			users.forEach(item =>
				server.create('user', { ...item, cart: [], wishlist: [], address: [] })
			);

			categories.forEach(item => server.create('category', { ...item }));

			sizes.forEach(item => server.create('size', { ...item }));
		},

		routes() {
			this.namespace = 'api'; // Define your desired namespace

			// Define the route for the endpoint
			// this.get('https://unpkg.com/react@18.2.0/jsx-runtime.js', () => {
			// 	return new Response(404, {}, 'Endpoint not found');
			// });

			// auth routes (public)
			this.post('/auth/signup', signupHandler.bind(this));
			this.post('/auth/login', loginHandler.bind(this));

			// products routes (public)
			this.get('/products', getAllProductsHandler.bind(this));
			this.get('/products/:productId', getProductHandler.bind(this));

			// categories routes (public)
			this.get('/categories', getAllCategoriesHandler.bind(this));
			this.get('/categories/:categoryId', getCategoryHandler.bind(this));

			// size routes (public)
			this.get('/sizes', getAllSizesHandler.bind(this));
			this.get('/sizes/:sizeId', getSizeHandler.bind(this));

			// coupons route (public)
			this.get('/coupon', getAllCouponsHandler.bind(this));

			// cart routes (private)
			this.get('/user/cart', getCartItemsHandler.bind(this));
			this.post('/user/cart', addItemToCartHandler.bind(this));
			this.post('/user/cart/:productId', updateCartItemHandler.bind(this));
			this.delete(
				'/user/cart/:productId',
				removeItemFromCartHandler.bind(this)
			);

			// wishlist routes (private)
			this.get('/user/wishlist', getWishlistItemsHandler.bind(this));
			this.post('/user/wishlist', addItemToWishlistHandler.bind(this));
			this.delete(
				'/user/wishlist/:productId',
				removeItemFromWishlistHandler.bind(this)
			);

			// address routes (private)
			this.get('/user/addresses', getAllAddressesHandler.bind(this));
			this.post('/user/address', addNewAddressHandler.bind(this));
			this.delete('/user/address/:addressId', removeAddressHandler.bind(this));

			// If you want to passthrough requests that are not handled by MirageJS
			this.passthrough();

			// Ignore the request for the React JSX runtime script
			this.get(
				'https://cdn.jsdelivr.net/npm/react@18.2.0/jsx-runtime.js',
				() => {}
			);
		}
	});
}
