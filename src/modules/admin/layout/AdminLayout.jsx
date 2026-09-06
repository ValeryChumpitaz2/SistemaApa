import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import AdminSidebar
  from "../components/AdminSidebar";

import AdminTopbar
  from "../components/AdminTopbar";


// =====================================================
// LAYOUT ADMIN
// =====================================================

export default function AdminLayout() {

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);


  return (

    <div
      className="
        min-h-screen
        bg-[#f7f8fc]
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <AdminSidebar
        mobileOpen={
          sidebarOpen
        }
        onMobileClose={() =>
          setSidebarOpen(false)
        }
      />


      {/* =================================================
          ZONA PRINCIPAL
      ================================================= */}

      <div
        className="
          min-h-screen
          xl:ml-64
        "
      >



        {/* =================================================
            CONTENIDO
        ================================================= */}

        <main
          className="
            w-full
          "
        >
<div
  className="
    w-full
    max-w-[1600px]
    mx-auto
    px-4
    py-6
    sm:px-6
    lg:px-12
    lg:py-8
  "
>
  <Outlet />
</div>



        </main>

      </div>

    </div>

  );

}
