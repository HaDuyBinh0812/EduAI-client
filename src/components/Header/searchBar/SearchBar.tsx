import styles from "./SearchBar.module.scss";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
        }
    };

    return (
        <form className={styles.wrapper} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Tìm kiếm khóa học, bài viết, video..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.input}
            />
            <button
                type="submit"
                className={clsx(styles.btn, styles.searchBtn)}
            >
                <FiSearch size={18} />
            </button>
        </form>
    );
};

export default SearchBar;
