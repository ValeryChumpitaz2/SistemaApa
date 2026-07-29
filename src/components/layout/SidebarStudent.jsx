import {
    LayoutDashboard,
    FileText,
    History,
    User,
    Settings,
    LogOut
} from "lucide-react";

import { Link } from "react-router-dom";

export default function SidebarStudent() {

    return (

        <aside className="
        w-72
        bg-blue-950
        text-white
        flex
        flex-col
        ">

            <div className="p-8">

                <h1 className="text-2xl font-bold">

                    VG Smart Review

                </h1>

                <p className="text-blue-200 mt-2">

                    Panel del estudiante

                </p>

            </div>

            <nav className="flex-1 px-4">

                <Link
                    to="/student"
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-900"
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>

                <Link
                    to="/student/history"
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-900"
                >
                    <History size={20} />
                    Historial
                </Link>

                <Link
                    to="/student/profile"
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-900"
                >
                    <User size={20} />
                    Mi Perfil
                </Link>

                <Link
                    to="/student/settings"
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-900"
                >
                    <Settings size={20} />
                    Configuración
                </Link>

            </nav>

            <div className="p-4">

                <button
                    className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-red-600
                    py-3
                    rounded-xl
                    "
                >

                    <LogOut size={18} />

                    Cerrar sesión

                </button>

            </div>

        </aside>

    );

}