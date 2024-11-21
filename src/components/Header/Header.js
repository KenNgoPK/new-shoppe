import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faStar, faHeart, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import UserContext from '@/app/context/UserContext';
import './header.css';
import SearchContext from '@/app/context/SearchContext'



const Header = () => {
  const {user,setUser} = useContext(UserContext)

  useEffect(() => {
    if(user){
      document.getElementById('login').style.display = 'none'
      document.getElementById('signup').style.display = 'none'
      document.getElementById('profile').style.display = 'block'
      document.getElementById('logout').style.display = 'block'
    }
    }, [user])



  const {search,setSearch} = useContext(SearchContext)
  function handleSearchBtn(){
    setSearch(document.getElementById('searchInput').value)
}


  return (
    <header className="header">
      <div className="header-container">
        <nav className="header-left">
          <Link className="header-left-item" href="#">Kênh người bán</Link>
          <Link className="header-left-item" href="#">Trở thành người bán</Link>
          <Link className="header-left-item" href="#">Tải ứng dụng</Link>
          <Link className="header-left-item" href="#">
            Kết nối <FontAwesomeIcon icon={faEnvelope} /> <FontAwesomeIcon icon={faPhone} />
          </Link>
        </nav>
        <div className="header-right">
          <a className="header-right-item" href="#">
            <FontAwesomeIcon icon={faStar} /> Thông báo
          </a>
          <a className="header-right-item" href="#">
            <FontAwesomeIcon icon={faHeart} /> Hỗ trợ
          </a>
          <a className="header-right-item" href="#">
            <FontAwesomeIcon icon={faCloud} /> Ngôn ngữ
          </a>
          <Link id='signup' href="/signup" className="header-right-item">
            <FontAwesomeIcon icon={faStar} /> Đăng kí
          </Link>
          <Link id='login' href="/login" className="header-right-item">
            <FontAwesomeIcon icon={faStar} /> Đăng nhập
          </Link>
          <Link id='profile' href="/profile" className="header-right-item profile" >
            <FontAwesomeIcon icon={faStar} /> Profile
          </Link>
          <Link id='logout' href="/logout" className="header-right-item profile" >
            <FontAwesomeIcon icon={faStar} /> logout
          </Link>
        </div>
      </div>
      <div className="icon-content">
        <img className="shoppe-icon" src="/image/shoppe.png" alt="shopee" />  
        <form className="input-container">
          <div className="search">
            <input id='searchInput' type="text" className="search-input" placeholder="Shopee bao ship 0Đ - Đăng ký ngay!" />
            <button type='button' className="search-button" onClick={handleSearchBtn}>🔍</button>
          </div>
        </form>
        {/*
        
        button nằm trong form có có type mặc định là submit(có hành vi mặc định là load lại trang)
        
        */}
      </div>
    </header>
  );
};

export default Header;
