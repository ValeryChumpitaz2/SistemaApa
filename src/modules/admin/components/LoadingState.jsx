export default function LoadingState({
  message = "Cargando...",
}) {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-16
      "
    >

      <div
        className="
          w-10
          h-10
          border-4
          border-slate-200
          border-t-[#1D3681]
          rounded-full
          animate-spin
        "
      />

      <p
        className="
          mt-4
          text-sm
          font-medium
          text-slate-500
        "
      >
        {message}
      </p>

    </div>

  );

}
