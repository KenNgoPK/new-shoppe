import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faStar, faHeart, faCloud } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = () => {
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
          <Link href="/author/signup" className="header-right-item">
            <FontAwesomeIcon icon={faStar} /> Đăng kí
          </Link>
          <Link href="/author/login" className="header-right-item">
            <FontAwesomeIcon icon={faStar} /> Đăng nhập
          </Link>
        </div>
      </div>
      <div className="icon-content">
        <img className="shoppe-icon" src="/image/shoppe.png" alt="shopee" />  
        <form className="input-container">
          <div className="search">
            <input type="text" className="search-input" placeholder="Shopee bao ship 0Đ - Đăng ký ngay!" />
            <button className="search-button">🔍</button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
