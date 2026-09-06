import {
  useEffect,
  useState
} from "react";

import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

import {
  Quote,
  Star,
  MessageSquare,
  Loader2
} from "lucide-react";

import { db } from "../../auth/firebase";
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

    setCargando(true);
    setError("");


    // --------------------------------------------------
    // CONSULTA
    // --------------------------------------------------
    //
    // Solo obtenemos testimonios aprobados.
    //
    // IMPORTANTE:
    // No utilizamos orderBy para evitar necesitar
    // un índice compuesto de Firestore.
    //

    const consulta = query(

      collection(
        db,
        "testimonios"
      ),

      where(
        "visible",
        "==",
        true
      )

    );


    // --------------------------------------------------
    // ESCUCHAR CAMBIOS EN TIEMPO REAL
    // --------------------------------------------------

    const cancelar = onSnapshot(

      consulta,

      (snapshot) => {

        try {

          const datos = snapshot.docs

            .map(
              (documento) => ({

                id:
                  documento.id,

                ...documento.data()

              })
            )


            // ------------------------------------------
            // ORDENAR POR FECHA
            // ------------------------------------------

            .sort(
              (a, b) => {

                const fechaA =
                  a.fecha?.toDate?.() ||
                  new Date(0);


                const fechaB =
                  b.fecha?.toDate?.() ||
                  new Date(0);


                return (
                  fechaB.getTime() -
                  fechaA.getTime()
                );

              }
            );


          setTestimonios(
            datos
          );


          setCargando(
            false
          );


          setError("");


        } catch (error) {

          console.error(
            "Error procesando testimonios:",
            error
          );


          setError(
            "No se pudieron procesar los testimonios."
          );


          setCargando(
            false
          );

        }

      },


      (error) => {

        console.error(
          "Error cargando testimonios:",
          error
        );


        setError(
          "No se pudieron cargar los testimonios."
        );


        setCargando(
          false
        );

      }

    );


    // --------------------------------------------------
    // LIMPIAR LISTENER
    // --------------------------------------------------

    return () => {

      cancelar();

    };

  }, []);


  // ==================================================
  // CARGANDO
  // ==================================================

  if (cargando) {

    return (

      <section
        className="
          py-24
          bg-white
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          <div
            className="
              text-center
              max-w-3xl
              mx-auto
            "
          >

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-100
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-700
              "
            >

              <MessageSquare
                size={16}
              />

              Experiencias reales

            </span>


            <h2
              className="
                mt-5
                text-4xl
                md:text-5xl
                font-black
                text-slate-900
              "
            >

              Lo que dice nuestra comunidad

            </h2>


            <p
              className="
                mt-5
                text-lg
                text-slate-600
              "
            >

              Conoce las experiencias de estudiantes,
              docentes y miembros de la comunidad
              académica que utilizan VG Smart Review.

            </p>


            <div
              className="
                mt-12
                flex
                justify-center
                items-center
                gap-3
                text-slate-500
              "
            >

              <Loader2
                size={22}
                className="animate-spin text-blue-600"
              />

              Cargando testimonios...

            </div>

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
          py-24
          bg-white
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          <div
            className="
              text-center
              max-w-3xl
              mx-auto
            "
          >

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-100
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-700
              "
            >

              <MessageSquare
                size={16}
              />

              Experiencias reales

            </span>


            <h2
              className="
                mt-5
                text-4xl
                md:text-5xl
                font-black
                text-slate-900
              "
            >

              Lo que dice nuestra comunidad

            </h2>


            <p
              className="
                mt-5
                text-lg
                text-slate-600
              "
            >

              Conoce las experiencias de estudiantes,
              docentes y miembros de la comunidad
              académica que utilizan VG Smart Review.

            </p>


            <div
              className="
                mt-10
                rounded-2xl
                border
                border-red-200
                bg-red-50
                px-6
                py-5
                text-red-700
              "
            >

              {error}

            </div>

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
          py-24
          bg-white
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          <div
            className="
              text-center
              max-w-3xl
              mx-auto
            "
          >

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-100
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-700
              "
            >

              <MessageSquare
                size={16}
              />

              Experiencias reales

            </span>


            <h2
              className="
                mt-5
                text-4xl
                md:text-5xl
                font-black
                text-slate-900
              "
            >

              Lo que dice nuestra comunidad

            </h2>


            <p
              className="
                mt-5
                text-lg
                text-slate-600
              "
            >

              Conoce las experiencias de estudiantes,
              docentes y miembros de la comunidad
              académica que utilizan VG Smart Review.

            </p>


            <div
              className="
                mt-12
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                p-10
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

                <MessageSquare
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
                  mt-2
                  text-slate-500
                "
              >

                Pronto aparecerán aquí las experiencias
                de nuestra comunidad académica.

              </p>

            </div>

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
        py-24
        bg-white
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >

        {/* ==========================================
            ENCABEZADO
        ========================================== */}

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
          "
        >

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-100
              text-blue-700
              px-4
              py-2
              text-sm
              font-semibold
            "
          >

            <MessageSquare
              size={16}
            />

            Experiencias reales

          </span>


          <h2
            className="
              mt-5
              text-4xl
              md:text-5xl
              font-black
              text-slate-900
            "
          >

            Lo que dice nuestra comunidad

          </h2>


          <p
            className="
              mt-5
              text-lg
              text-slate-600
            "
          >

            Conoce las experiencias de estudiantes,
            docentes y miembros de la comunidad
            académica que utilizan VG Smart Review.

          </p>

        </div>


        {/* ==========================================
            TARJETAS
        ========================================== */}

        <div
          className="
            mt-14
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-7
          "
        >

          {testimonios.map(
            (item) => (

              <TestimonialCard
                key={item.id}
                item={item}
              />

            )
          )}

        </div>

      </div>

    </section>

  );

}


