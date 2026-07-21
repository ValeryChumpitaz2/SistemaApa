import SidebarStudent from "./SidebarStudent";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100">

      <SidebarStudent />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 overflow-auto p-8">

          {children}

        </main>

      </div>

    </div>
  );
}