import {
  useEffect,
  useState
} from "react";

import {
  Quote,
  Star,
  MessageSquare,
  Loader2,
  Users,
  Sparkles
} from "lucide-react";

import {
  obtenerTestimonios
} from "../../modules/student/services/testimoniosService";


// ==================================================
// COMPONENTE TESTIMONIOS
// ==================================================

export default function Testimonials() {

  const [
    testimonios,
    setTestimonios
  ] = useState([]);


  const [
    cargando,
    setCargando
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  // ==================================================
  // CARGAR TESTIMONIOS
  // ==================================================

  useEffect(() => {

    cargarTestimonios();

  }, []);


  async function cargarTestimonios() {

    try {

      setCargando(true);
      setError("");


      console.log(
        "===================================="
      );

      console.log(
        "LANDING - CARGANDO TESTIMONIOS"
      );


      // ==================================================
      // CONSULTAR GOOGLE APPS SCRIPT
      // ==================================================

      const resultado =
        await obtenerTestimonios();


      console.log(
        "RESPUESTA BACKEND TESTIMONIOS:",
        resultado
      );


      // ==================================================
      // NORMALIZAR RESPUESTA
      // ==================================================

      let datos = [];


      /*
       * El backend puede responder:
       *
       * []
       *
       * o
       *
       * {
       *   ok: true,
       *   data: []
       * }
       *
       * o
       *
       * {
       *   ok: true,
       *   testimonios: []
       * }
       */

      if (
        Array.isArray(resultado)
      ) {

        datos =
          resultado;

      }
      else if (
        Array.isArray(
          resultado?.testimonios
        )
      ) {

        datos =
          resultado.testimonios;

      }
      else if (
        Array.isArray(
          resultado?.data
        )
      ) {

        datos =
          resultado.data;

      }


      // ==================================================
      // SOLO APROBADOS
      // ==================================================

      datos =
        datos.filter(
          (item) => {

            return (
              String(
                item.estado || ""
              )
                .trim()
                .toLowerCase()
              ===
              "aprobado"
            );

          }
        );


      // ==================================================
      // ORDENAR POR FECHA
      // ==================================================

      datos.sort(
        (a, b) => {

          const fechaA =
            convertirFecha(
              a.fecha
            );


          const fechaB =
            convertirFecha(
              b.fecha
            );


          return (
            fechaB -
            fechaA
          );

        }
      );


      // ==================================================
      // GUARDAR
      // ==================================================

      setTestimonios(
        datos
      );


      console.log(
        "TESTIMONIOS APROBADOS:",
        datos
      );


    }
    catch (err) {

      console.error(
        "ERROR CARGANDO TESTIMONIOS:",
        err
      );


      setError(
        err?.message ||
        "No se pudieron cargar los testimonios."
      );

    }
    finally {

      setCargando(
        false
      );

    }

  }


  // ==================================================
  // CARGANDO
  // ==================================================

  if (cargando) {

    return (

      <section
        className="
          relative
          overflow-hidden
          bg-white
          py-20
          md:py-24
        "
      >

        <div
          className="
            absolute
            left-0
            top-0
            h-72
            w-72
            rounded-full
            bg-blue-100/40
            blur-3xl
          "
        />


        <div
          className="
            absolute
            right-0
            bottom-0
            h-72
            w-72
            rounded-full
            bg-indigo-100/40
            blur-3xl
          "
        />


        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <Encabezado />


          <div
            className="
              mt-12
              flex
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              px-6
              py-16
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
              "
            >

              <Loader2
                size={30}
                className="animate-spin"
              />

            </div>


            <p
              className="
                mt-5
                font-semibold
                text-slate-700
              "
            >

              Cargando experiencias...

            </p>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >

              Estamos consultando nuestra comunidad.

            </p>

          </div>

        </div>

      </section>

    );

  }


  // ==================================================
  // ERROR
  // ==================================================

  if (error) {

    return (

      <section
        className="
          relative
          overflow-hidden
          bg-white
          py-20
          md:py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <Encabezado />


          <div
            className="
              mx-auto
              mt-12
              max-w-2xl
              rounded-3xl
              border
              border-red-200
              bg-red-50
              p-8
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-100
                text-red-600
              "
            >

              <MessageSquare
                size={26}
              />

            </div>


            <h3
              className="
                mt-5
                text-lg
                font-black
                text-red-800
              "
            >

              No se pudieron cargar los testimonios.

            </h3>


            <p
              className="
                mt-2
                text-sm
                text-red-600
              "
            >

              {error}

            </p>

          </div>

        </div>

      </section>

    );

  }


  // ==================================================
  // SIN TESTIMONIOS
  // ==================================================

  if (
    testimonios.length === 0
  ) {

    return (

      <section
        className="
          relative
          overflow-hidden
          bg-white
          py-20
          md:py-24
        "
      >

        <div
          className="
            absolute
            left-0
            top-0
            h-80
            w-80
            rounded-full
            bg-blue-100/40
            blur-3xl
          "
        />


        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <Encabezado />


          <div
            className="
              mx-auto
              mt-12
              max-w-2xl
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-10
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
              "
            >

              <Users
                size={30}
              />

            </div>


            <h3
              className="
                mt-5
                text-xl
                font-black
                text-slate-900
              "
            >

              Aún no hay testimonios publicados

            </h3>


            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-slate-500
              "
            >

              Pronto aparecerán aquí las experiencias
              de nuestra comunidad académica.

            </p>

          </div>

        </div>

      </section>

    );

  }


  // ==================================================
  // TESTIMONIOS
  // ==================================================

  return (

    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        md:py-24
      "
    >

      {/* FONDOS */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-80
          w-80
          rounded-full
          bg-blue-100/50
          blur-3xl
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-0
          h-80
          w-80
          rounded-full
          bg-indigo-100/50
          blur-3xl
        "
      />


      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
        "
      >

        <Encabezado />


        {/* ==================================================
            CONTADOR
        ================================================== */}

        <div
          className="
            mt-8
            flex
            justify-center
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-600
              shadow-sm
            "
          >

            <Users
              size={16}
              className="text-blue-600"
            />


            {testimonios.length}


            {
              testimonios.length === 1
                ? " experiencia publicada"
                : " experiencias publicadas"
            }

          </div>

        </div>


        {/* ==================================================
            TARJETAS
        ================================================== */}

        <div
          className="
            mt-12
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >

          {
            testimonios.map(
              (item) => (

                <TestimonialCard
                  key={
                    item.id ||
                    `${item.nombre}-${item.fecha}`
                  }
                  item={item}
                />

              )
            )
          }

        </div>

      </div>

    </section>

  );

}


// ==================================================
// ENCABEZADO
// ==================================================

function Encabezado() {

  return (

    <div
      className="
        mx-auto
        max-w-3xl
        text-center
      "
    >

      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-blue-50
          px-4
          py-2
          text-sm
          font-bold
          text-blue-700
          ring-1
          ring-blue-100
        "
      >

        <Sparkles
          size={16}
        />

        Experiencias reales

      </span>


      <h2
        className="
          mt-5
          text-4xl
          font-black
          tracking-tight
          text-slate-900
          md:text-5xl
        "
      >

        Lo que dice nuestra comunidad

      </h2>


      <p
        className="
          mx-auto
          mt-5
          max-w-2xl
          text-base
          leading-7
          text-slate-600
          md:text-lg
        "
      >

        Conoce las experiencias de estudiantes,
        docentes y miembros de la comunidad
        académica que utilizan VG Smart Review.

      </p>

    </div>

  );

}


// ==================================================
// TARJETA
// ==================================================

function TestimonialCard({
  item
}) {

  const nombre =
    item.nombre ||
    "Usuario";


  const rol =
    obtenerRol(
      item.tipo ||
      item.rol
    );


  const comentario =
    item.experiencia ||
    item.comentario ||
    "Excelente experiencia utilizando VG Smart Review.";


  const calificacion =
    Math.min(
      5,
      Math.max(
        1,
        Number(
          item.calificacion
        ) || 5
      )
    );


  const inicial =
    nombre
      .trim()
      .charAt(0)
      .toUpperCase();


  return (

    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-7
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
      "
    >

      {/* BARRA SUPERIOR */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1
          bg-gradient-to-r
          from-blue-600
          via-indigo-500
          to-blue-400
        "
      />


      {/* CABECERA */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-50
            text-blue-600
            transition
            group-hover:bg-blue-600
            group-hover:text-white
          "
        >

          <Quote
            size={21}
          />

        </div>


        {/* ESTRELLAS */}

        <div
          className="
            flex
            items-center
            gap-1
            rounded-full
            bg-amber-50
            px-3
            py-2
          "
        >

          {[1, 2, 3, 4, 5].map(
            (estrella) => (

              <Star
                key={estrella}
                size={15}
                className={
                  estrella <= calificacion
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }
              />

            )
          )}

        </div>

      </div>


      {/* EXPERIENCIA */}

      <div
        className="
          mt-6
          flex-1
        "
      >

        <p
          className="
            text-base
            leading-7
            text-slate-600
          "
        >

          “{comentario}”

        </p>

      </div>


      {/* AYUDA */}

      {
        item.ayuda &&

        <div
          className="
            mt-5
            rounded-2xl
            bg-slate-50
            p-4
          "
        >

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-blue-600
            "
          >

            ¿Cómo ayudó?

          </p>


          <p
            className="
              mt-1
              text-sm
              leading-6
              text-slate-600
            "
          >

            {item.ayuda}

          </p>

        </div>

      }


      {/* USUARIO */}

      <div
        className="
          mt-6
          flex
          items-center
          gap-3
          border-t
          border-slate-100
          pt-5
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
            rounded-full
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            text-sm
            font-black
            text-white
          "
        >

          {inicial}

        </div>


        <div
          className="min-w-0"
        >

          <p
            className="
              truncate
              font-bold
              text-slate-900
            "
          >

            {nombre}

          </p>


          <p
            className="
              text-sm
              text-slate-500
            "
          >

            {rol}

          </p>

        </div>

      </div>

    </article>

  );

}


// ==================================================
// OBTENER ROL
// ==================================================

function obtenerRol(
  rol
) {

  const valor =
    String(
      rol || ""
    )
      .trim()
      .toUpperCase();


  if (
    valor === "DOCENTE" ||
    valor === "TEACHER"
  ) {

    return "Docente";

  }


  if (
    valor === "ADMIN" ||
    valor === "ADMINISTRADOR"
  ) {

    return "Administrador";

  }


  return "Estudiante";

}


// ==================================================
// CONVERTIR FECHA
// ==================================================

function convertirFecha(
  fecha
) {

  if (!fecha) {

    return 0;

  }


  if (
    typeof fecha?.toDate ===
    "function"
  ) {

    const resultado =
      fecha.toDate();


    return resultado.getTime();

  }


  const fechaConvertida =
    new Date(
      fecha
    );


  if (
    Number.isNaN(
      fechaConvertida.getTime()
    )
  ) {

    return 0;

  }


  return fechaConvertida.getTime();

}
