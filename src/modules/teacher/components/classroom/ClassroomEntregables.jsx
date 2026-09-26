import React, {
    useMemo,
} from "react";

import {
    classroomReconocerEntregable,
    classroomObtenerCourseWorkId,
    classroomObtenerTituloActividad,
} from "../../services/classroomService.js";


const ENTREGABLES = [
    {
        codigo: "EN1",
        nombre: "Entregable 1",
        descripcion: "Primer entregable del sprint",
    },
    {
        codigo: "EN2",
        nombre: "Entregable 2",
        descripcion: "Segundo entregable del sprint",
    },
    {
        codigo: "EN3",
        nombre: "Entregable 3",
        descripcion: "Tercer entregable del sprint",
    },
];


export default function ClassroomEntregables({

    actividades = [],

    puntajes = {},

    onEntregableSeleccionado,

}) {

    const entregables = useMemo(() => {

        return ENTREGABLES.map((config) => {

            const actividad =
                actividades.find(
                    (item) =>
                        classroomReconocerEntregable(item) ===
                        config.codigo
                ) || null;


            const puntaje =
                Number(
                    puntajes?.[config.codigo]
                ) || 0;


            return {

                ...config,

                actividad,

                puntaje,

                courseWorkId:
                    actividad
                        ? classroomObtenerCourseWorkId(
                            actividad
                        )
                        : "",

                titulo:
                    actividad
                        ? classroomObtenerTituloActividad(
                            actividad
                        )
                        : config.nombre,

            };

        });

    }, [
        actividades,
        puntajes,
    ]);


    const notaFinal =
        entregables.reduce(
            (total, item) =>
                total + item.puntaje,
            0
        );


    return (

        <div className="mt-6">

            {/* ==================================================
                RESUMEN
            ================================================== */}

            <div
                className="
                    mb-5
                    rounded-2xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    bg-gradient-to-r
                    from-[#EEF3FF]
                    to-white
                    dark:from-slate-800
                    dark:to-slate-900
                    p-5
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-wider
                                text-[#1D3681]
                            "
                        >
                            Evaluación del sprint
                        </p>

                        <h3
                            className="
                                mt-1
                                text-lg
                                font-black
                                text-slate-900
                                dark:text-white
                            "
                        >
                            Entregables
                        </h3>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Cada entregable tiene un valor máximo
                            de 2.00 puntos.
                        </p>

                    </div>


                    {/* NOTA */}

                    <div
                        className="
                            rounded-2xl
                            bg-[#1D3681]
                            px-5
                            py-4
                            text-white
                            shadow-sm
                        "
                    >

                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-blue-200
                            "
                        >
                            Nota acumulada
                        </p>

                        <div
                            className="
                                mt-1
                                flex
                                items-baseline
                                gap-1
                            "
                        >

                            <span
                                className="
                                    text-3xl
                                    font-black
                                "
                            >
                                {notaFinal.toFixed(2)}
                            </span>

                            <span
                                className="
                                    text-sm
                                    font-bold
                                    text-blue-200
                                "
                            >
                                / 6.00
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                ENTREGABLES
            ================================================== */}

            <div
                className="
                    grid
                    gap-4
                    md:grid-cols-3
                "
            >

                {entregables.map(
                    (item) => {

                        const encontrado =
                            Boolean(
                                item.actividad
                            );


                        return (

                            <button
                                key={item.codigo}
                                type="button"
                                disabled={!encontrado}
                                onClick={() => {

                                    if (
                                        typeof onEntregableSeleccionado ===
                                        "function"
                                    ) {

                                        onEntregableSeleccionado(
                                            item
                                        );

                                    }

                                }}
                                className={`
                                    group
                                    text-left
                                    rounded-2xl
                                    border
                                    p-5
                                    transition-all
                                    duration-200

                                    ${
                                        encontrado

                                            ? `
                                                border-slate-200
                                                bg-white
                                                hover:-translate-y-1
                                                hover:border-[#1D3681]
                                                hover:shadow-lg
                                                dark:border-slate-700
                                                dark:bg-slate-800
                                            `

                                            : `
                                                border-slate-200
                                                bg-slate-50
                                                opacity-60
                                                cursor-not-allowed
                                                dark:border-slate-800
                                                dark:bg-slate-900
                                            `
                                    }
                                `}
                            >

                                {/* CABECERA */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
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
                                            bg-[#EEF3FF]
                                            text-sm
                                            font-black
                                            text-[#1D3681]
                                            dark:bg-blue-900/30
                                            dark:text-blue-300
                                        "
                                    >
                                        {item.codigo}
                                    </div>


                                    <div
                                        className="
                                            text-right
                                        "
                                    >

                                        <p
                                            className="
                                                text-[10px]
                                                font-bold
                                                uppercase
                                                text-slate-400
                                            "
                                        >
                                            Puntaje
                                        </p>

                                        <p
                                            className="
                                                text-lg
                                                font-black
                                                text-[#1D3681]
                                                dark:text-blue-300
                                            "
                                        >
                                            {item.puntaje.toFixed(2)}
                                            <span
                                                className="
                                                    text-xs
                                                    text-slate-400
                                                "
                                            >
                                                {" "}
                                                / 2.00
                                            </span>
                                        </p>

                                    </div>

                                </div>


                                {/* INFORMACIÓN */}

                                <div className="mt-4">

                                    <p
                                        className="
                                            text-sm
                                            font-black
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        {item.nombre}
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
                                        {encontrado
                                            ? item.titulo
                                            : "No encontrado en este tema."
                                        }
                                    </p>

                                </div>


                                {/* ESTADO */}

                                <div
                                    className="
                                        mt-5
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <span
                                        className={`
                                            rounded-full
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-bold

                                            ${
                                                encontrado

                                                    ? `
                                                        bg-emerald-50
                                                        text-emerald-700
                                                        dark:bg-emerald-900/20
                                                        dark:text-emerald-300
                                                    `

                                                    : `
                                                        bg-slate-100
                                                        text-slate-500
                                                        dark:bg-slate-800
                                                        dark:text-slate-400
                                                    `
                                            }
                                        `}
                                    >
                                        {encontrado
                                            ? "Disponible"
                                            : "No disponible"
                                        }
                                    </span>


                                    {encontrado && (

                                        <span
                                            className="
                                                text-xs
                                                font-bold
                                                text-[#1D3681]
                                                opacity-0
                                                transition-opacity
                                                group-hover:opacity-100
                                            "
                                        >
                                            Revisar →
                                        </span>

                                    )}

                                </div>

                            </button>

                        );

                    }
                )}

            </div>

        </div>

    );

}
