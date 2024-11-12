'use client'
import { useState,useEffect } from "react"
import { useParams } from "next/navigation"
import Header from '@/components/Header/Header'
import './page.css'

const Product = () =>{
    const params = useParams()
    // use... dc gọi là hook(móc): nv là móc data
    const [product,setProduct] = useState()
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

    return(
        <>
            {
                product && (
                    <div>
                        <Header/>
                        <div className="container">
                            <div className="fontProducts">
                                <p className="productName">Tên sẵn phẫm: {product.name}</p>
                                <p className="productPrice">Giá sẵn phẫm: {product.price}</p>
                                <p className="productId">Product Id: {product.id}</p>
                            </div>
                            <img className="img" src={product.imgurl}/>
                            <div className="btn">
                                <div className="amount">
                                    <p>Số lượng</p>
                                    <button className="increaseBtn">-</button>
                                    <input type="text" className="input"/>
                                    <button className="decreaseBtn">+</button>
                                </div>
                                <button className="addToCart">Thêm vào giỏ hàng</button>
                                <button className="buyNow">Mua ngay</button> 
                            </div>
                        
                        </div>
                        
                    </div>
                )
            }
        </>
    )

}


export default Product