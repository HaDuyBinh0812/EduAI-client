import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { AiFillHome, AiFillFlag, AiFillBook } from "react-icons/ai";

const Sidebar = () => {
    const links = [
        { to: "/", icon: <AiFillHome size={24} />, label: "Trang chủ" },
        { to: "/roadmap", icon: <AiFillFlag size={24} />, label: "Lộ trình" },
        { to: "/blog", icon: <AiFillBook size={24} />, label: "Bài viết" },
    ];

    return (
        <aside className="sidebar">
            <nav className="sidebar__nav">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `sidebar__link ${isActive ? "active" : ""}`
                        }
                    >
                        <div className="sidebar__item">
                            <div className="sidebar__icon">{link.icon}</div>
                            <p className="sidebar__text">{link.label}</p>
                        </div>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
