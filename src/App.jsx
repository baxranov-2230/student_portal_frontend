import React, {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation, useNavigate, Navigate, Link,
} from "react-router-dom";
import {Menu as MenuIcon, Bell} from "lucide-react";
import HemisLogo from "./components/HemisLogo";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

import {Toaster} from "react-hot-toast";

import LoginPage from "./pages/LoginPage.jsx";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";


import Profile from "./pages/Profile.jsx";
import {useQuery} from "@tanstack/react-query";
import Applications from "./pages/Applications.jsx";
import RatingBook from "./pages/RatingBook.jsx";


function ProtectedRoute({children}) {
    const token = JSON.parse(localStorage.getItem("token"));

    const location = useLocation();

    if (!token) {
        // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

function App() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation(); // Get current route location
    const isLoginPage = location.pathname === "/login" || location.pathname === "/";

    const {data} = useQuery({
        queryKey: ["user-detail"],
        queryFn: () => detailUser(),
    });


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            {!isLoginPage && (
                <header className="bg-[#2557A7] text-white fixed w-full z-10">
                    <div className="px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <MenuIcon
                                    className="h-6 w-6 cursor-pointer"
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                />
                                <HemisLogo className="h-8"/>
                            </div>
                            <div className="flex items-center space-x-6">
                                {/* <Globe2 className="h-5 w-5 cursor-pointer" /> */}
                                <Bell className="h-5 w-5 cursor-pointer"/>

                                <div>
                                    <Button
                                        id="fade-button"
                                        aria-controls={open ? "fade-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                    >
                                        <div className="flex items-center space-x-3 text-white">
                                            <div
                                                className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                                <span className="text-sm font-medium">JS</span>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="text-sm font-medium">{data?.full_name}</div>
                                                <div className="text-xs text-gray-300">Student</div>
                                            </div>
                                        </div>
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "fade-button",
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/profile">Profile</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                handleLogout();
                                                handleClose();
                                            }}
                                        >
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}
            <div className={`flex ${!isLoginPage ? "pt-16" : ""}`}>
                {/* Show sidebar only when not on login page */}
                {!isLoginPage && <Sidebar isOpen={isSidebarOpen}/>}
                <main
                    className={`flex-1 p-6 transition-all duration-300 ${
                        !isLoginPage && isSidebarOpen
                            ? "ml-64"
                            : !isLoginPage
                                ? "ml-20"
                                : ""
                    }`}
                >
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>

                        <Route
                            path="/admin"

                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }

                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/application"
                            element={
                                <ProtectedRoute>
                                    <Applications/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/rating"
                            element={
                                <ProtectedRoute>
                                    <RatingBook/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<div>404 - Sahifa topilmadi</div>}/>


                    </Routes>
                    <Toaster/>
                </main>
            </div>
        </div>
    );
}

export default App;