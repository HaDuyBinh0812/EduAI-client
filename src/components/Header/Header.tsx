// components/Header/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./Header.module.scss";
import { useAuthStore } from "@/features/auth/stores/authStore";
import SearchBar from "./searchBar/SearchBar";
import { FiBell } from "react-icons/fi";

const Header = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <header className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.logoLink} onClick={() => navigate("/")}>
                    <img src="/logo.png" alt="Logo" className={styles.logo} />
                    <h1 className={styles.title}>Học Lập Trình Để Đi Làm</h1>
                </div>

                <SearchBar />

                <div className={styles.action}>
                    {!isAuthenticated ? (
                        <>
                            <Link
                                to="/register"
                                className={clsx(styles.btn, styles.textBtn)}
                            >
                                Đăng ký
                            </Link>
                            <Link
                                to="/login"
                                className={clsx(styles.btn, styles.primaryBtn)}
                            >
                                Đăng nhập
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/my-courses" className={styles.link}>
                                Khóa học của tôi
                            </Link>
                            <button className={styles.actionBtn}>
                                <FiBell size={20} />
                            </button>
                            <div className={styles.userAvatar}>
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <button
                                className={styles.logout}
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
