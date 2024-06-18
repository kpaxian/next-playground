import { Suspense } from "react"

import { Product } from "../components/product"
import { Reviews } from "../components/reviews"

const Loader = () => {
    return <p>Loading...</p>;
}

export default function ProductDetailPage() {
    return (
        <div>
            <h1>Product detail page</h1>
            <Suspense fallback={<Loader />}>
                <Product />
            </Suspense>
            <Suspense fallback={<Loader />}>
                <Reviews />
            </Suspense>
        </div>
    )
}
