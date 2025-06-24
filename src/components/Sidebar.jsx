import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {RiFolderAddLine} from "react-icons/ri";
import {CiViewList} from "react-icons/ci";
import logo from "../assets/images/logo_top.png";
import {
    Home,
    BookOpen,
    Calendar,
    Users,
    FileText,
    Settings,
    GraduationCap,
    ClipboardList,
    Award,
    BookCheck,
    ScrollText,
    Building2,
    CreditCard,
    UserCircle,
    Wallet,
    ChevronRight,
    ChevronDown,

} from "lucide-react";
import {CgProfile} from "react-icons/cg";
import {jwtDecode} from "jwt-decode";

function Sidebar({isOpen}) {
    const location = useLocation();
    const [expandedCategories, setExpandedCategories] = useState(["/"]);
    const token = JSON.parse(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded?.role);
        } else {
            setUserRole(null);
        }
    }, [localStorage.getItem("token")]);


    const toggleCategory = (category) => {
        setExpandedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    let menuCategories;
    if (userRole === "admin") {
        menuCategories = [

            {
                id: "main",
                items: [{icon: Home, label: "Bosh sahifa", path: "/admin"}],
            },
            {
                id: "academic",
                items: [
                    {icon: CiViewList, label: "Barcha talabalar", path: "/list-application"},
                ],
            },

        ];
    } else if (userRole === "student") {
        menuCategories = [

            {
                id: "application",
                items: [{icon: Home, label: "Arizalar", path: "/application"}],
            },
            {
                id: "rating",
                items: [{icon: Home, label: "Reyting daftarcha", path: "/rating"}],
            },
            {
                id: "profile",
                items: [{icon: CgProfile, label: "Profil", path: "/profile"}],
            },


        ];
    }


    return (
        <aside
            className={`fixed left-0 top-0 h-[calc(100vh)] bg-white    shadow-lg transition-all duration-300 ${
                isOpen ? "w-64" : "w-20"
            } z-10 overflow-y-auto`}
        >
            <nav className="p-4">
                <div className="flex items-center justify-center pb-4  px-16 border-b-2">
                    <img src={logo} alt=""/>
                </div>
                {menuCategories?.map((category) => (
                    <div key={category.id} className="my-4">
                        {category.title && isOpen && (
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-500"
                            >
                                {category.title}
                                {expandedCategories.includes(category.id) ? (
                                    <ChevronDown className="h-4 w-4"/>
                                ) : (
                                    <ChevronRight className="h-4 w-4"/>
                                )}
                            </button>
                        )}
                        <ul
                            className={`space-y-1 ${
                                category.title &&
                                !expandedCategories.includes(category.id) &&
                                isOpen
                                    ? "hidden"
                                    : ""
                            }`}
                        >
                            {category.items.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        className={({isActive}) => `
                      flex items-center p-3 rounded-lg  transition-all duration-300
                      ${
                                            isActive
                                                ? "bg-[#E7E7FF] text-[#696CFF] font-semibold"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }
                    `}
                                    >
                                        <item.icon
                                            className={`h-5 w-5 ${
                                                location.pathname === item.path
                                                    ? "text-[#2557A7]"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>
                      {item.label}
                    </span>
                                        {location.pathname === item.path && isOpen && (
                                            <ChevronRight className="ml-auto h-4 w-4 text-[#2557A7]"/>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
