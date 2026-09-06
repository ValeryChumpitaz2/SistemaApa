// =====================================================
// PÁGINA CURSOS
// ARCHIVO:
// src/modules/admin/pages/Cursos.jsx
// =====================================================

import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Users,
  UserRound,
  Mail,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers3,
  Hash,
  Award,
  RefreshCw,
  BookMarked,
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Brain,
  ShieldCheck,
  Calculator,
  Languages,
  BriefcaseBusiness,
  Lightbulb,
  Boxes,
  Cloud,
  BarChart3,
  FileText,
  HeartHandshake,
  UsersRound,
  ClipboardCheck,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


// =====================================================
// DATOS DE CURSOS
// =====================================================

const CURSOS = [

  // ===================================================
  // 1ER SEMESTRE
  // ===================================================

  {
    semestre: 1,
    id: "AFU",
    docente: "MATOS GUANDO, FATIMA ESTEFANY",
    curso: "ANÁLISIS FUNCIONAL",
    creditos: 3,
    correo: "fmatos@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "HOF",
    docente: "CANALES GUANDO, BENITO JESUS",
    curso: "HERRAMIENTAS OFIMÁTICAS",
    creditos: 3,
    correo: "jcanales@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "PES",
    docente: "CHACON APARCANA, ANGIE DERLYN",
    curso: "PROGRAMACIÓN ESTRUCTURADA",
    creditos: 3,
    correo: "angie.chacon.a@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "AED",
    docente: "MANZO CANDELA, LUIS AQUILINO",
    curso: "ALGORITMOS Y ESTRUCTURA DE DATOS",
    creditos: 3,
    correo: "lmanzo@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "SOV",
    docente: "OCARES LUNA, EBERT BERNARDO",
    curso: "SISTEMAS OPERATIVOS Y VIRTUALIZACION",
    creditos: 3,
    correo: "eocares@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "CEF",
    docente: "PALOMINO SIMON, ERIKA",
    curso: "COMUNICACION EFECTIVA",
    creditos: 2,
    correo: "erika.palomino@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "IEL",
    docente: "RIVERA PEREZ, HEBERT ALONSO",
    curso: "INGLÉS ELEMENTAL",
    creditos: 2,
    correo: "hebert.rivera@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "CDD",
    docente: "MATOS GUANDO, FATIMA ESTEFANY",
    curso: "CREATIVIDAD Y DISRRUPCION DIGITAL",
    creditos: 2,
    correo: "fmatos@vallegrande.edu.pe",
  },

  {
    semestre: 1,
    id: "EF1",
    docente: "TODOS",
    curso: "EXP. FORMATIVAS EN SIT. REALES DE TRABAJO 1",
    creditos: 2,
    correo: "hebert.rivera@vallegrande.edu.pe",
    especial: true,
  },


  // ===================================================
  // 2DO SEMESTRE
  // ===================================================

  {
    semestre: 2,
    id: "DPS",
    docente: "MANZO CANDELA, LUIS AQUILINO",
    curso: "DISEÑO DE PROTOTIPOS DE SOFTWARE",
    creditos: 3,
    correo: "lmanzo@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "DIB",
    docente: "CANALES GUANDO, BENITO JESUS",
    curso: "DISEÑO E IMPLEMENTACIÓN DE BASE DE DATOS",
    creditos: 3,
    correo: "jcanales@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "POO",
    docente: "CHUMPITAZ CAYCHO, VALERY GISELLE",
    curso: "PROGRAMACIÓN ORIENTADA A OBJETOS",
    creditos: 3,
    correo: "valery.chumpitaz@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "TDW",
    docente: "LUYO CARDENAS, JESUS VIDAL",
    curso: "TECNOLOGÍA DIGITAL WEB",
    creditos: 3,
    correo: "jesus.luyoc@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "ISW",
    docente: "OCARES LUNA, EBERT BERNARDO",
    curso: "IMPLEMENTACIÓN DE SERVIDORES WEB",
    creditos: 3,
    correo: "eocares@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "IPT",
    docente: "PALOMINO SIMON, ERIKA MARLENE",
    curso: "INTERPRETACIÓN Y PRODUCCIÓN DE TEXTOS",
    creditos: 2,
    correo: "erika.palomino@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "IBA",
    docente: "RIVERA PEREZ, HEBERT ALONSO",
    curso: "INGLÉS BÁSICO",
    creditos: 2,
    correo: "hebert.rivera@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "ITE",
    docente: "MATOS GUANDO, FATIMA ESTEFANY",
    curso: "INNOVACIÓN TECNOLÓGICA",
    creditos: 2,
    correo: "fmatos@vallegrande.edu.pe",
  },

  {
    semestre: 2,
    id: "EF2",
    docente: "TODOS",
    curso: "EXP. FORMATIVAS EN SIT. REALES DE TRABAJO 2",
    creditos: 2,
    correo: "fmatos@vallegrande.edu.pe",
    especial: true,
  },


  // ===================================================
  // 3ER SEMESTRE
  // ===================================================

  {
    semestre: 3,
    id: "ADS",
    docente: "MANZO CANDELA, LUIS AQUILINO",
    curso: "ANÁLISIS Y DISEÑO DE SISTEMAS",
    creditos: 3,
    correo: "lmanzo@vallegrande.edu.pe",
    idDocente: "LM",
  },

  {
    semestre: 3,
    id: "PBD",
    docente: "CANALES GUANDO, BENITO JESUS",
    curso: "PROGRAMACIÓN DE BASE DE DATOS",
    creditos: 3,
    correo: "jcanales@vallegrande.edu.pe",
    idDocente: "JC",
  },

  {
    semestre: 3,
    id: "TSW",
    docente: "CONDORI JARA, JUAN GABRIEL",
    curso: "TALLERES DE SOFTWARE WEB",
    creditos: 3,
    correo: "juan.condori.jara@vallegrande.edu.pe",
    idDocente: "EO",
  },

  {
    semestre: 3,
    id: "PFE",
    docente: "CHUMPITAZ CAYCHO, VALERY GISELLE",
    curso: "PROGRAMACIÓN FRONT-END",
    creditos: 3,
    correo: "valery.chumpitaz@vallegrande.edu.pe",
    idDocente: "FM",
  },

  {
    semestre: 3,
    id: "RCO",
    docente: "OCARES LUNA, EBERT BERNARDO",
    curso: "REDES Y CONTENEDORES",
    creditos: 3,
    correo: "eocares@vallegrande.edu.pe",
    idDocente: "JA",
  },

  {
    semestre: 3,
    id: "MDI",
    docente: "VARGAS TASAYCO, MIGUEL ANGEL",
    curso: "MATEMÁTICA DISCRETA",
    creditos: 2,
    correo: "mvargas@vallegrande.edu.pe",
    idDocente: "JuC",
  },

  {
    semestre: 3,
    id: "ITE",
    docente: "RIVERA PEREZ, HEBERT ALONSO",
    curso: "INGLÉS TECNICO",
    creditos: 2,
    correo: "hebert.rivera@vallegrande.edu.pe",
    idDocente: "HR",
  },

  {
    semestre: 3,
    id: "PIT",
    docente: "LUYO CARDENAS, JESUS VIDAL",
    curso: "PROTOTIPOS DE INNOVACIÓN TECNOLÓGICA",
    creditos: 2,
    correo: "jesus.luyoc@vallegrande.edu.pe",
    idDocente: "VC",
  },

  {
    semestre: 3,
    id: "EF3",
    docente: "TODOS",
    curso: "EXP. FORMATIVAS EN SIT. REALES DE TRABAJO 3",
    creditos: 2,
    correo: "lmanzo@vallegrande.edu.pe",
    idDocente: "JL",
    especial: true,
  },


  // ===================================================
  // 4TO SEMESTRE
  // ===================================================

  {
    semestre: 4,
    id: "TCC",
    docente: "MANZO CANDELA, LUIS AQUILINO",
    curso: "TALLER DE CLOUD COMPUTING",
    creditos: 3,
    correo: "lmanzo@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "GBD",
    docente: "CANALES GUANDO, BENITO JESUS",
    curso: "GESTION DE BASE DE DATOS",
    creditos: 3,
    correo: "jcanales@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "TSE",
    docente: "CONDORI JARA, JUAN GABRIEL",
    curso: "TALLER DE SOFTWARE EMPRESARIAL",
    creditos: 3,
    correo: "juan.condori.jara@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "DAM",
    docente: "CHUMPITAZ CAYCHO, VALERY GISELLE",
    curso: "DESARROLLO DE APLICACIONES MOVILES",
    creditos: 3,
    correo: "valery.chumpitaz@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "OAS",
    docente: "OCARES LUNA, EBERT BERNARDO",
    curso: "ORQUESTADORES Y AUTOMATIZACION DE SOFTWARE",
    creditos: 3,
    correo: "eocares@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "EDP",
    docente: "VARGAS TASAYCO, MIGUEL ANGEL",
    curso: "ESTADÍSTICA DESCRIPTIVA Y PROBABILIDADES",
    creditos: 2,
    correo: "mvargas@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "IDS",
    docente: "RIVERA PEREZ, HEBERT ALONSO",
    curso: "INGLÉS PARA DESARROLLADOR DE SOFTWARE",
    creditos: 2,
    correo: "hebert.rivera@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "PIT",
    docente: "CHACON APARCANA, ANGIE DERLYN",
    curso: "PROYECTOS DE INNOVACIÓN TECNOLÓGICA",
    creditos: 2,
    correo: "angie.chacon.a@vallegrande.edu.pe",
  },

  {
    semestre: 4,
    id: "EF4",
    docente: "TODOS",
    curso: "EXP. FORMATIVAS EN SIT. REALES DE TRABAJO 4",
    creditos: 2,
    correo: "jcanales@vallegrande.edu.pe",
    especial: true,
  },


  // ===================================================
  // 5TO SEMESTRE
  // ===================================================

  {
    semestre: 5,
    id: "APS",
    docente: "CANALES GUANDO, BENITO JESUS",
    curso: "ADMINISTRACION DE PROYECTOS DE SISTEMAS",
    creditos: 3,
    correo: "jcanales@vallegrande.edu.pe",
    idDocente: "LM",
  },

  {
    semestre: 5,
    id: "TBD",
    docente: "CANALES GUANDO, BENITO JESUS",
    curso: "TALLERES DE BIG DATA",
    creditos: 3,
    correo: "jcanales@vallegrande.edu.pe",
    idDocente: "JC",
  },

  {
    semestre: 5,
    id: "FIA",
    docente: "CONDORI JARA, JUAN GABRIEL",
    curso: "FUNDAMENTOS DE INTELIGENCIA ARTIFICIAL",
    creditos: 3,
    correo: "juan.condori.jara@vallegrande.edu.pe",
    idDocente: "EO",
  },

  {
    semestre: 5,
    id: "SDE",
    docente: "CHUMPITAZ CAYCHO, VALERY GISELLE",
    curso: "SISTEMAS DISTRIBUIDOS Y ESCALABLES",
    creditos: 3,
    correo: "valery.chumpitaz@vallegrande.edu.pe",
    idDocente: "FM",
  },

  {
    semestre: 5,
    id: "FCS",
    docente: "MANZO CANDELA, LUIS AQUILINO",
    curso: "FUNDAMENTOS DE CALIDAD DE SOFTWARE",
    creditos: 3,
    correo: "lmanzo@vallegrande.edu.pe",
    idDocente: "JA",
  },

  {
    semestre: 5,
    id: "EIA",
    docente: "VARGAS TASAYCO, MIGUEL ANGEL",
    curso: "ESTADÍSTICA INFERENCIAL APLICADA",
    creditos: 2,
    correo: "mvargas@vallegrande.edu.pe",
    idDocente: "JuC",
  },

  {
    semestre: 5,
    id: "CII",
    docente: "RIVERA PEREZ, HEBERT ALONSO",
    curso: "COMUNICACIÓN INTERPERSONAL EN INGLÉS",
    creditos: 2,
    correo: "hebert.rivera@vallegrande.edu.pe",
    idDocente: "HR",
  },

  {
    semestre: 5,
    id: "EIT",
    docente: "MATOS GUANDO, FATIMA ESTEFANY",
    curso: "EMPRENDIMIENTO DE INNOVACIÓN TECNOLÓGICA",
    creditos: 2,
    correo: "fmatos@vallegrande.edu.pe",
    idDocente: "VC",
  },

  {
    semestre: 5,
    id: "EF5",
    docente: "TODOS",
    curso: "EXP. FORMATIVAS EN SIT. REALES DE TRABAJO 5",
    creditos: 2,
    correo: "jcanales@vallegrande.edu.pe",
    idDocente: "JL",
    especial: true,
  },


  // ===================================================
  // 6TO SEMESTRE
  // ===================================================

  {
    semestre: 6,
    id: "FCS",
    docente: "MANZO CANDELA, LUIS AQUILINO",
    curso: "FUNDAMENTOS DE CALIDAD DE SOFTWARE",
    creditos: 4.5,
    correo: "lmanzo@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "SID",
    docente: "CONDORI JARA, JUAN GABRIEL",
    curso: "SISTEMAS DISTRIBUIDOS",
    creditos: 4.5,
    correo: "juan.condori.jara@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "PSW",
    docente: "CHUMPITAZ CAYCHO, VALERY GISELLE",
    curso: "PRUEBAS DE SOFTWARE",
    creditos: 4,
    correo: "valery.chumpitaz@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "SER",
    docente: "QUISPE LUYO, JOSÉ LUIS",
    curso: "SEGURIDAD EN REDES",
    creditos: 3,
    correo: "jose.quispe@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "LIL",
    docente: "SABINO JULIAN",
    curso: "LEGISLACION E INSERCION LABORAL",
    creditos: 2,
    correo: "sjulian@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "CEF",
    docente: "PARRA TELLO-MENA, ENZO",
    curso: "CONTABILIDAD Y ESTADOS FINANCIEROS",
    creditos: 1.5,
    correo: "eparra@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "LTE",
    docente: "MATOS GUANDO, FATIMA ESTEFANY",
    curso: "LIDERAZGO Y TRABAJO EN EQUIPO",
    creditos: 1.5,
    correo: "fmatos@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "PCS",
    docente: "ALVARADO SANTILLÁN, RIGOBERTO",
    curso: "PERSONA, CONDUCTA Y SOCIEDAD",
    creditos: 1.5,
    correo: "ralvarado@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "IB6",
    docente: "RIVERA PEREZ, HEBERT ALONSO",
    curso: "INGLES BASICO VI",
    creditos: 0,
    correo: "hebert.rivera@vallegrande.edu.pe",
  },

  {
    semestre: 6,
    id: "EF6",
    docente: "TODOS",
    curso: "EXP. FORMATIVAS EN SIT. REALES DE TRABAJO 6",
    creditos: 2,
    correo: "juan.condori.jara@vallegrande.edu.pe",
    especial: true,
  },

];


