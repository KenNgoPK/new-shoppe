'use client'

import { useState, useEffect } from "react";
import styles from './page.module.css'
import Header from "@/components/Header/Header";

const Cart = () => {
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        try {
            const response = await fetch(`https://form-test-api.vercel.app/api/cart?userId=khanh01`);
            const data = await response.json();
            setProducts(data.items);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const totalProducts = products.reduce((total, product) => total + product.quantity, 0);

    async function handleQuantityInputChange(productId, quantity) {
        if (quantity < 0) return;
        try {
            const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 'khanh01', productId, quantity })
            });
            const data = await response.json();
            setProducts(data.items);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    }

    async function handleDecreaseBtn(product) {
        if (product.quantity <= 1) {
            await handleDeleteBtn(product);
        } else {
            try {
                const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: 'khanh01',
                        productId: product.productId,
                        quantity: product.quantity - 1
                    })
                });
                const data = await response.json();
                setProducts(data.items);
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
        }
    }

    async function handleIncreaseBtn(product) {
        try {
            const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'khanh01',
                    productId: product.productId,
                    quantity: product.quantity + 1
                })
            });
            const data = await response.json();
            setProducts(data.items);
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    }

    async function handleDeleteBtn(product) {
        try {
            const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'khanh01',
                    productId: product.productId
                })
            });
            const data = await response.json();
            setProducts(data.items);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    return (
        <div>
            <Header></Header>
            <div className={styles.cartContainer}>
                <h1 className={styles.cartTitle}>Cart</h1>
                <p className={styles.totalProducts}>Total Products: {totalProducts}</p>
                <ul className={styles.productList}>
                    {products.map((product) => (
                        <li key={product.productId} className={styles.productItem}>
                            <div className={styles.productDetails}>
                                <span className={styles.productId}>ID: {product.productId}</span>
                            </div>
                            <div className={styles.productQuantity}>
                                <button
                                    className={styles.quantityBtn}
                                    onClick={() => handleDecreaseBtn(product)}
                                >
                                    -
                                </button>
                                <input
                                    className={styles.quantityInput}
                                    value={product.quantity}
                                    onChange={(e) =>
                                        handleQuantityInputChange(product.productId, Number(e.target.value))
                                    }
                                />
                                <button
                                    className={styles.quantityBtn}
                                    onClick={() => handleIncreaseBtn(product)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className={styles.deleteBtn}
                                onClick={() => handleDeleteBtn(product)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
};

export default Cart;
