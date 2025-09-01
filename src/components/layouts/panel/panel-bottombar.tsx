import React from "react";
import { useNavigate } from "react-router-dom";
type BottomNavItem = {
    icon?: React.ElementType;
    image?: string;
    isActive?: boolean;
    url?: string;
};

const BottomBar = ({ items }: { items: BottomNavItem[] }) => {
    const navigate = useNavigate();
    return (
        <nav className="bg-white border-t border-gray-200 shadow-sm h-16 flex justify-around items-center z-50">
            {items.map((item, index) => (
                <button
                    key={index}
                    className={`p-2 rounded ${item.isActive ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                    onClick={() => {
                        if (item.url) {
                            navigate(item.url);
                        }
                    }}
                >
                    {item.icon ? <item.icon className="w-6 h-6" /> : <img src={item.image} alt="Profile" className="w-8 h-8 rounded-full" />}
                </button>
            ))}
        </nav>
    );
};

export default BottomBar;
