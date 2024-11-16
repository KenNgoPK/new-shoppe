'use client'

import { useState, useEffect } from "react"

const Cart = () => {
    const [products, setProducts] = useState([])

    async function fetchProducts() {
        try {
            const response = await fetch(`https://form-test-api.vercel.app/api/cart?userId=khanh01`)
            const data = await response.json()
            setProducts(data.items)
        } catch (error) {
            console.error("Error fetching products:", error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    async function handleQuantityInputChange(productId, quantity) {
        if (quantity < 0) return 
        try {
            const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: 'khanh01',
                    productId,
                    quantity
                })
            })
            const data = await response.json()
            setProducts(data.items)
        } catch (error) {
            console.error("Error updating quantity:", error)
        }
    }

    async function handleDecreaseBtn(product) {
        if (product.quantity <= 1) {
            await handleDeleteBtn(product)
        } else {
            try {
                const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: 'khanh01',
                        productId: product.productId,
                        quantity: product.quantity - 1
                    })
                })
                const data = await response.json()
                setProducts(data.items)
            } catch (error) {
                console.error("Error decreasing quantity:", error)
            }
        }
    }

    async function handleIncreaseBtn(product) {
        try {
            const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: 'khanh01',
                    productId: product.productId,
                    quantity: product.quantity + 1
                })
            })
            const data = await response.json()
            setProducts(data.items)
        } catch (error) {
            console.error("Error increasing quantity:", error)
        }
    }

    async function handleDeleteBtn(product) {
        try {
            const response = await fetch('https://form-test-api.vercel.app/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: 'khanh01',
                    productId: product.productId
                })
            })
            const data = await response.json()
            setProducts(data.items)
        } catch (error) {
            console.error("Error deleting product:", error)
        }
    }

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.productId}>
                        <p>Product ID: {product.productId}</p>
                        <button
                            onClick={() => handleDecreaseBtn(product)}
                        >
                            -
                        </button>
                        <input
                            value={product.quantity}
                            onChange={(e) =>
                                handleQuantityInputChange(product.productId, Number(e.target.value))
                            }
                        />
                        <button
                            onClick={() => handleIncreaseBtn(product)}
                        >
                            +
                        </button>
                        <button onClick={() => handleDeleteBtn(product)}>Xoá</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Cart