// =====================================================
// ICONOS POR CURSO
// =====================================================

function obtenerIconoCurso(id) {

  const iconos = {

    AFU: BookOpen,
    HOF: FileText,
    PES: Code2,
    AED: Boxes,
    SOV: Server,

    CEF: UsersRound,
    IEL: Languages,
    CDD: Sparkles,
    EF1: BriefcaseBusiness,

    DPS: Layers3,
    DIB: Database,
    POO: Code2,
    TDW: Globe,
    ISW: Server,

    IPT: FileText,
    IBA: Languages,
    ITE: Lightbulb,
    EF2: BriefcaseBusiness,

    ADS: Layers3,
    PBD: Database,
    TSW: Globe,
    PFE: Code2,
    RCO: Boxes,

    MDI: Calculator,
    PIT: Lightbulb,
    EF3: BriefcaseBusiness,

    TCC: Cloud,
    GBD: Database,
    TSE: BriefcaseBusiness,
    DAM: Smartphone,
    OAS: RefreshCw,

    EDP: BarChart3,
    IDS: Languages,
    EF4: BriefcaseBusiness,

    APS: ClipboardCheck,
    TBD: Database,
    FIA: Brain,
    SDE: Boxes,
    FCS: Award,

    EIA: BarChart3,
    CII: Languages,
    EIT: Sparkles,
    EF5: BriefcaseBusiness,

    SID: Boxes,
    PSW: ShieldCheck,
    SER: ShieldCheck,
    LIL: BriefcaseBusiness,
    LTE: UsersRound,
    PCS: HeartHandshake,
    IB6: Languages,
    EF6: BriefcaseBusiness,

  };


  return (
    iconos[id] ||
    BookOpen
  );

}


