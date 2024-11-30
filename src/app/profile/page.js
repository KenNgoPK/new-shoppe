'use client';

import styles from './page.module.css';

const Profile = () => {
    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileTitle}>Hồ sơ của tôi</h1>
            <h3 className={styles.profileSubtitle}>Quản lý thông tin hồ sơ để bảo mật</h3>

            {/* Profile Information */}
            <div className={styles.profileInfo}>
                <p>
                    Tên đăng nhập: <span>Ngô Phúc Khánh</span>
                </p>
                <p>
                    Tên: <span>Ken Ngô</span>
                </p>
                <p>Email: ngophuckhanh@gmail.com</p>
                <p>Số điện thoại: 0901464442</p>
            </div>

            {/* Gender Selection Form */}
            <form>
                <p className={styles.genderLabel}>Giới tính</p>
                <input type="radio" id="female" name="gender" value="Nữ" />
                <label htmlFor="female">Nữ</label><br />
                <input type="radio" id="male" name="gender" value="Nam" />
                <label htmlFor="male">Nam</label><br />
                <input type="radio" id="otherGender" name="gender" value="Giới tính khác" />
                <label htmlFor="otherGender">Giới tính khác</label><br />
            </form>

            {/* Profile Image */}
            <img src="/image/imgprofile.jpg" alt="Profile" className={styles.profileImage} />
        </div>
    );
};

export default Profile;
