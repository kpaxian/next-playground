interface ProductDetailsProps {
    params: {
        productId: string
    }
} 

function ProductDetails ({ params }: ProductDetailsProps) {
    return <h2>Details about the product {params.productId}</h2>
}

export default ProductDetails;