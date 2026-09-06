import {
  AlertTriangle,
  X,
} from "lucide-react";


export default function ConfirmModal({
  open = false,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
}) {

  if (!open) {
    return null;
  }


  return (

    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-5
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-slate-900
          rounded-2xl
          shadow-2xl
          overflow-hidden
        "
      >

        <div
          className="
            p-6
          "
        >

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-amber-50
                text-amber-600
                flex
                items-center
                justify-center
              "
            >

              <AlertTriangle
                size={22}
              />

            </div>


            <button
              type="button"
              onClick={onClose}
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-slate-400
                hover:bg-slate-100
                hover:text-slate-700
              "
            >

              <X
                size={18}
              />

            </button>

          </div>


          <h2
            className="
              mt-5
              text-lg
              font-black
              text-slate-900
              dark:text-white
            "
          >
            {title}
          </h2>


          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            {message}
          </p>

        </div>


        <div
          className="
            px-6
            py-4
            bg-slate-50
            dark:bg-slate-950/50
            flex
            justify-end
            gap-3
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-bold
              text-slate-600
              hover:bg-slate-200
            "
          >
            {cancelText}
          </button>


          <button
            type="button"
            onClick={onConfirm}
            className="
              px-4
              py-2.5
              rounded-xl
              bg-[#1D3681]
              hover:bg-[#172D6D]
              text-white
              text-sm
              font-bold
            "
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>

  );

}
