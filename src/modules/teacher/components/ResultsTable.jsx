import { 
  useState, 
  useMemo, 
  useEffect 
} from "react";

import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";

import GeneralReportButton from "./GeneralReportButton";
import DetailReportButton from "./DetailReportButton";


export default function ResultsTable({
  resultados = [],
  onSelect,
}) {


  const ITEMS_POR_PAGINA = 10;


  const [paginaActual, setPaginaActual] = useState(1);


  const [busqueda, setBusqueda] = useState("");


  const [estadoFiltro, setEstadoFiltro] = useState("todos");


  const [nivelFiltro, setNivelFiltro] = useState("todos");



  useEffect(() => {

    setPaginaActual(1);

  }, [
    resultados,
    busqueda,
    estadoFiltro,
    nivelFiltro
  ]);



  /*
  ==========================
  FILTROS
  ==========================
  */


  const resultadosFiltrados = useMemo(()=>{


    return resultados.filter(item=>{


      const nombre =
      (
        item.nombre ||
        ""
      )
      .toLowerCase();



      const texto =
      busqueda.toLowerCase();



      const porcentaje =
      Number(
        item.puntaje?.porcentaje ?? 0
      );



      const cumpleBusqueda =
      nombre.includes(texto);



      let cumpleEstado = true;



      if(
        estadoFiltro === "aprobado"
      ){

        cumpleEstado =
        porcentaje >=70;

      }


      if(
        estadoFiltro === "revisar"
      ){

        cumpleEstado =
        porcentaje <70;

      }



      let cumpleNivel=true;



      if(
        nivelFiltro==="excelente"
      ){

        cumpleNivel =
        porcentaje>=90;

      }


      if(
        nivelFiltro==="bueno"
      ){

        cumpleNivel =
        porcentaje>=70 &&
        porcentaje<90;

      }


      if(
        nivelFiltro==="regular"
      ){

        cumpleNivel =
        porcentaje>=50 &&
        porcentaje<70;

      }


      if(
        nivelFiltro==="critico"
      ){

        cumpleNivel =
        porcentaje<50;

      }



      return (
        cumpleBusqueda &&
        cumpleEstado &&
        cumpleNivel
      );


    });


  },[
    resultados,
    busqueda,
    estadoFiltro,
    nivelFiltro
  ]);




  /*
  ==========================
  PAGINACION
  ==========================
  */


  const totalPaginas =
  Math.max(
    1,
    Math.ceil(
      resultadosFiltrados.length /
      ITEMS_POR_PAGINA
    )
  );



  const resultadosPaginados =
  useMemo(()=>{


    const inicio =
    (
      paginaActual-1
    )
    *
    ITEMS_POR_PAGINA;



    return resultadosFiltrados.slice(
      inicio,
      inicio+ITEMS_POR_PAGINA
    );


  },[
    resultadosFiltrados,
    paginaActual
  ]);




  if(!resultados.length){

    return (

      <div className="
        bg-white
        rounded-3xl
        border
        p-10
        text-center
        text-gray-500
      ">

        <FileText
          size={40}
          className="
            mx-auto
            text-gray-400
          "
        />

        <p className="mt-4">
          No hay resultados para mostrar.
        </p>


      </div>

    );

  }



  return (

    <>


      {/* BOTONES REPORTES */}

      <div className="
        flex
        justify-end
        gap-3
        mb-5
        flex-wrap
      ">

        <GeneralReportButton
          resultados={resultados}
        />


        <DetailReportButton
          resultados={resultados}
        />

      </div>




      {/* FILTROS */}


      <div className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-5
        mb-6
      ">


        <div className="
          flex
          items-center
          gap-2
          mb-4
          text-blue-900
          font-bold
        ">

          <Filter size={20}/>

          Filtros de búsqueda

        </div>



        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        ">



          {/* BUSCAR */}

          <div className="
            relative
          ">

            <Search
              size={20}
              className="
                absolute
                left-4
                top-3
                text-gray-400
              "
            />


            <input

              value={busqueda}

              onChange={
                e=>setBusqueda(
                  e.target.value
                )
              }


              placeholder="
                Buscar documento...
              "

              className="
                w-full
                pl-12
                py-3
                rounded-xl
                border
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />


          </div>




          {/* ESTADO */}

          <select

            value={estadoFiltro}

            onChange={
              e=>setEstadoFiltro(
                e.target.value
              )
            }


            className="
              rounded-xl
              border
              px-4
              py-3
              font-semibold
            "

          >

            <option value="todos">
              Todos los estados
            </option>

            <option value="aprobado">
              🟢 Aprobados
            </option>


            <option value="revisar">
              🔴 Revisar
            </option>


          </select>




          {/* NIVEL */}

          <select

            value={nivelFiltro}

            onChange={
              e=>setNivelFiltro(
                e.target.value
              )
            }


            className="
              rounded-xl
              border
              px-4
              py-3
              font-semibold
            "

          >

            <option value="todos">
              Todos los niveles
            </option>


            <option value="excelente">
              🟢 Excelente 90+
            </option>


            <option value="bueno">
              🔵 Bueno 70-89
            </option>


            <option value="regular">
              🟡 Regular 50-69
            </option>


            <option value="critico">
              🔴 Crítico 0-49
            </option>


          </select>


        </div>



      </div>





      {/* TABLA */}


      <div className="
        rounded-3xl
        border
        bg-white
        overflow-hidden
        shadow-sm
      ">


      <div className="overflow-x-auto">


      <table className="
        w-full
        min-w-[850px]
      ">


      <thead className="
        bg-gradient-to-r
        from-blue-950
        to-indigo-700
        text-white
      ">

      <tr>

      <th className="p-5 text-left">
        Documento
      </th>


      <th className="p-5 text-center">
        Puntaje
      </th>


      <th className="p-5 text-center">
        Cumplimiento
      </th>


      <th className="p-5 text-center">
        Estado
      </th>


      <th className="p-5 text-center">
        Acción
      </th>


      </tr>

      </thead>




      <tbody>


      {
        resultadosPaginados.map(
          (item,index)=>{


          const porcentaje =
          Number(
            item.puntaje?.porcentaje ?? 0
          );



          let estadoVisual;



          if(porcentaje>=90){

            estadoVisual={
              texto:"Excelente",
              clase:
              "bg-green-100 text-green-700"
            };

          }
          else if(porcentaje>=70){

            estadoVisual={
              texto:"Bueno",
              clase:
              "bg-blue-100 text-blue-700"
            };

          }
          else if(porcentaje>=50){

            estadoVisual={
              texto:"Regular",
              clase:
              "bg-yellow-100 text-yellow-700"
            };

          }
          else{

            estadoVisual={
              texto:"Crítico",
              clase:
              "bg-red-100 text-red-700"
            };

          }



          return (

          <tr

          key={
            `${item.nombre}-${index}`
          }

          className="
            border-t
            hover:bg-slate-50
            transition
          "

          >


          <td className="p-5">

          <div className="
            flex
            items-center
            gap-3
          ">


          <div className="
            bg-blue-100
            text-blue-900
            p-2
            rounded-xl
          ">

          <FileText size={18}/>

          </div>


          <span className="
            font-semibold
            truncate
            max-w-sm
          ">

          {item.nombre}

          </span>


          </div>


          </td>




          <td className="
            p-5
            text-center
            font-bold
          ">

          {
          item.puntaje?.obtenido ?? 0
          }
          /
          {
          item.puntaje?.maximo ?? 0
          }


          </td>




          <td className="p-5 text-center">


          <span className="
            bg-blue-100
            text-blue-900
            px-4
            py-2
            rounded-full
            font-bold
          ">

          {porcentaje}%

          </span>


          </td>




          <td className="p-5 text-center">


          <span className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            font-bold
            ${estadoVisual.clase}
          `}>


          {
            porcentaje>=70
            ?
            <CheckCircle2 size={18}/>
            :
            <AlertTriangle size={18}/>
          }


          {estadoVisual.texto}


          </span>


          </td>





          <td className="p-5 text-center">


          <button

          onClick={
            ()=>onSelect(item)
          }

          className="
            bg-blue-900
            hover:bg-blue-800
            text-white
            px-4
            py-2
            rounded-xl
            inline-flex
            gap-2
            items-center
          "

          >

          <Eye size={18}/>

          Ver detalle


          </button>


          </td>



          </tr>


          );


        })

      }


      </tbody>


      </table>


      </div>





      {/* PAGINACION */}

      <div className="
        flex
        justify-between
        items-center
        p-5
        bg-gray-50
        border-t
      ">


      <span className="text-sm text-gray-600">

      {resultadosFiltrados.length}
      resultados encontrados

      </span>




      <div className="flex gap-2">


      <button

      disabled={paginaActual===1}

      onClick={()=>
        setPaginaActual(
          p=>p-1
        )
      }

      className="
        px-3
        py-2
        border
        rounded-lg
      "

      >

      <ChevronLeft/>

      </button>



      <span className="
        px-4
        py-2
        font-bold
      ">

      {paginaActual}/{totalPaginas}

      </span>



      <button

      disabled={
        paginaActual===totalPaginas
      }

      onClick={()=>
        setPaginaActual(
          p=>p+1
        )
      }

      className="
        px-3
        py-2
        border
        rounded-lg
      "

      >

      <ChevronRight/>

      </button>



      </div>


      </div>



      </div>


    </>

  );

}