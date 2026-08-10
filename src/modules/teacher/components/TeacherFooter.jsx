import { GraduationCap, Heart } from "lucide-react";

export default function TeacherFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t shadow-sm mt-auto">
      <div className="px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-700 p-2 rounded-xl">
            <GraduationCap size={20} />
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              VG Smart Review
            </p>

            <p className="text-sm text-slate-500">
              Panel Docente • © {year}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Desarrollado por Valery Chumpitaz</span>


          <span>para apoyar la evaluación académica.</span>
        </div>

      </div>
    </footer>
  );
}