import {
  ChevronRight,
} from "lucide-react";


// =====================================================
// BOTÓN DE NAVEGACIÓN ADMIN
// =====================================================

export default function AdminNavButton({
  icon: Icon,
  label,
  active = false,
  onClick,
}) {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        text-left
        transition-all
        duration-200
        ${
          active
            ? `
              bg-white
              text-[#1D3681]
              shadow-sm
            `
            : `
              text-blue-100
              hover:bg-white/10
              hover:text-white
            `
        }
      `}
    >

      {active && (
        <span
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            w-1
            h-7
            rounded-r-full
            bg-[#F59E0B]
          "
        />
      )}


      <span
        className={`
          w-9
          h-9
          shrink-0
          rounded-lg
          flex
          items-center
          justify-center
          transition-all
          duration-200
          ${
            active
              ? `
                bg-[#EEF3FF]
                text-[#1D3681]
              `
              : `
                bg-white/5
                text-blue-100
                group-hover:bg-white/10
                group-hover:text-white
              `
          }
        `}
      >

        <Icon
          size={19}
          strokeWidth={2.2}
        />

      </span>


      <span
        className="
          flex-1
          text-sm
          font-bold
        "
      >
        {label}
      </span>


      <ChevronRight
        size={16}
        className={`
          transition-all
          duration-200
          ${
            active
              ? `
                text-[#1D3681]
                opacity-100
              `
              : `
                text-blue-200/50
                opacity-0
                group-hover:opacity-100
                group-hover:translate-x-1
              `
          }
        `}
      />

    </button>
  );
}
