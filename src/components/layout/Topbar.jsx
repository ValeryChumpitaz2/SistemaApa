import { Bell, Search } from "lucide-react";

export default function Topbar() {

    return (

        <header className="
        bg-white
        h-20
        shadow-sm
        flex
        items-center
        justify-between
        px-8
        ">

            <div>

                <h2 className="text-2xl font-bold">

                    Dashboard

                </h2>

                <p className="text-gray-500">

                    Bienvenido nuevamente

                </p>

            </div>

            <div className="flex items-center gap-5">

                <button>

                    <Search />

                </button>

                <button>

                    <Bell />

                </button>

                <img
                    src="https://ui-avatars.com/api/?name=Valery"
                    className="w-11 h-11 rounded-full"
                    alt="Avatar"
                />

            </div>

        </header>

    );

}