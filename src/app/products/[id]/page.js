'use client'
import { useState,useEffect } from "react"
import { useParams } from "next/navigation"

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
                        <h1>Product Id: {product.id}</h1>
                        <p>Product Name: {product.name}</p>
                        <img src={product.imgurl}/>
                        <p>Product Price: {product.price}</p>
                        <button>+</button>
                    </div>
                )
            }
        </>
    )

}


export default Product