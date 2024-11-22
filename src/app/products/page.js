'use client'

import { useState, useEffect,useContext } from 'react'


import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProductItem from './ProductItem'
import Slide from '@/components/Slide/Slide'
import './style.css'
import SearchContext from '../context/SearchContext'
import UserContext from '../context/UserContext'




const Products = () => {
    const {search,setSearch} = useContext(SearchContext)

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

    async function fetchProducts(page,search) {
        const response = await fetch(`https://form-test-api.vercel.app/api/products?page=${page}`)
        //const response = await fetch(`https://form-test-api.vercel.app/api/products?page=${page}&search=${search}`)
        const data = await response.json()
        setTotalPages(data.totalPages)
        setProducts(data.products)
    }
    



    useEffect(() => {
        fetchProducts(page,search)
    }, [page,search])
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
            <h3>
                Kết quả cho từ khoá: {search} 
            </h3>
            <div className=''>
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
            </div>
            
            <p className='page' >Page: {page} / { totalPages } </p>
            <div className='btnContainer'>
                <button className='btn' onClick={handlePreviousBtn}>Previous</button>
                <button className='btn' onClick={handleNextBtn}>Next</button>
            </div>
            

            <Footer/>
        </div>
    )
}

export default Products