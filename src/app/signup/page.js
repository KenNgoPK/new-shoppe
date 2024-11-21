'use client'

import { useRouter } from 'next/navigation'
import './page.css'
import Link from 'next/link'

const  Signup=()  => {
    const router = useRouter()
    async function handleSignUpBtn(){
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const fullName = document.getElementById('fullName').value
        const phone = document.getElementById('phone').value
        const address = document.getElementById('address').value

        const response = await fetch('https://form-test-api.vercel.app/api/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Định dạng dữ liệu gửi lên là JSON
            },
            body: JSON.stringify({
                email: email,
                password: password,
                fullName: fullName,
                phone: phone,
                address: address
            })
        })
        if(response.status === 201){
            router.push('/login')
        }


    }

    return(
        <div class="signup-container">
            <h1>
                Sign up
            </h1>
            <div class="input-group">
                <input type="text" name="fullname" placeholder="Họ tên đầy đủ" id="fullName"/>
            </div>
            <div class="input-group">
                <input type="email" name="email" placeholder="Địa chỉ email" id="email"/>
            </div>
            <div class="input-group">
                <input type="number" name="phonenumber" placeholder="Số điện thoại" id="phone"/>
            </div>
            <div class="input-group">
                <input type="text" name="address" placeholder="Nhập địa chỉ" id="address"/>
            </div>
            <div class="input-group">
                <input type="password" name="confirm_password" placeholder="Nhập mật khẩu" id="password"/>
            </div>                                             
            <button onClick={handleSignUpBtn}> sign up </button>
            <div class="login-link">
                Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
            </div>
        </div>
    )
}
    
export default Signup