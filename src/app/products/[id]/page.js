'use client'
import { useState,useEffect } from "react"
import { useParams } from "next/navigation"
import Header from '@/components/Header/Header'
import styles from './page.module.css'

const Product = () =>{
    const params = useParams()
    // use... dc gọi là hook(móc): nv là móc data
    const [product,setProduct] = useState()
    const [quantity,setQuantity] = useState(1)
    //Lúc này nó sẽ là false => ko hiển thị

    async function fetchProduct() {
        const response = await fetch(`https://form-test-api.vercel.app/api/product?id=${params.id}`)
        const product = await response.json()
        setProduct(product)
    }
    //Sau khi fetch xong thì nó sẽ là 1 cái object => true => show div

    useEffect(() => {
        fetchProduct()
    },[])

    function handleQuantityInputChange(value){
        setQuantity(value)
    }
    
    function handleDecreaseBtn(value){
        setQuantity(prev => prev -1)
    }

    function handleIncreaseBtn(value){
        setQuantity(prev => prev +1)
    }


    async function handleAddToCart() {
        const response = await fetch('https://form-test-api.vercel.app/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Định dạng dữ liệu gửi lên là JSON
            },
            body: JSON.stringify({
                userId: 'khanh01',
                productId: product.id,
                quantity: quantity
            })
        })

        if (response.status === 200) {
            alert('Thêm vào giỏ hàng thành công')
        } else {
            alert('Thêm vào giỏ hàng thất bại')
        }
    }
    //suggest use this 
    return(
        <>
            {
                product && (
                    <div>
                        <Header/>
                        <div className={styles.container}>
                            <div className={styles.fontProducts}>
                                <p className={styles.productName}>Tên sẵn phẫm: {product.name}</p>
                                <p className={styles.productPrice}>Giá sẵn phẫm: {product.price}</p>
                                <p className={styles.productId}>Product Id: {product.id}</p>
                            </div>
                            <img className={styles.img} src={product.imgurl}/>
                            <div className={styles.cartForm}>
                                <div className={styles.amount}>
                                    <p>Số lượng</p>
                                    <button onClick={handleDecreaseBtn} className={styles.decreaseBtn}>-</button>
                                    <input value={quantity} type="text" className={styles.input} onChange={(e) => handleQuantityInputChange(Number(e.target.value))}/>
                                    <button onClick={handleIncreaseBtn} className={styles.increaseBtn}>+</button>
                                    {/*
                                    css ko nên css cái thẻ
                                    */}
                                    {/* 
                                     Các hàm sự kiện (onchange,onclick...)  luôn nhận 1 tham số là event 
                                     event.target:dùng để lấy phần tử gây ra  
                                    
                                    */}
                                </div>
                                <button onClick={handleAddToCart} className={styles.addToCart}>Thêm vào giỏ hàng</button>
                                <button className={styles.buyNow}>Mua ngay</button> 
                            </div>
                        
                        </div>
                        
                    </div>
                )
            }
        </>
    )

}


export default Product