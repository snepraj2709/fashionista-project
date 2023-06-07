import ProductData from '../productData/ProductData';
import SidebarFilters from '../sidebarFilters/SidebarFilters';
import '../product.css';

export default function ProductList() {
	return (
		<div>
			<div className="product-page-container">
				<div className="sidebar-filters">
					<SidebarFilters />
				</div>
				<div className="product-data">
					<ProductData />
				</div>
			</div>
		</div>
	);
}
