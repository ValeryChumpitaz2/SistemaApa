import {
  Bell,
  UserCircle,
  Sparkles,
  ArrowRight,
  ChevronRight
} from "lucide-react";

import { useAuth } from "../../../auth/AuthContext";


export default function DashboardHeader({
  notificaciones = [],
  onNuevaEvaluacion
}) {

  const { user } = useAuth();


  return (
    <section className="space-y-5">

      {/* =========================================
          CABECERA
      ========================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#1D3681]
            "
          >

            <Sparkles size={17} />

            <span>
              Asistente académico
            </span>

          </div>


          <h1
            className="
              mt-2
              text-3xl
              font-black
              tracking-tight
              text-slate-900
              md:text-4xl
              dark:text-white
            "
          >

            Hola,{" "}

            {user?.usuario || "Estudiante"}

            {" "}👋

          </h1>


          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              md:text-base
              dark:text-slate-400
            "
          >

            Revisa el estado de tus documentos,
            analiza nuevas evaluaciones y mejora
            tu desempeño académico.

          </p>

        </div>


        {/* =====================================
            NOTIFICACIONES
        ====================================== */}

        <button
          type="button"
          className="
            relative
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            self-end
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            shadow-sm
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-[#1D3681]
            md:self-auto
            dark:border-slate-800
            dark:bg-slate-900
            dark:text-slate-300
          "
        >

          <Bell size={19} />


          {notificaciones.length > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                px-1
                text-[10px]
                font-black
                text-white
              "
            >

              {notificaciones.length}

            </span>
          )}

        </button>

      </div>


      {/* =========================================
          TARJETA PRINCIPAL
      ========================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-[#1D3681]
          px-6
          py-7
          shadow-lg
          shadow-blue-900/10
          md:px-8
          md:py-8
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            absolute
            -right-10
            -top-14
            h-44
            w-44
            rounded-full
            border
            border-white/10
          "
        />

        <div
          className="
            absolute
            bottom-[-70px]
            right-8
            h-36
            w-36
            rounded-full
            border
            border-white/10
          "
        />


        <div
          className="
            relative
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          {/* =====================================
              INFORMACIÓN
          ====================================== */}

          <div className="max-w-2xl">

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-blue-200
              "
            >

              VG Smart Review

            </p>


            <h2
              className="
                mt-2
                text-2xl
                font-black
                text-white
                md:text-3xl
              "
            >

              Mejora tus documentos académicos

            </h2>


            <p
              className="
                mt-3
                text-sm
                leading-6
                text-blue-100
              "
            >

              Analiza tu trabajo, identifica oportunidades
              de mejora y verifica el cumplimiento de las
              normas APA.

            </p>


            <button
              type="button"
              onClick={onNuevaEvaluacion}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-5
                py-3
                text-sm
                font-bold
                text-[#1D3681]
                shadow-sm
                transition
                hover:bg-blue-50
                hover:shadow-md
              "
            >

              Nueva evaluación

              <ArrowRight size={17} />

            </button>

          </div>


          {/* =====================================
              PERFIL
          ====================================== */}

          <div
            className="
              w-full
              rounded-2xl
              border
              border-white/15
              bg-white/10
              p-4
              backdrop-blur-sm
              md:w-[250px]
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  bg-white/15
                "
              >

                {user?.foto ? (

                  <img
                    src={user.foto}
                    alt="Perfil"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                ) : (

                  <UserCircle
                    size={28}
                    className="text-white"
                  />

                )}

              </div>


              <div className="min-w-0">

                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-blue-200
                  "
                >

                  Perfil activo

                </p>


                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    font-bold
                    text-white
                  "
                >

                  {user?.usuario || "Estudiante"}

                </p>


                <p
                  className="
                    mt-0.5
                    text-xs
                    text-blue-100
                  "
                >

                  Estudiante

                </p>

              </div>

            </div>


            {/* VER PERFIL */}

            <div
              className="
                mt-4
                border-t
                border-white/10
                pt-3
              "
            >

              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  text-xs
                  font-semibold
                  text-blue-100
                  transition
                  hover:text-white
                "
              >

                <span>
                  Ver perfil
                </span>

                <ChevronRight size={15} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}