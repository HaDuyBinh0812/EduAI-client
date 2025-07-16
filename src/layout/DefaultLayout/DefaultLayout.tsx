import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";

import styles from "./DefaultLayout.module.scss";
import Sidebar from "@/components/SideBar";

const DefaultLayout = () => {
    console.log(import.meta.env.VITE_API_BASE_URL);
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