// ==================================================
// TARJETA DE TESTIMONIO
// ==================================================

function TestimonialCard({
  item
}) {

  // --------------------------------------------------
  // NOMBRE
  // --------------------------------------------------

  const nombre =
    item.nombre ||
    "Usuario";


  // --------------------------------------------------
  // ROL
  // --------------------------------------------------

  const rol =
    item.rol === "DOCENTE"
      ? "Docente"
      : item.rol === "ADMIN"
        ? "Administrador"
        : "Estudiante";


  // --------------------------------------------------
  // INICIAL
  // --------------------------------------------------

  const inicial =
    nombre
      .trim()
      .charAt(0)
      .toUpperCase();


  // --------------------------------------------------
  // CALIFICACIÓN
  // --------------------------------------------------

  const calificacion =
    Number(
      item.calificacion
    ) || 5;


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <article
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-slate-50
        p-8
        transition
        hover:-translate-y-2
        hover:bg-white
        hover:shadow-xl
        hover:border-blue-200
      "
    >

      {/* ==========================================
          CABECERA
      ========================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        {/* ICONO */}

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
          "
        >

          <Quote
            size={22}
          />

        </div>


        {/* ESTRELLAS */}

        <div
          className="
            flex
            gap-1
          "
        >

          {[1, 2, 3, 4, 5].map(
            (estrella) => (

              <Star
                key={estrella}
                size={15}
                className={
                  estrella <= calificacion
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }
              />

            )
          )}

        </div>

      </div>


      {/* ==========================================
          COMENTARIO
      ========================================== */}

      <p
        className="
          mt-6
          text-slate-600
          leading-7
        "
      >

        "{item.comentario}"

      </p>


      {/* ==========================================
          USUARIO
      ========================================== */}

      <div
        className="
          mt-7
          flex
          items-center
          gap-3
          border-t
          border-slate-200
          pt-6
        "
      >

        {/* INICIAL */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-600
            font-bold
            text-white
          "
        >

          {inicial}

        </div>


        {/* DATOS */}

        <div>

          <p
            className="
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