// =====================================================
// COLORES
// =====================================================

const COLORES = [

  {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
    badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
    border: "hover:border-indigo-200 dark:hover:border-indigo-800",
  },

  {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    icon: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
    badge: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
    border: "hover:border-violet-200 dark:hover:border-violet-800",
  },

  {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    border: "hover:border-blue-200 dark:hover:border-blue-800",
  },

  {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    border: "hover:border-emerald-200 dark:hover:border-emerald-800",
  },

  {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    border: "hover:border-amber-200 dark:hover:border-amber-800",
  },

  {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    icon: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400",
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
    border: "hover:border-rose-200 dark:hover:border-rose-800",
  },

];


// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function Cursos() {

  const navigate =
    useNavigate();


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    semestreFiltro,
    setSemestreFiltro,
  ] = useState("TODOS");


  const [
    vista,
    setVista,
  ] = useState("TODOS");


  // ===================================================
  // FILTRAR
  // ===================================================

  const cursosFiltrados =
    useMemo(() => {

      const termino =
        search
          .trim()
          .toLowerCase();


      return CURSOS.filter(
        (curso) => {

          if (
            semestreFiltro !==
            "TODOS"
          ) {

            if (
              curso.semestre !==
              Number(
                semestreFiltro
              )
            ) {

              return false;

            }

          }


          if (
            vista === "REGULARES" &&
            curso.especial
          ) {

            return false;

          }


          if (
            vista === "FORMATIVAS" &&
            !curso.especial
          ) {

            return false;

          }


          if (!termino) {

            return true;

          }


          return [

            curso.id,

            curso.curso,

            curso.docente,

            curso.correo,

          ]
            .join(" ")
            .toLowerCase()
            .includes(
              termino
            );

        }
      );

    }, [
      search,
      semestreFiltro,
      vista,
    ]);


  // ===================================================
  // ESTADÍSTICAS
  // ===================================================

  const totalCursos =
    CURSOS.length;


  const totalCreditos =
    CURSOS.reduce(
      (
        total,
        curso
      ) =>
        total +
        Number(
          curso.creditos
        ),
      0
    );


  const totalDocentes =
    new Set(
      CURSOS
        .filter(
          (curso) =>
            curso.docente !==
            "TODOS"
        )
        .map(
          (curso) =>
            curso.correo
        )
    ).size;


  const cursosFormativos =
    CURSOS.filter(
      (curso) =>
        curso.especial
    ).length;


  // ===================================================
  // SEMESTRES
  // ===================================================

  const semestres = [
    1,
    2,
    3,
    4,
    5,
    6,
  ];


  // ===================================================
  // AGRUPAR
  // ===================================================

  const cursosPorSemestre =
    useMemo(() => {

      const grupos = {};

      cursosFiltrados.forEach(
        (curso) => {

          if (
            !grupos[
              curso.semestre
            ]
          ) {

            grupos[
              curso.semestre
            ] = [];

          }


          grupos[
            curso.semestre
          ].push(
            curso
          );

        }
      );


      return grupos;

    }, [
      cursosFiltrados,
    ]);


  // ===================================================
  // LIMPIAR
  // ===================================================

  function limpiarFiltros() {

    setSearch("");

    setSemestreFiltro(
      "TODOS"
    );

    setVista(
      "TODOS"
    );

  }


  const hayFiltros =
    Boolean(
      search.trim()
    ) ||
    semestreFiltro !==
      "TODOS" ||
    vista !==
      "TODOS";


  // ===================================================
  // RENDER
  // ===================================================

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
            navigate(
              "/admin/dashboard"
            )
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

            <ArrowLeft
              size={16}
            />

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
                border-violet-100
                bg-violet-50
                px-3
                py-1.5
                text-[11px]
                font-black
                uppercase
                tracking-[0.12em]
                text-violet-600
                dark:border-violet-900/50
                dark:bg-violet-950/30
                dark:text-violet-400
              "
            >

              <Sparkles
                size={13}
              />

              Gestión académica

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
              Cursos
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
              Consulta las unidades didácticas,
              docentes responsables y créditos
              correspondientes a cada semestre.
            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
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
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-violet-50
                text-violet-600
                dark:bg-violet-950/40
                dark:text-violet-400
              "
            >

              <GraduationCap
                size={19}
              />

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
                Plan académico
              </p>

              <p
                className="
                  text-sm
                  font-black
                  text-slate-800
                  dark:text-white
                "
              >
                6 semestres
              </p>

            </div>

          </div>

        </div>

      </header>


      {/* =================================================
          ESTADÍSTICAS
      ================================================= */}

      <div
        className="
          mb-6
          grid
          grid-cols-2
          gap-4
          lg:grid-cols-4
        "
      >

        <StatCard
          label="Cursos"
          value={totalCursos}
          description="Unidades didácticas"
          icon={
            <BookOpen
              size={20}
            />
          }
          color="indigo"
        />


        <StatCard
          label="Créditos"
          value={totalCreditos}
          description="Carga académica"
          icon={
            <Award
              size={20}
            />
          }
          color="violet"
        />


        <StatCard
          label="Docentes"
          value={totalDocentes}
          description="Profesores asignados"
          icon={
            <Users
              size={20}
            />
          }
          color="blue"
        />


        <StatCard
          label="Formativas"
          value={cursosFormativos}
          description="Experiencias reales"
          icon={
            <BriefcaseBusiness
              size={20}
            />
          }
          color="emerald"
        />

      </div>


      {/* =================================================
          FILTROS
      ================================================= */}

      <div
        className="
          mb-7
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-[0_4px_20px_rgba(15,23,42,0.04)]
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-3
            lg:grid-cols-[1fr_auto_auto]
          "
        >

          {/* BUSCAR */}

          <div
            className="
              relative
            "
          >

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="
                Buscar curso, código, docente o correo...
              "
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                font-medium
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-violet-300
                focus:bg-white
                focus:ring-4
                focus:ring-violet-500/10
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:focus:border-violet-500
              "
            />

          </div>


          {/* SEMESTRE */}

          <div className="relative">

            <Filter
              size={15}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <select
              value={
                semestreFiltro
              }
              onChange={(event) =>
                setSemestreFiltro(
                  event.target.value
                )
              }
              className="
                h-12
                min-w-52
                appearance-none
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-10
                pr-10
                text-sm
                font-bold
                text-slate-700
                outline-none
                focus:border-violet-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
              "
            >

              <option value="TODOS">
                Todos los semestres
              </option>

              {semestres.map(
                (semestre) => (

                  <option
                    key={semestre}
                    value={semestre}
                  >
                    {semestre}° semestre
                  </option>

                )
              )}

            </select>


            <ChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

          </div>


          {/* TIPO */}

          <div className="relative">

            <Layers3
              size={15}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <select
              value={vista}
              onChange={(event) =>
                setVista(
                  event.target.value
                )
              }
              className="
                h-12
                min-w-48
                appearance-none
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-10
                pr-10
                text-sm
                font-bold
                text-slate-700
                outline-none
                focus:border-violet-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
              "
            >

              <option value="TODOS">
                Todos los cursos
              </option>

              <option value="REGULARES">
                Cursos regulares
              </option>

              <option value="FORMATIVAS">
                Experiencias formativas
              </option>

            </select>


            <ChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

          </div>

        </div>


        {/* CONTADOR */}

        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            gap-2
            text-xs
            font-bold
            text-slate-400
          "
        >

          <BookMarked
            size={14}
          />

          Mostrando

          <span
            className="
              text-slate-700
              dark:text-slate-200
            "
          >
            {cursosFiltrados.length}
          </span>

          de

          <span
            className="
              text-slate-700
              dark:text-slate-200
            "
          >
            {totalCursos}
          </span>

          cursos


          {hayFiltros && (

            <button
              type="button"
              onClick={
                limpiarFiltros
              }
              className="
                ml-2
                rounded-lg
                px-2
                py-1
                text-violet-600
                transition
                hover:bg-violet-50
                dark:text-violet-400
                dark:hover:bg-violet-950/30
              "
            >
              Limpiar filtros
            </button>

          )}

        </div>

      </div>


      {/* =================================================
          CURSOS POR SEMESTRE
      ================================================= */}

      <div
        className="
          space-y-10
        "
      >

        {Object.keys(
          cursosPorSemestre
        )
          .sort(
            (a, b) =>
              Number(a) -
              Number(b)
          )
          .map(
            (semestre) => {

              const cursos =
                cursosPorSemestre[
                  semestre
                ];


              return (

                <section
                  key={semestre}
                >

                  {/* HEADER SEMESTRE */}

                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      justify-between
                      gap-4
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
                          items-center
                          justify-center
                          rounded-2xl
                          bg-slate-900
                          text-white
                          shadow-sm
                          dark:bg-white
                          dark:text-slate-900
                        "
                      >

                        <GraduationCap
                          size={21}
                        />

                      </div>


                      <div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <h2
                            className="
                              text-lg
                              font-black
                              text-slate-900
                              dark:text-white
                            "
                          >
                            {semestre}°
                            semestre
                          </h2>


                          <span
                            className="
                              rounded-full
                              bg-slate-100
                              px-2.5
                              py-1
                              text-[10px]
                              font-black
                              uppercase
                              tracking-wide
                              text-slate-500
                              dark:bg-slate-800
                              dark:text-slate-400
                            "
                          >
                            {cursos.length}{" "}
                            cursos
                          </span>

                        </div>


                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-slate-400
                          "
                        >
                          Unidades didácticas
                          del semestre
                        </p>

                      </div>

                    </div>


                    <div
                      className="
                        hidden
                        items-center
                        gap-1.5
                        text-xs
                        font-bold
                        text-slate-400
                        sm:flex
                      "
                    >

                      <Hash
                        size={14}
                      />

                      Semestre{" "}
                      {semestre}

                    </div>

                  </div>


                  {/* GRID */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-2
                      xl:grid-cols-3
                    "
                  >

                    {cursos.map(
                      (
                        curso,
                        index
                      ) => (

                        <CursoCard
                          key={
                            `${curso.semestre}-${curso.id}-${index}`
                          }
                          curso={
                            curso
                          }
                          index={
                            index
                          }
                        />

                      )
                    )}

                  </div>

                </section>

              );

            }
          )
        }

      </div>


      {/* =================================================
          SIN RESULTADOS
      ================================================= */}

      {cursosFiltrados.length ===
        0 && (

        <div
          className="
            flex
            min-h-80
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-6
            text-center
            dark:border-slate-700
            dark:bg-slate-900
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
              bg-slate-100
              text-slate-500
              dark:bg-slate-800
              dark:text-slate-400
            "
          >

            <BookOpen
              size={27}
            />

          </div>


          <h2
            className="
              mt-5
              text-lg
              font-black
              text-slate-800
              dark:text-white
            "
          >
            No encontramos cursos
          </h2>


          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            Prueba con otro nombre,
            código, docente o semestre.
          </p>


          <button
            type="button"
            onClick={
              limpiarFiltros
            }
            className="
              mt-5
              rounded-xl
              bg-slate-900
              px-5
              py-2.5
              text-xs
              font-black
              text-white
              transition
              hover:bg-slate-800
              dark:bg-white
              dark:text-slate-900
            "
          >
            Limpiar filtros
          </button>

        </div>

      )}

    </section>

  );

}


