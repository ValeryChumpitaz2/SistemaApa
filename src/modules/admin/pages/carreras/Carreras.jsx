import React, { useState } from "react";

import {
  ArrowLeft,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Sparkles,
  Users,
  ChevronRight,
  BookOpen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


// =====================================================
// CARRERAS
// =====================================================

const carreras = [
  {
    id: "ASE",
    codigo: "ASE",
    nombre: "Análisis de Sistemas Empresariales",
    descripcion:
      "Formación orientada al análisis, diseño y desarrollo de soluciones tecnológicas para organizaciones y empresas.",
    color: "indigo",
    icon: BriefcaseBusiness,
    modalidad: "Tecnología y gestión empresarial",
  },
  {
    id: "AS",
    codigo: "AS",
    nombre: "Análisis de Sistemas",
    descripcion:
      "Formación enfocada en el análisis, desarrollo, implementación y mantenimiento de sistemas informáticos.",
    color: "violet",
    icon: Code2,
    modalidad: "Desarrollo de sistemas",
  },
];


// =====================================================
// COMPONENTE
// =====================================================

const Carreras = () => {

  const navigate = useNavigate();

  const [carreraSeleccionada, setCarreraSeleccionada] =
    useState(null);


  return (

    <section
      className="
        min-h-[calc(100vh-5rem)]
        w-full
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="mb-8">

        <button
          type="button"
          onClick={() =>
            navigate("/admin/dashboard")
          }
          className="
            group
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-lg
            text-sm
            font-semibold
            text-slate-500
            transition
            hover:text-slate-900
            dark:text-slate-400
            dark:hover:text-white
          "
        >

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              transition
              group-hover:-translate-x-0.5
              group-hover:border-slate-300
              dark:border-slate-700
              dark:bg-slate-900
            "
          >

            <ArrowLeft size={16} />

          </span>

          Volver al dashboard

        </button>


        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-100
                bg-indigo-50
                px-3
                py-1.5
                text-[11px]
                font-black
                uppercase
                tracking-[0.12em]
                text-indigo-600
                dark:border-indigo-900/50
                dark:bg-indigo-950/30
                dark:text-indigo-400
              "
            >

              <Sparkles size={13} />

              Administración académica

            </div>


            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-4xl
                dark:text-white
              "
            >
              Carreras
            </h1>


            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Consulta las carreras académicas disponibles
              y administra su información.
            </p>

          </div>


          {/* TOTAL */}

          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600
                dark:bg-indigo-950/40
                dark:text-indigo-400
              "
            >

              <GraduationCap size={20} />

            </div>


            <div>

              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Carreras disponibles
              </p>

              <p
                className="
                  text-lg
                  font-black
                  text-slate-800
                  dark:text-white
                "
              >
                {carreras.length}
              </p>

            </div>

          </div>

        </div>

      </header>


      {/* =================================================
          RESUMEN
      ================================================= */}

      <div
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-3
        "
      >

        <ResumenCard
          icon={<GraduationCap size={20} />}
          titulo="Carreras"
          valor="02"
          descripcion="Programas académicos"
          color="indigo"
        />


        <ResumenCard
          icon={<BookOpen size={20} />}
          titulo="Formación"
          valor="Profesional"
          descripcion="Orientada al sector tecnológico"
          color="violet"
        />


        <ResumenCard
          icon={<Users size={20} />}
          titulo="Modalidades"
          valor="2"
          descripcion="Áreas de especialización"
          color="emerald"
        />

      </div>


      {/* =================================================
          CARRERAS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-2
        "
      >

        {carreras.map(
          (carrera) => {

            const Icon =
              carrera.icon;

            const seleccionada =
              carreraSeleccionada ===
              carrera.id;


            return (

              <button
                key={carrera.id}
                type="button"
                onClick={() =>
                  setCarreraSeleccionada(
                    seleccionada
                      ? null
                      : carrera.id
                  )
                }
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-white
                  p-6
                  text-left
                  shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]
                  dark:bg-slate-900
                  ${
                    seleccionada
                      ? "border-indigo-400 ring-4 ring-indigo-500/10 dark:border-indigo-500"
                      : "border-slate-200 dark:border-slate-800"
                  }
                `}
              >

                {/* DECORACIÓN */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-indigo-500/5
                    transition
                    duration-500
                    group-hover:scale-125
                  "
                />


                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-44
                    w-44
                    rounded-full
                    bg-violet-500/5
                  "
                />


                {/* ICONO */}

                <div
                  className="
                    relative
                    mb-6
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className={`
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      shadow-sm
                      transition
                      duration-300
                      group-hover:scale-105
                      ${
                        carrera.color === "indigo"
                          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                          : "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
                      }
                    `}
                  >

                    <Icon size={30} />

                  </div>


                  <span
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-3
                      py-1.5
                      text-xs
                      font-black
                      tracking-wider
                      text-slate-500
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    {carrera.codigo}
                  </span>

                </div>


                {/* CONTENIDO */}

                <div className="relative">

                  <p
                    className="
                      mb-2
                      text-[11px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-indigo-500
                      dark:text-indigo-400
                    "
                  >
                    Programa académico
                  </p>


                  <h2
                    className="
                      max-w-md
                      text-2xl
                      font-black
                      leading-tight
                      tracking-tight
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {carrera.nombre}
                  </h2>


                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {carrera.descripcion}
                  </p>


                  {/* INFORMACIÓN */}

                  <div
                    className="
                      mt-6
                      flex
                      flex-wrap
                      gap-2
                    "
                  >

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-100
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-slate-600
                        dark:bg-slate-800
                        dark:text-slate-300
                      "
                    >

                      <BookOpen size={14} />

                      {carrera.modalidad}

                    </span>

                  </div>


                  {/* FOOTER */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      justify-between
                      border-t
                      border-slate-100
                      pt-5
                      dark:border-slate-800
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-bold
                        text-slate-400
                      "
                    >
                      Código de carrera
                    </span>


                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-black
                        text-indigo-600
                        transition
                        group-hover:gap-3
                        dark:text-indigo-400
                      "
                    >

                      Ver información

                      <ChevronRight size={17} />

                    </span>

                  </div>

                </div>

              </button>

            );

          }
        )}

      </div>


      {/* =================================================
          DETALLE SELECCIONADO
      ================================================= */}

      {carreraSeleccionada && (

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-indigo-100
            bg-indigo-50/70
            p-5
            dark:border-indigo-900/50
            dark:bg-indigo-950/20
          "
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-100
                text-indigo-600
                dark:bg-indigo-900/40
                dark:text-indigo-400
              "
            >

              <Sparkles size={18} />

            </div>


            <div>

              <p
                className="
                  text-sm
                  font-black
                  text-indigo-900
                  dark:text-indigo-200
                "
              >
                Carrera seleccionada
              </p>


              <p
                className="
                  mt-1
                  text-sm
                  text-indigo-700
                  dark:text-indigo-300
                "
              >
                {
                  carreras.find(
                    (carrera) =>
                      carrera.id ===
                      carreraSeleccionada
                  )?.nombre
                }
              </p>

            </div>

          </div>

        </div>

      )}

    </section>

  );

};


// =====================================================
// RESUMEN CARD
// =====================================================

function ResumenCard({
  icon,
  titulo,
  valor,
  descripcion,
  color,
}) {

  const colores = {

    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",

    violet:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",

    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",

  };


  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${colores[color]}
          `}
        >

          {icon}

        </div>


        <div className="min-w-0">

          <p
            className="
              text-[11px]
              font-black
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            {titulo}
          </p>


          <p
            className="
              mt-0.5
              truncate
              text-xl
              font-black
              text-slate-800
              dark:text-white
            "
          >
            {valor}
          </p>


          <p
            className="
              mt-0.5
              text-xs
              text-slate-400
            "
          >
            {descripcion}
          </p>

        </div>

      </div>

    </div>

  );

};


export default Carreras;
