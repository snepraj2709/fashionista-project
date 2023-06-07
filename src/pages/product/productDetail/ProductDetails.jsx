import ProductCard from '../productCard/ProductCard';
import '../product.css';
import { useParams } from 'react-router-dom';
import { useData } from '../../../context/ProductContext';

export default function ProductDetails() {
	const { id } = useParams();
	const { state } = useData();

	const currentProduct = state.products.find(product => product.id === id);
	console.log(id);

	if (!currentProduct) {
		// when the product is not found
		return <div>Product not found</div>;
	}
	return (
		<div className="product-details-card">
			<ProductCard product={currentProduct} />
		</div>
	);
}
