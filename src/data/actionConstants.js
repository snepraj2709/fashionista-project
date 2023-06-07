export const ActionTypes = {
	InitialDataFetch: 'INITIAL_DATA_FETCH',
	ToggleNav: 'TOGGLE_NAV',
	ChangeFilter: 'CHANGE_FILTER',
	SetWishList: 'SET_WISHLIST',
	SetCartList: 'SET_CARTLIST',
	SetCartPriceDetails: 'SET_CART_PRICE_DETAILS',
	ResetCartPriceDetails: 'RESET_CART_PRICE_DETAILS',
	ClearCart: 'CLEAR_CART',
	AddAddress: 'ADD_ADDRESS',
	EditAddress: 'EDIT_ADDRESS',
	DeleteAddress: 'DELETE_ADDRESS',
	AddOrder: 'ADD_ORDER',
	AddNewData: 'ADD_NEW_DATA'
};

export const Filters = {
	SortBy: 'sortBy',
	Categories: 'categories',
	Rating: 'rating',
	Sizes: 'sizes',
	PriceRange: 'priceRange',
	Search: 'search'
};

export const CartlistActionType = {
	Increment: 'increment',
	Decrement: 'decrement'
};

export const Categories = {
	Men: 'MEN',
	Women: 'WOMEN',
	Kids: 'KIDS'
};
export const Sizes = {
	s: 'S',
	m: 'M',
	l: 'L',
	xl: 'XL',
	xxl: 'XXL'
};

export const SortBy = {
	lowToHigh: 'LowToHigh',
	highToLow: 'HighToLow'
};
