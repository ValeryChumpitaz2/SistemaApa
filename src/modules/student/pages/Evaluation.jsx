import {
  FileText,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  ArrowDown
} from "lucide-react";

import SubmitDocument from "../components/SubmitDocument";


export default function Evaluation({
  setDocumentos
}) {

  return (

    <div className="space-y-8">


      {/* ==================================================
          ENCABEZADO
      ================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-blue-100
          bg-white
          px-7
          py-8
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            absolute
            -right-16
            -top-16
            h-44
            w-44
            rounded-full
            bg-blue-50
            dark:bg-blue-900/10
          "
        />

        <div
          className="
            absolute
            -bottom-20
            right-32
            h-36
            w-36
            rounded-full
            bg-indigo-50
            dark:bg-indigo-900/10
          "
        />


        <div className="relative z-10">

          {/* ETIQUETA */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-50
              px-3
              py-1.5
              text-xs
              font-bold
              text-[#1D3681]
              dark:bg-blue-900/30
              dark:text-blue-300
            "
          >

            <Sparkles size={14} />

            Asistente académico

          </div>


          {/* TÍTULO */}

          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-900
              dark:text-white
              md:text-4xl
            "
          >

            Nueva evaluación

          </h1>


          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
              md:text-base
            "
          >

            Analiza tu documento académico y descubre
            qué aspectos puedes mejorar para cumplir
            con las normas APA.

          </p>


          {/* BENEFICIOS */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
            "
          >

            <Badge
              icon={<CheckCircle2 size={15} />}
              texto="Análisis automático"
            />

            <Badge
              icon={<ShieldCheck size={15} />}
              texto="Revisión APA"
            />

            <Badge
              icon={<BookOpen size={15} />}
              texto="Recomendaciones académicas"
            />

          </div>

        </div>

      </section>



      {/* ==================================================
          CÓMO FUNCIONA
      ================================================== */}

      <section>

        <div className="mb-5">

          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-widest
              text-blue-600
              dark:text-blue-400
            "
          >

            Proceso de evaluación

          </p>


          <h2
            className="
              mt-1
              text-2xl
              font-black
              text-slate-900
              dark:text-white
            "
          >

            Analiza tu documento en pocos pasos

          </h2>

        </div>


        <div
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >

          <StepCard
            numero="01"
            icon={<FileText size={21} />}
            titulo="Selecciona"
            texto="Selecciona el documento académico que deseas evaluar."
          />


          <StepCard
            numero="02"
            icon={<Sparkles size={21} />}
            titulo="Analiza"
            texto="El sistema revisará automáticamente tu documento."
          />


          <StepCard
            numero="03"
            icon={<CheckCircle2 size={21} />}
            titulo="Mejora"
            texto="Consulta tus resultados y aplica las recomendaciones."
          />

        </div>

      </section>



      {/* ==================================================
          SEPARADOR VISUAL
      ================================================== */}

      <div
        className="
          flex
          items-center
          justify-center
          gap-3
          text-slate-400
        "
      >

        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-blue-600
            dark:bg-blue-900/30
            dark:text-blue-300
          "
        >

          <ArrowDown size={16} />

        </div>

        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

      </div>



      {/* ==================================================
          ANALIZADOR
      ================================================== */}

      <section>

        <div className="mb-5">

          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-widest
              text-blue-600
              dark:text-blue-400
            "
          >

            Comenzar análisis

          </p>


          <h2
            className="
              mt-1
              text-2xl
              font-black
              text-slate-900
              dark:text-white
            "
          >

            Sube tu documento

          </h2>


          <p
            className="
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >

            Completa el formulario para iniciar la evaluación.

          </p>

        </div>


        {/* IMPORTANTE:
            NO CAMBIAMOS EL ANALIZADOR */}

        <SubmitDocument
          setDocumentos={setDocumentos}
        />

      </section>



      {/* ==================================================
          INFORMACIÓN FINAL
      ================================================== */}

      <div
        className="
          flex
          items-start
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          px-5
          py-4
          dark:border-slate-800
          dark:bg-slate-900/60
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
            bg-white
            text-[#1D3681]
            shadow-sm
            dark:bg-slate-800
            dark:text-blue-300
          "
        >

          <ShieldCheck size={20} />

        </div>


        <div>

          <p
            className="
              text-sm
              font-bold
              text-slate-800
              dark:text-white
            "
          >

            Evaluación académica

          </p>


          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-500
              dark:text-slate-400
            "
          >

            Los resultados sirven como guía para mejorar
            tu documento. Revisa las recomendaciones
            antes de realizar la entrega final.

          </p>

        </div>

      </div>


    </div>

  );

}


/* ==================================================
   BADGE
================================================== */

function Badge({
  icon,
  texto
}) {

  return (

    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        px-3
        py-2
        text-xs
        font-bold
        text-slate-600
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-slate-300
      "
    >

      <span
        className="
          text-[#1D3681]
          dark:text-blue-300
        "
      >

        {icon}

      </span>

      {texto}

    </div>

  );

}


/* ==================================================
   STEP CARD
================================================== */

function StepCard({
  numero,
  icon,
  titulo,
  texto
}) {

  return (

    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-md
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* NÚMERO */}

      <span
        className="
          absolute
          right-4
          top-4
          text-xs
          font-black
          text-slate-200
          dark:text-slate-700
        "
      >

        {numero}

      </span>


      {/* ICONO */}

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-[#1D3681]
          transition
          group-hover:bg-[#1D3681]
          group-hover:text-white
          dark:bg-blue-900/30
          dark:text-blue-300
          dark:group-hover:bg-[#1D3681]
          dark:group-hover:text-white
        "
      >

        {icon}

      </div>


      <h3
        className="
          mt-4
          font-black
          text-slate-800
          dark:text-white
        "
      >

        {titulo}

      </h3>


      <p
        className="
          mt-1.5
          text-sm
          leading-5
          text-slate-500
          dark:text-slate-400
        "
      >

        {texto}

      </p>

    </div>

  );

}