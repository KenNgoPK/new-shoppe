import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import styles from './producItem.module.css'

const ProductItem = ({ product }) => {
    const router = useRouter();

    return (
        <Card 
            onClick={() => router.push(`/products/${product.id}`)} 
            style={{ width: '18rem', cursor: 'pointer' }}
            className="product-card mb-3"
        >
            <Card.Img 
                variant="top" 
                src={product.imgurl} 
                style={{ height: '150px', objectFit: 'cover' }} 
                alt={product.name}
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
            </Card.Body>
        </Card>
        
    );
};

export default ProductItem;
