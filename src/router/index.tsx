import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "@/features/page/Login";
import Register from "@/features/page/Register";
import DefaultLayout from "@/layout/DefaultLayout/DefaultLayout";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";

import GuestRoute from "@/router/GuestRoute";
import Roadmap from "@/page/RoadMap";

import LearnPage from "@/page/LearnPage/LearnPage";
import CourseIntroPage from "@/page/CourseIntroPage/CourseIntroPage";
import Home from "@/page/Home/Home";
import SearchResult from "@/page/Search/SearchResult";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Layout chính (sau khi đã đăng nhập) */}
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route
                        path="/courses/:slug"
                        element={<CourseIntroPage />}
                    />
                    <Route
                        path="/courses/:slug/learn"
                        element={<LearnPage />}
                    />
                    <Route path="/search" element={<SearchResult />} />
                </Route>

                {/* Auth layout cho login / register */}
                <Route element={<AuthLayout />}>
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <Login />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <Register />
                            </GuestRoute>
                        }
                    />
                </Route>

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
