"use client";
import { useRouter } from 'next/navigation';
export default function OrderProduct() {
    const router = useRouter();
    const handleClick = () => {
        console.log('placing yout order')
        router.push('/');
    }
    return (
        <>
            <h1>OrderProduct</h1>
            <button onClick={handleClick}>Place Order</button>
        </>
    );
};