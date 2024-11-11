'use client'

import { useState, useEffect } from 'react'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'
import ProductItem from './ProductItem'
import Slide from '@/components/Slide/Slide'


let page = 1 

const Products = () => {
    // let page = 1 
    // Không đặt dc bc mỗi lần nó render thì nó sẽ run từ trên xuống dưới (trừ useEffect)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [products, setProducts] = useState([])
    //setName nó là một best practice

    function handlePreviousBtn() {
        if (page > 1) {
            setPage(page => page - 1)
        }
    }

    function handleNextBtn() {
        if (page < totalPages) {
            setPage(page => page + 1)
        }
    }

    async function fetchProducts(page) {
        const response = await fetch(`https://form-test-api.vercel.app/api/products?page=${page}`)
        const data = await response.json()
        setTotalPages(data.totalPages)
        setProducts(data.products)
    }


    useEffect(() => {
        fetchProducts(page)
    }, [page])
    //useEffect được use cho các hiệu ứng phụ 
    //mỗi khi biến trang thái được update 
    //khi thay đổi trang thì nó sẽ lấy product mới
    // Có 3 cách use useEffect
    // 1. Ko có dependencies:Hàm trong useEffect sẽ run mỗi khi component được rerender
    // 2. Dependencies là mảng rỗng: Hàm trong useEffect chỉ run 1 lần duy nhất lúc load đầu tiên
    // 3. Dependencies có phần tử : Hàm trong useEffect chỉ run khi biến trạng thái bị thay đổi


    return (
        <div>
            <Header/>
            <Slide/>
            <h1 className='product' >Products</h1>
            <ul>
                {
                    products.map((product) => {
                        return (
                            <ProductItem key={product.id} product={product} />
                            //Để react bt cần phải render lại phần tử nào trong list khi có sự thay đổi
                        )
                    })
                }
            </ul>
            <p>Page: {page} / { totalPages } </p>
            <button onClick={handlePreviousBtn} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Previous</button>
            <button onClick={handleNextBtn}>Next</button>

            <Footer />
        </div>
    )
}

export default Products