'use client'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import './page.css'
import Link from 'next/link'


const  Login=()  => {
    const router = useRouter()
    const {user,setUser} = useContext(UserContext)
    async function handleLoginBtn(){
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const response = await fetch('https://form-test-api.vercel.app/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Định dạng dữ liệu gửi lên là JSON
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        if(response.ok){
            const data = await response.json()
            setUser(data.user.userId)
            router.push('/products')
        }
    }
    return(
        <div class="signup-container">
            <h1>Login</h1>
            <div class="input-group">
                <input type="email" name="email" placeholder="email" id="email"/>
            </div>
            <div className='input-group'>
                <input type="password" name="password" placeholder="Mật khẩu" id="password"/>
            </div>
            <button onClick={handleLoginBtn}> login </button>
            <div class="login-link">
                Chưa có tài khoản? <Link href="/signup">Đăng kí</Link>
            </div>
        </div>
    )
}
    
export default Login