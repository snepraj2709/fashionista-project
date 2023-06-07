import { ActionTypes, Filters } from './actionConstants';

export const initialState = {
	filters: {
		sortBy: '',
		categories: {},
		rating: '',
		sizes: {},
		search: '',
		PriceRange: 0
	},
	products: [],
	wishlist: [],
	cartlist: [],
	cartPriceDetail: {},
	showNavigation: true,
	addressList: [
		{
			address: 'A 205, Jamnagar Colony',
			alternateMobile: '6394920434',
			city: 'Varanasi',
			id: '1',
			mobile: '6756789867',
			name: 'Sneha Prajapati',
			pincode: '678987',
			state: 'UP'
		}
	],
	orderList: []
};

export const apiReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.InitialDataFetch: {
			if (action.payload.products) {
				const maxValue = action.payload.products.reduce(
					(acc, curr) => (Number(curr.price) > acc ? Number(curr.price) : acc),
					0
				);

				return {
					...state,
					products: action.payload.products.map(element => {
						return {
							...element,
							wishlist: false,
							addToCart: false,
							quantity: 0
						};
					}),
					filters: { ...state.filters, priceRange: maxValue }
				};
			}
			if (action.payload.categories) {
				return {
					...state,
					filters: {
						...state.filters,
						categories: action.payload.categories.reduce(
							(acc, curr) => ({ ...acc, [curr.categoryName]: false }),
							{}
						)
					}
				};
			}
			if (action.payload.sizes) {
				return {
					...state,
					filters: {
						...state.filters,
						sizes: action.payload.sizes.reduce(
							(acc, curr) => ({
								...acc,
								[curr.size]: false
							}),
							{}
						)
					}
				};
			}
			break;
		}
		case ActionTypes.ToggleNav: {
			return { ...state, showNavigation: action.payload };
		}
		case ActionTypes.ChangeFilter: {
			return {
				...state,
				filters: {
					...state.filters,
					[action.payload.filterType]: action.payload.filterValue
				}
			};
		}
		case ActionTypes.ClearFilter: {
			const maxValue = state.products.reduce(
				(acc, curr) => (Number(curr.price) > acc ? Number(curr.price) : acc),
				0
			);
			return {
				...state,
				filters: {
					...initialState.filters,
					categories: Object.keys(state.filters.categories).reduce(
						(acc, curr) => ({ ...acc, [curr]: false }),
						{}
					),
					sizes: Object.keys(state.filters.sizes).reduce(
						(acc, curr) => ({ ...acc, [curr]: false }),
						{}
					),
					[Filters.PriceRange]: maxValue
				}
			};
		}
		case ActionTypes.SetWishList: {
			return {
				...state,
				wishlist: [...action.payload.wishlist],
				products: state.products.map(element => {
					return {
						...element,
						wishlist: action.payload.wishlist.some(
							item => item.id === element.id
						)
					};
				})
			};
		}
		case ActionTypes.SetCartList: {
			return {
				...state,
				cartlist: [...action.payload.cartlist],
				products: state.products.map(element => {
					const product = action.payload.cartlist.find(
						item => item._id === element._id
					);
					return {
						...element,
						addToCart: product ? true : false,
						quantity: product ? product.quantity : 0
					};
				}),
				filteredProduct: action.payload.filteredData
			};
		}
		case ActionTypes.SetCartPriceDetails: {
			return {
				...state,
				cartPriceDetail: { ...action.payload.cartPriceDetail }
			};
		}
		case ActionTypes.ResetCartPriceDetails: {
			return {
				...state,
				cartPriceDetail: {}
			};
		}
		case ActionTypes.ClearCart: {
			return {
				...state,
				cartlist: [],
				products: state.products.map(element => {
					return { ...element, addToCart: false, quantity: 0 };
				})
			};
		}
		case ActionTypes.AddAddress: {
			return {
				...state,
				addressList: [...state.addressList, action.payload.address]
			};
		}
		case ActionTypes.EditAddress: {
			return {
				...state,
				addressList: state.addressList.map(element => {
					return element.id === action.payload.address.id
						? action.payload.address
						: element;
				})
			};
		}
		case ActionTypes.DeleteAddress: {
			return {
				...state,
				addressList: state.addressList.filter(
					element => element.id !== action.payload.id
				)
			};
		}
		case ActionTypes.AddOrder: {
			return {
				...state,
				orderList: state.orderList.concat(action.payload.order)
			};
		}
		case ActionTypes.AddNewData: {
			return {
				...state,
				filteredProduct: action.payload
			};
		}
		default:
			return state;
	}
};
