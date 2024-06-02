import { notFound } from "next/navigation";
interface ReviewDetailProps {
    params: {
        reviewId: string;
        productId: string;
    }
}

export default function ReviewDetail({params}: ReviewDetailProps) {
    if (parseInt(params.reviewId) > 1000) {
        notFound()
    }
    return (
        <h1>Review {params.reviewId} for product {params.productId}</h1>
    )
} 