import { useEffect } from "react";
import AppRoutes from "./router";
import { useAuthStore } from "./features/auth/stores/authStore";

function App() {
    const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
    console.log(import.meta.env.VITE_API_BASE_URL);
    useEffect(() => {
        fetchCurrentUser(); // Gọi khi app mount
    }, [fetchCurrentUser]);
    return <AppRoutes />;
}

export default App;
