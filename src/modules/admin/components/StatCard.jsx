export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
}) {

  const colors = {

    blue: {
      icon:
        "bg-blue-50 text-[#1D3681] dark:bg-blue-900/30 dark:text-blue-300",
      value:
        "text-[#1D3681] dark:text-blue-300",
    },

    emerald: {
      icon:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",
      value:
        "text-emerald-600 dark:text-emerald-300",
    },

    violet: {
      icon:
        "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300",
      value:
        "text-violet-600 dark:text-violet-300",
    },

    amber: {
      icon:
        "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
      value:
        "text-amber-600 dark:text-amber-300",
    },

  };


  const theme =
    colors[color] ||
    colors.blue;


  return (

    <div
      className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200/80
        dark:border-slate-800
        rounded-2xl
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
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

        <div>

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            {title}
          </p>


          <p
            className={`
              mt-2
              text-3xl
              font-black
              ${theme.value}
            `}
          >
            {value}
          </p>


          <p
            className="
              mt-1
              text-xs
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {description}
          </p>

        </div>


        <div
          className={`
            w-11
            h-11
            shrink-0
            rounded-xl
            flex
            items-center
            justify-center
            ${theme.icon}
          `}
        >

          <Icon
            size={21}
            strokeWidth={2.2}
          />

        </div>

      </div>

    </div>

  );

}
