import { Metadata } from 'next';
interface ProductDetailsProps {
    params: {
        productId: string
    }
}

 export const generateMetadata = ({ params }: ProductDetailsProps): Metadata => {
    return {
        title: `Product ${params.productId}`
    }
 } 

function ProductDetails ({ params }: ProductDetailsProps) {
    return <h2>Details about the product {params.productId}</h2>
}

export default ProductDetails;