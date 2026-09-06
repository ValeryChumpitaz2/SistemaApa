import { useState } from "react";

import {
  ShieldCheck,
  GraduationCap,
  UserRound,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import TeacherLogin from "../components/auth/TeacherLogin";
import GoogleLogin from "../components/auth/GoogleLogin";
import AdminLogin from "../components/auth/AdminLogin";

export default function Login() {
  const [tipo, setTipo] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* ==================================================
          FONDO DECORATIVO
      ================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        {/* Círculo superior derecho */}
        <div
          className="
            absolute
            -top-40
            -right-40
            w-[28rem]
            h-[28rem]
            rounded-full
            bg-blue-200/40
            blur-3xl
          "
        />

        {/* Círculo inferior izquierdo */}
        <div
          className="
            absolute
            -bottom-40
            -left-40
            w-[28rem]
            h-[28rem]
            rounded-full
            bg-indigo-200/30
            blur-3xl
          "
        />

        {/* Círculo pequeño */}
        <div
          className="
            absolute
            top-1/2
            right-[15%]
            w-40
            h-40
            rounded-full
            bg-blue-100/30
            blur-3xl
          "
        />
      </div>

      {/* ==================================================
          CONTENEDOR PRINCIPAL
      ================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          min-h-[650px]
          bg-white
          rounded-[2rem]
          shadow-2xl
          shadow-slate-300/40
          overflow-hidden
          grid
          lg:grid-cols-[0.95fr_1.05fr]
          border
          border-white
        "
      >

        {/* ==================================================
            PANEL IZQUIERDO
        ================================================== */}

        <div
          className="
            hidden
            lg:flex
            flex-col
            justify-between
            bg-gradient-to-br
            from-blue-800
            via-blue-900
            to-slate-950
            p-12
            text-white
            relative
            overflow-hidden
          "
        >

          {/* DECORACIÓN */}

          <div
            className="
              absolute
              -right-32
              -top-32
              w-96
              h-96
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              -right-10
              -top-10
              w-52
              h-52
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-32
              w-80
              h-80
              rounded-full
              bg-blue-500/10
              blur-2xl
            "
          />

          {/* ==================================================
              MARCA
          ================================================== */}

          <div className="relative flex items-center gap-3">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/10
                border
                border-white/10
                backdrop-blur-sm
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <ShieldCheck size={26} />
            </div>

            <div>
              <p className="font-black text-xl tracking-tight">
                VG Smart Review
              </p>

              <p className="text-xs text-blue-200 mt-0.5">
                Plataforma inteligente de evaluación
              </p>
            </div>

          </div>

          {/* ==================================================
              CONTENIDO CENTRAL
          ================================================== */}

          <div className="relative max-w-md">

            <div
              className="
                w-14
                h-1
                bg-blue-400
                rounded-full
                mb-7
              "
            />

            <h2
              className="
                text-4xl
                xl:text-5xl
                font-black
                leading-[1.08]
                tracking-tight
              "
            >
              Evaluación académica

              <span className="block text-blue-300 mt-1">
                inteligente.
              </span>
            </h2>

            <p
              className="
                text-blue-100
                mt-6
                leading-relaxed
                text-sm
                max-w-sm
              "
            >
              Analiza tus documentos, revisa los criterios de evaluación
              y mejora tus entregables académicos de manera rápida,
              organizada y eficiente.
            </p>

            {/* CARACTERÍSTICAS */}

            <div className="mt-8 space-y-3">

              <div className="flex items-center gap-3 text-sm text-blue-100">
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-white/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckCircle2 size={16} />
                </div>

                <span>Revisión automatizada</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-100">
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-white/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckCircle2 size={16} />
                </div>

                <span>Criterios de evaluación organizados</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-100">
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-white/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckCircle2 size={16} />
                </div>

                <span>Historial de consolidaciones</span>
              </div>

            </div>

            {/* BADGE */}

            <div
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-white/10
                border
                border-white/10
                text-xs
                text-blue-100
                backdrop-blur-sm
              "
            >
              <Sparkles size={14} className="text-blue-300" />

              Sistema académico inteligente
            </div>

          </div>

          {/* ==================================================
              PIE
          ================================================== */}

          <div className="relative">

            <div className="h-px bg-white/10 mb-4" />

            <p className="text-xs text-blue-300">
              © 2026 Valle Grande
            </p>

          </div>

        </div>

        {/* ==================================================
            PANEL DERECHO
        ================================================== */}

        <div
          className="
            flex
            flex-col
            justify-center
            px-6
            py-10
            sm:px-10
            lg:px-14
            bg-white
          "
        >

          {/* ==================================================
              MARCA MOBILE
          ================================================== */}

          <div
            className="
              lg:hidden
              flex
              flex-col
              items-center
              justify-center
              mb-10
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-blue-700
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-blue-700/20
                "
              >
                <ShieldCheck size={23} />
              </div>

              <div>

                <p className="font-black text-lg text-slate-900">
                  VG Smart Review
                </p>

                <p className="text-xs text-slate-400">
                  Evaluación académica inteligente
                </p>

              </div>

            </div>

          </div>

          {/* ==================================================
              SELECCIÓN DE TIPO
          ================================================== */}

          {!tipo && (

            <div className="w-full max-w-lg mx-auto">

              {/* ENCABEZADO */}

              <div className="mb-8">

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    bg-blue-50
                    text-blue-700
                    text-xs
                    font-bold
                    mb-4
                  "
                >
                  <Sparkles size={13} />

                  Acceso seguro
                </div>

                <h1
                  className="
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-slate-900
                    tracking-tight
                  "
                >
                  Selecciona tu tipo
                  <span className="block">
                    de cuenta
                  </span>
                </h1>

                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-3
                    max-w-md
                    leading-relaxed
                  "
                >
                  Elige una opción para continuar con el inicio
                  de sesión en VG Smart Review.
                </p>

              </div>

              {/* ==================================================
                  OPCIONES
              ================================================== */}

              <div className="space-y-4">

                {/* ==================================================
                    DOCENTE
                ================================================== */}

                <button
                  type="button"
                  onClick={() => setTipo("DOCENTE")}
                  className="
                    w-full
                    group
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-left
                    transition-all
                    duration-300
                    hover:border-blue-400
                    hover:bg-blue-50/40
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-blue-100
                      text-blue-700
                      flex
                      items-center
                      justify-center
                      shrink-0
                      group-hover:bg-blue-600
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <UserRound size={26} />
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2">

                      <p className="font-bold text-slate-900">
                        Soy docente
                      </p>

                      <span
                        className="
                          hidden
                          sm:inline-flex
                          px-2
                          py-0.5
                          rounded-full
                          bg-blue-100
                          text-blue-700
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                        "
                      >
                        Evaluación
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      Evalúa y gestiona trabajos académicos
                    </p>

                  </div>

                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      group-hover:text-blue-600
                      group-hover:bg-blue-100
                      transition-all
                      duration-300
                      shrink-0
                    "
                  >
                    <ArrowRight
                      size={19}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>

                </button>

                {/* ==================================================
                    ESTUDIANTE
                ================================================== */}

                <button
                  type="button"
                  onClick={() => setTipo("ESTUDIANTE")}
                  className="
                    w-full
                    group
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-left
                    transition-all
                    duration-300
                    hover:border-emerald-400
                    hover:bg-emerald-50/40
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500/30
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-emerald-100
                      text-emerald-700
                      flex
                      items-center
                      justify-center
                      shrink-0
                      group-hover:bg-emerald-600
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <GraduationCap size={27} />
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2">

                      <p className="font-bold text-slate-900">
                        Soy estudiante
                      </p>

                      <span
                        className="
                          hidden
                          sm:inline-flex
                          px-2
                          py-0.5
                          rounded-full
                          bg-emerald-100
                          text-emerald-700
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                        "
                      >
                        Académico
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      Presenta tus documentos para evaluación
                    </p>

                  </div>

                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      group-hover:text-emerald-600
                      group-hover:bg-emerald-100
                      transition-all
                      duration-300
                      shrink-0
                    "
                  >
                    <ArrowRight
                      size={19}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>

                </button>

                {/* ==================================================
                    ADMINISTRADOR
                ================================================== */}

                <button
                  type="button"
                  onClick={() => setTipo("ADMIN")}
                  className="
                    w-full
                    group
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-left
                    transition-all
                    duration-300
                    hover:border-violet-400
                    hover:bg-violet-50/40
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-500/30
                  "
                >

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-violet-100
                      text-violet-700
                      flex
                      items-center
                      justify-center
                      shrink-0
                      group-hover:bg-violet-600
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <ShieldCheck size={27} />
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2">

                      <p className="font-bold text-slate-900">
                        Soy administrador
                      </p>

                      <span
                        className="
                          hidden
                          sm:inline-flex
                          px-2
                          py-0.5
                          rounded-full
                          bg-violet-100
                          text-violet-700
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                        "
                      >
                        Gestión
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      Administra docentes y accesos
                    </p>

                  </div>

                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      group-hover:text-violet-600
                      group-hover:bg-violet-100
                      transition-all
                      duration-300
                      shrink-0
                    "
                  >
                    <ArrowRight
                      size={19}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>

                </button>

              </div>

              {/* ==================================================
                  INFORMACIÓN
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  mt-8
                  text-xs
                  text-slate-400
                "
              >
                <ShieldCheck size={14} />

                <span>
                  Acceso seguro para la comunidad académica
                </span>
              </div>

            </div>
          )}

          {/* ==================================================
              TIPO SELECCIONADO
          ================================================== */}

          {tipo && (

            <div className="w-full max-w-md mx-auto">

              {/* VOLVER */}

              <button
                type="button"
                onClick={() => setTipo(null)}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-500
                  hover:text-blue-600
                  transition
                  mb-7
                  focus:outline-none
                "
              >

                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-slate-100
                    group-hover:bg-blue-50
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  <ArrowLeft size={16} />
                </div>

                Cambiar tipo de acceso

              </button>

              {/* ==================================================
                  DOCENTE
              ================================================== */}

              {tipo === "DOCENTE" && (
                <TeacherLogin />
              )}

              {/* ==================================================
                  ESTUDIANTE
              ================================================== */}

              {tipo === "ESTUDIANTE" && (
                <GoogleLogin />
              )}

              {/* ==================================================
                  ADMINISTRADOR
              ================================================== */}

              {tipo === "ADMIN" && (
                <AdminLogin />
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}