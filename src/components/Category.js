import { useNavigate } from 'react-router-dom';
import { useData } from '../context/ProductContext';
import { useCallback } from 'react';
import { ActionTypes, Filters } from '.././data/actionConstants';
import './category.css';
import { categories } from '.././backend/db/categories';

export default function Category() {
	const { state, dispatch } = useData();
	const allCategory = categories;
	const navigate = useNavigate();

	const categoryFilter = useCallback(
		category => {
			const { categories } = state.filters;

			const updatedCategories = {
				...Object.keys(categories).reduce((acc, curr) => {
					return { ...acc, [curr]: false };
				}, {}),
				[category]: true
			};
			dispatch({
				type: ActionTypes.ChangeFilter,
				payload: {
					filterType: Filters.Categories,
					filterValue: updatedCategories
				}
			});
			navigate('/product');
		},
		[dispatch, state.filters, navigate]
	);
	//console.log(state);
	//console.log(state.filters.categories);

	return (
		<div className="categoryContainer">
			{allCategory?.map(({ _id, image, categoryName }) => (
				<div
					key={_id}
					onClick={() => categoryFilter(categoryName)}
					className="categoryCard"
				>
					<div className="card-image ">
						<img src={image} alt="card" />
					</div>
					<div className="card-content">
						<p>NEW ARRIVAL</p>
						<div className="card-footer-text">
							<h3>{categoryName} Collection</h3>
							<p>Check out our best {categoryName.toLowerCase()} collection</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