// =====================================================
// TARJETA CURSO
// =====================================================

function CursoCard({
  curso,
  index,
}) {

  const Icon =
    obtenerIconoCurso(
      curso.id
    );


  const color =
    COLORES[
      index %
      COLORES.length
    ];


  const esFormativa =
    curso.especial;


  return (

    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]
        dark:border-slate-800
        dark:bg-slate-900
        ${color.border}
      `}
    >

      {/* DECORACIÓN */}

      <div
        className={`
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          opacity-70
          blur-2xl
          ${color.bg}
        `}
      />


      {/* HEADER */}

      <div
        className="
          relative
          flex
          items-start
          justify-between
          gap-3
        "
      >

        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${color.icon}
          `}
        >

          <Icon
            size={22}
            strokeWidth={2.2}
          />

        </div>


        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span
            className={`
              rounded-lg
              px-2.5
              py-1
              text-[10px]
              font-black
              tracking-wider
              ${color.badge}
            `}
          >
            {curso.id}
          </span>


          {esFormativa && (

            <span
              className="
                rounded-lg
                bg-amber-50
                px-2.5
                py-1
                text-[10px]
                font-black
                text-amber-700
                dark:bg-amber-950/40
                dark:text-amber-400
              "
            >
              FORMATIVA
            </span>

          )}

        </div>

      </div>


      {/* CURSO */}

      <div
        className="
          relative
          mt-5
        "
      >

        <h3
          className="
            min-h-[3.5rem]
            text-base
            font-black
            leading-6
            text-slate-900
            transition
            group-hover:text-indigo-600
            dark:text-white
            dark:group-hover:text-indigo-400
          "
        >
          {curso.curso}
        </h3>


        <div
          className="
            mt-4
            h-px
            bg-slate-100
            dark:bg-slate-800
          "
        />


        {/* DOCENTE */}

        <div
          className="
            mt-4
            flex
            items-start
            gap-3
          "
        >

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-500
              dark:bg-slate-800
              dark:text-slate-400
            "
          >

            {curso.docente ===
            "TODOS" ? (

              <Users
                size={17}
              />

            ) : (

              <UserRound
                size={17}
              />

            )}

          </div>


          <div
            className="
              min-w-0
            "
          >

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Docente
            </p>


            <p
              className="
                mt-0.5
                line-clamp-2
                text-xs
                font-bold
                leading-5
                text-slate-700
                dark:text-slate-200
              "
            >
              {curso.docente}
            </p>

          </div>

        </div>


        {/* CORREO */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-500
              dark:bg-slate-800
              dark:text-slate-400
            "
          >

            <Mail
              size={16}
            />

          </div>


          <p
            className="
              min-w-0
              truncate
              text-xs
              font-medium
              text-slate-500
              dark:text-slate-400
            "
            title={
              curso.correo
            }
          >
            {curso.correo}
          </p>

        </div>


        {/* FOOTER */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            rounded-xl
            bg-slate-50
            px-3
            py-2.5
            dark:bg-slate-800/70
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-bold
              text-slate-500
              dark:text-slate-400
            "
          >

            <BookOpen
              size={14}
            />

            Unidad didáctica

          </div>


          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-lg
              bg-white
              px-2.5
              py-1.5
              text-xs
              font-black
              text-slate-700
              shadow-sm
              dark:bg-slate-900
              dark:text-slate-200
            "
          >

            <Award
              size={13}
              className="
                text-amber-500
              "
            />

            {curso.creditos}
            {" "}
            {curso.creditos === 1
              ? "crédito"
              : "créditos"}

          </div>

        </div>

      </div>


      {/* FLECHA DECORATIVA */}

      <div
        className="
          absolute
          bottom-5
          right-5
          opacity-0
          transition
          duration-300
          group-hover:translate-x-1
          group-hover:opacity-100
        "
      >

        <ChevronRight
          size={16}
          className="
            text-indigo-500
          "
        />

      </div>

    </article>

  );

}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  label,
  value,
  description,
  icon,
  color,
}) {

  const estilos = {

    indigo: {
      icon:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
      value:
        "text-indigo-600 dark:text-indigo-400",
    },

    violet: {
      icon:
        "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
      value:
        "text-violet-600 dark:text-violet-400",
    },

    blue: {
      icon:
        "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
      value:
        "text-blue-600 dark:text-blue-400",
    },

    emerald: {
      icon:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
      value:
        "text-emerald-600 dark:text-emerald-400",
    },

  };


  const estilo =
    estilos[
      color
    ] ||
    estilos.indigo;


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
          items-start
          justify-between
          gap-3
        "
      >

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
            {label}
          </p>


          <p
            className={`
              mt-2
              text-2xl
              font-black
              tracking-tight
              sm:text-3xl
              ${estilo.value}
            `}
          >
            {value}
          </p>


          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            {description}
          </p>

        </div>


        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${estilo.icon}
          `}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}
