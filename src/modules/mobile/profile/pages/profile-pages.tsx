import TitleHeader from "@/components/commons/title-header";
import { Edit3, User, Phone, Briefcase, FileText, Users } from "lucide-react";
import { ReactNode } from "react";
import { MdOutlineDataUsage } from "react-icons/md";
interface MenuItemProps {
    icon: ReactNode;  // Untuk menerima elemen JSX, seperti <User size={18} />
    title: string;    // Hanya teks
}
export default function ProfilePage() {
    return (
        <div className="min-h-screen space-y-3">
            <TitleHeader
                icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
                title="Your Profile"
                desc=""
            />
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Bellaou Ohm</h2>
                        <p className="text-gray-500 text-sm">
                            bella.ohm@xyzcompany.com
                        </p>
                    </div>
                </div>
                <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Edit3 size={18} />
                </button>
            </div>

            {/* Sections */}
            <div className="mt-6 space-y-6">
                {/* INFORMATION */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="text-gray-400 text-xs font-semibold mb-4">INFORMATION</h3>
                    <ul className="space-y-4">
                        <MenuItem icon={<User size={18} />} title="Personal information" />
                        <MenuItem icon={<Phone size={18} />} title="Emergency Contacts" />
                        <MenuItem icon={<Briefcase size={18} />} title="Education history" />
                        <MenuItem icon={<FileText size={18} />} title="My documents" />
                    </ul>
                </div>

                {/* REPORT */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="text-gray-400 text-xs font-semibold mb-4">REPORT</h3>
                    <ul>
                        <MenuItem icon={<Users size={18} />} title="Reporting line" />
                    </ul>
                </div>
            </div>
        </div>
    );
}

function MenuItem({ icon, title }: MenuItemProps) {
    return (
        <li className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center gap-3">
                <span className="text-gray-500">{icon}</span>
                <span className="text-gray-700 text-sm">{title}</span>
            </div>
            <span className="text-gray-400">{">"}</span>
        </li>
    );
}
