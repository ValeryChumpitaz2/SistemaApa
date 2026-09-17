import { useState } from "react";

import {
  ShieldCheck,
  GraduationCap,
  UserRound,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ClipboardCheck,
  Settings2,
} from "lucide-react";

import TeacherLogin from "../components/auth/TeacherLogin";
import GoogleLogin from "../components/auth/GoogleLogin";
import AdminLogin from "../components/auth/AdminLogin";


export default function Login({ tipoInicial = null }) {

  const [tipo, setTipo] = useState(tipoInicial);


  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        flex
        items-center
        justify-center
        px-4
        py-8
        relative
        overflow-hidden
      "
    >

      {/* ==================================================
          FONDO
      ================================================== */}

      <div
        className="
          fixed
          inset-0
          pointer-events-none
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            -top-40
            -right-40
            w-[30rem]
            h-[30rem]
            rounded-full
            bg-blue-200/40
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -left-40
            w-[30rem]
            h-[30rem]
            rounded-full
            bg-indigo-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[28rem]
            h-[28rem]
            rounded-full
            bg-cyan-100/30
            blur-3xl
          "
        />

      </div>


      {/* ==================================================
          CONTENEDOR
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

          <div
            className="
              absolute
              top-1/3
              -left-20
              w-48
              h-48
              rounded-full
              bg-cyan-400/10
              blur-3xl
            "
          />


          {/* MARCA */}

          <div
            className="
              relative
              flex
              items-center
              gap-3
            "
          >

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

              <p
                className="
                  font-black
                  text-xl
                  tracking-tight
                "
              >
                APP Reviewer
              </p>

              <p
                className="
                  text-xs
                  text-blue-200
                  mt-0.5
                "
              >
                Plataforma inteligente de revisión académica
              </p>

            </div>

          </div>


          {/* CONTENIDO */}

          <div className="relative max-w-md">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-white/10
                border
                border-white/10
                text-xs
                font-semibold
                text-blue-100
                backdrop-blur-sm
                mb-6
              "
            >

              <Sparkles
                size={13}
                className="text-cyan-300"
              />

              Revisión académica inteligente

            </div>


            <h2
              className="
                text-4xl
                xl:text-5xl
                font-black
                leading-[1.08]
                tracking-tight
              "
            >

              Mejora tus

              <span
                className="
                  block
                  text-cyan-300
                  mt-1
                "
              >
                Informes de Sprint.
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
              Lee y analiza tus entregables, valida la estructura,
              los formatos y los criterios de revisión antes de
              realizar tu entrega por Google Classroom.
            </p>


            {/* CARACTERÍSTICAS */}

            <div className="mt-8 space-y-3">

              <Feature
                icon={<CheckCircle2 size={16} />}
                text="Revisión automatizada de Informes de Sprint"
              />

              <Feature
                icon={<ClipboardCheck size={16} />}
                text="Criterios de revisión basados en Normas APA"
              />

              <Feature
                icon={<CheckCircle2 size={16} />}
                text="Resultados claros para identificar mejoras"
              />

              <Feature
                icon={<ShieldCheck size={16} />}
                text="Historial de revisiones para analizar tu progreso"
              />

            </div>


            {/* BADGE */}

            <div
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-full
                bg-cyan-400/10
                border
                border-cyan-300/10
                text-xs
                text-cyan-100
                backdrop-blur-sm
              "
            >

              <ShieldCheck
                size={14}
                className="text-cyan-300"
              />

              Plataforma académica segura

            </div>

          </div>


          {/* PIE */}

          <div className="relative">

            <div
              className="
                h-px
                bg-white/10
                mb-4
              "
            />

            <p className="text-xs text-blue-300">
              © 2026 Valle Grande · APP Reviewer
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


          {/* MARCA MOBILE */}

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
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-700
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

                <p
                  className="
                    font-black
                    text-lg
                    text-slate-900
                  "
                >
                  APP Reviewer
                </p>

                <p className="text-xs text-slate-400">
                  Revisión académica inteligente
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              SELECCIÓN DE ROL
          ================================================== */}

          {!tipo && (

            <div className="w-full max-w-xl mx-auto">

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
                  Selecciona tu rol
                </h1>


                <p
                  className="
                    text-sm
                    sm:text-base
                    text-slate-500
                    mt-3
                    max-w-lg
                    leading-relaxed
                  "
                >
                  Haz clic en el tipo de rol que tienes e inicia
                  sesión en la plataforma.
                </p>

              </div>


              <div className="space-y-4">

                <RoleCard
                  onClick={() => setTipo("DOCENTE")}
                  icon={<UserRound size={25} />}
                  number="01"
                  title="Soy Docente"
                  tag="Evaluación"
                  description="Analiza, revisa y califica los Informes de Sprint."
                  color="blue"
                />


                <RoleCard
                  onClick={() => setTipo("ESTUDIANTE")}
                  icon={<GraduationCap size={26} />}
                  number="02"
                  title="Soy Estudiante"
                  tag="Académico"
                  description="Revisa tu Informe de Sprint antes de enviarlo por Classroom."
                  color="emerald"
                />


                <RoleCard
                  onClick={() => setTipo("ADMIN")}
                  icon={<Settings2 size={25} />}
                  number="03"
                  title="Soy Administrador"
                  tag="Gestión"
                  description="Administra las funcionalidades y actualizaciones de la plataforma."
                  color="violet"
                />

              </div>


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
              LOGIN SEGÚN ROL
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


              {/* DOCENTE */}

              {tipo === "DOCENTE" && (
                <TeacherLogin />
              )}


              {/* ESTUDIANTE */}

              {tipo === "ESTUDIANTE" && (
                <GoogleLogin />
              )}


              {/* ADMIN */}

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


/* ==================================================
    FEATURE
================================================== */

function Feature({ icon, text }) {

  return (

    <div
      className="
        flex
        items-center
        gap-3
        text-sm
        text-blue-100
      "
    >

      <div
        className="
          w-8
          h-8
          rounded-lg
          bg-white/10
          border
          border-white/5
          flex
          items-center
          justify-center
          shrink-0
        "
      >

        {icon}

      </div>

      <span>
        {text}
      </span>

    </div>

  );
}


/* ==================================================
    ROLE CARD
================================================== */

function RoleCard({
  onClick,
  icon,
  number,
  title,
  tag,
  description,
  color,
}) {

  const colors = {

    blue: {
      border: "hover:border-blue-400",
      bg: "hover:bg-blue-50/50",
      iconBg: "bg-blue-100",
      iconText: "text-blue-700",
      iconHover: "group-hover:bg-blue-600 group-hover:text-white",
      arrow: "group-hover:text-blue-600",
      arrowBg: "group-hover:bg-blue-100",
      tagBg: "bg-blue-100",
      tagText: "text-blue-700",
    },

    emerald: {
      border: "hover:border-emerald-400",
      bg: "hover:bg-emerald-50/50",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-700",
      iconHover: "group-hover:bg-emerald-600 group-hover:text-white",
      arrow: "group-hover:text-emerald-600",
      arrowBg: "group-hover:bg-emerald-100",
      tagBg: "bg-emerald-100",
      tagText: "text-emerald-700",
    },

    violet: {
      border: "hover:border-violet-400",
      bg: "hover:bg-violet-50/50",
      iconBg: "bg-violet-100",
      iconText: "text-violet-700",
      iconHover: "group-hover:bg-violet-600 group-hover:text-white",
      arrow: "group-hover:text-violet-600",
      arrowBg: "group-hover:bg-violet-100",
      tagBg: "bg-violet-100",
      tagText: "text-violet-700",
    },

  };


  const theme = colors[color];


  return (

    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        group
        flex
        items-center
        gap-4
        p-4
        sm:p-5
        rounded-2xl
        border
        border-slate-200
        bg-white
        text-left
        transition-all
        duration-300
        ${theme.border}
        ${theme.bg}
        hover:shadow-xl
        hover:shadow-slate-200/60
        hover:-translate-y-0.5
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/20
      `}
    >

      <div
        className={`
          w-14
          h-14
          rounded-2xl
          ${theme.iconBg}
          ${theme.iconText}
          flex
          items-center
          justify-center
          shrink-0
          ${theme.iconHover}
          transition-all
          duration-300
        `}
      >

        {icon}

      </div>


      <div className="flex-1 min-w-0">

        <div
          className="
            flex
            items-center
            gap-2
            flex-wrap
          "
        >

          <p
            className="
              font-bold
              text-slate-900
              text-base
            "
          >
            {title}
          </p>


          <span
            className={`
              px-2
              py-0.5
              rounded-full
              ${theme.tagBg}
              ${theme.tagText}
              text-[10px]
              font-bold
              uppercase
              tracking-wide
            `}
          >

            {tag}

          </span>

        </div>


        <p
          className="
            text-sm
            text-slate-500
            mt-1.5
            leading-relaxed
            pr-2
          "
        >
          {description}
        </p>

      </div>


      <div
        className="
          hidden
          sm:flex
          flex-col
          items-end
          gap-2
          shrink-0
        "
      >

        <span
          className="
            text-[10px]
            font-bold
            text-slate-300
            tracking-widest
          "
        >
          {number}
        </span>


        <div
          className={`
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            text-slate-300
            ${theme.arrow}
            ${theme.arrowBg}
            transition-all
            duration-300
          `}
        >

          <ArrowRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />

        </div>

      </div>

    </button>

  );
}
