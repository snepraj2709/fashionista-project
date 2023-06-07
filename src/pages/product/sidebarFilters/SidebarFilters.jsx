import { useData } from '../../../context/ProductContext';
import { ActionTypes, Filters, SortBy } from '../../../data/actionConstants';

import './sidebarFilters.css';
const Rating = ['4', '3', '2', '1'];

export default function SidebarFilters() {
	const { state, dispatch } = useData();

	const maxValue = state.products.reduce(
		(acc, curr) => (Number(curr.price) > acc ? Number(curr.price) : acc),
		0
	);

	//console.log(state.filters);
	return (
		<div className="sidebarFilterOuterContainer">
			<aside className="sidebarCard">
				<div className="sidebarHeader">
					<p>Filters</p>
					<p
						style={{ cursor: 'pointer' }}
						onClick={() => {
							dispatch({ type: ActionTypes.ClearFilter });
						}}
					>
						Clear
					</p>
				</div>
				<div className="sidebarItems">
					<p>Price</p>
					<div className="sidebarPriceRangeLabel">
						<p>0</p>
						<p>{Math.ceil(maxValue / 2)}</p>
						<p>{maxValue}</p>
					</div>
					<div className="priceRangeInputContainer">
						<input
							type="range"
							name="rangeInput"
							className="slider cursor-pointer"
							min="0"
							max={maxValue}
							defaultValue="1000"
							step="100"
							value={state.filters.priceRange}
							onChange={e => {
								dispatch({
									type: ActionTypes.ChangeFilter,
									payload: {
										filterType: Filters.PriceRange,
										filterValue: e.target.value
									}
								});
							}}
						/>
					</div>
				</div>
				<div className="sidebarItems">
					<p>Categories</p>
					<div>
						{Object.keys(state.filters.categories)?.map(category => {
							return (
								<div key={category}>
									<input
										type="checkbox"
										className="cursor-pointer"
										name="category-checkbox"
										value={category}
										id={`${category}-checkbox`}
										checked={state.filters.categories[category]}
										onChange={e =>
											dispatch({
												type: ActionTypes.ChangeFilter,
												payload: {
													filterType: Filters.Categories,
													filterValue: {
														...state.filters.categories,
														[category]: !state.filters.categories[category]
													}
												}
											})
										}
									/>
									<label htmlFor={`${category}-checkbox`}>{category}</label>
								</div>
							);
						})}
					</div>
				</div>
				<div className="sidebarItems">
					<p>Sizes</p>
					<div>
						{Object.keys(state.filters.sizes).map(size => {
							return (
								<div key={size}>
									<input
										type="checkbox"
										className="cursor-pointer"
										name="category-checkbox"
										id={`${size}-checkbox`}
										checked={state.filters.sizes[size]}
										onChange={() =>
											dispatch({
												type: ActionTypes.ChangeFilter,
												payload: {
													filterType: Filters.Sizes,
													filterValue: {
														...state.filters.sizes,
														[size]: !state.filters.sizes[size]
													}
												}
											})
										}
									/>
									<label
										className="cursor-pointer"
										htmlFor={`${size}-checkbox`}
									>
										{size}
									</label>
								</div>
							);
						})}
					</div>
				</div>

				<div className="sidebarItems">
					<p>Rating</p>
					<div>
						{Rating.map(element => {
							return (
								<div key={element}>
									<input
										type="radio"
										className="cursor-pointer"
										name="rating-radio"
										id={`${element}star-radio`}
										value={element}
										checked={state.filters.rating === element ? true : false}
										onChange={() =>
											dispatch({
												type: ActionTypes.ChangeFilter,
												payload: {
													filterType: Filters.Rating,
													filterValue: element
												}
											})
										}
									/>
									<label
										className="cursor-pointer"
										htmlFor={`${element}star-radio`}
									>
										{element} stars {'&'} above
									</label>
								</div>
							);
						})}
					</div>
				</div>
				<div className="sidebarItems">
					<p>Sort by Price</p>
					<div>
						{Object.values(SortBy).map(element => {
							return (
								<div key={element}>
									<input
										type="radio"
										className="cursor-pointer"
										name="sortby-radio"
										id={`${element}-radio`}
										value={element}
										checked={state.filters.sortBy === element ? true : false}
										onChange={() =>
											dispatch({
												type: ActionTypes.ChangeFilter,
												payload: {
													filterType: Filters.SortBy,
													filterValue: element
												}
											})
										}
									/>
									<label
										className="cursor-pointer"
										htmlFor={`${element}-radio`}
									>
										Price - {element}
									</label>
								</div>
							);
						})}
					</div>
				</div>
			</aside>
		</div>
	);
}
