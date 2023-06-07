import ProductCard from '../productCard/ProductCard';
import { useData } from '../../../context/ProductContext';
import { useEffect, useRef } from 'react';
import { SortBy } from '../../../data/actionConstants';
import { ActionTypes } from '../../../data/actionConstants';

export default function ProductData() {
	const { state, dispatch } = useData();
	const { filters, products, filteredProduct } = state;
	let filteredData = useRef([...products]).current;

	const filteredDataRef = useRef([...products]);

	useEffect(() => {
		applyFilter();
	}, [filters]);

	const applyFilter = () => {
		// Update filteredDataRef
		filteredDataRef.current = filteredData;

		//priceFilter
		filteredData = filteredData.filter(
			product => Number(product.price) <= Number(filters.priceRange)
		);

		//categoryFilter
		const selectedCategories = Object.keys(filters.categories).filter(
			category => filters.categories[category]
		);
		if (selectedCategories.length > 0) {
			filteredData = filteredData.filter(product =>
				selectedCategories.includes(product.category)
			);
		}

		//sizeFilter
		const selectedSizes = Object.keys(filters.sizes).filter(
			size => filters.sizes[size]
		);
		if (selectedSizes.length > 0) {
			filteredData = filteredData.filter(product =>
				selectedSizes.includes(product.size)
			);
		}

		//ratingFilter
		if (filters.rating !== '') {
			filteredData = filteredData.filter(
				product => Number(product.rating) >= Number(filters.rating)
			);
		}

		//sorting
		if (filters.sortBy === SortBy.lowToHigh) {
			filteredData = filteredData.sort(
				(a, b) => Number(a.price) - Number(b.price)
			);
		} else if (filters.sortBy === SortBy.highToLow) {
			filteredData = filteredData.sort(
				(a, b) => Number(b.price) - Number(a.price)
			);
		}
		console.log(filteredData);
		dispatch({ type: ActionTypes.AddNewData, payload: filteredData });
	};

	//console.log(state);
	return (
		<div className="product-container">
			{filteredProduct?.map(product => (
				<div className="product-card" key={product.id}>
					<ProductCard product={product} />
				</div>
			))}
		</div>
	);
}
