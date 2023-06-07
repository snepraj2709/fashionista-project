import { createContext, useEffect, useReducer, useContext } from 'react';
import { ActionTypes } from '../data/actionConstants';
import {
	GetAllCategories,
	GetAllProducts,
	GetAllSizes,
	GetCartList,
	GetWishlist
} from '../api/allApiCalls';

import { useAuth } from './authContext';

import { apiReducer, initialState } from '../data/apiReducer';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(apiReducer, initialState);
	const { token } = useAuth();
	//console.log(state);

	useEffect(() => {
		(async () => {
			try {
				const productData = await GetAllProducts();

				if (productData.status === 200) {
					dispatch({
						type: ActionTypes.InitialDataFetch,
						payload: { products: productData.data.products }
					});
				}

				const categoryData = await GetAllCategories();
				if (categoryData.status === 200) {
					dispatch({
						type: ActionTypes.InitialDataFetch,
						payload: { categories: categoryData.data.categories }
					});
				}

				const sizeData = await GetAllSizes();
				if (sizeData.status === 200) {
					dispatch({
						type: ActionTypes.InitialDataFetch,
						payload: { sizes: sizeData.data.sizes }
					});
				}

				if (token) {
					const wishlistData = await GetWishlist({ encodedToken: token });
					if (wishlistData.status === 200) {
						dispatch({
							type: ActionTypes.SetWishlist,
							payload: { wishlist: wishlistData.data.wishlist }
						});
					}

					const cartData = await GetCartList({ encodedToken: token });
					if (cartData.status === 200) {
						dispatch({
							type: ActionTypes.SetCartlist,
							payload: { cartList: cartData.data.cart }
						});
					}
				}
			} catch (e) {
				console.log(e);
			}

			// id = setTimeout(() => {
			// 	setLoader(false);
			// }, 1000);
		})();

		// return () => clearTimeout(id);
	}, [token]);

	return (
		<ProductContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
export const useData = () => useContext(ProductContext);
