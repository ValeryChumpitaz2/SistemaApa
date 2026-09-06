export default function InfoCard({
  icon: Icon,
  title,
  description,
}) {

  return (

    <div
      className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200/80
        dark:border-slate-800
        rounded-2xl
        p-6
        shadow-sm
      "
    >

      <div
        className="
          w-11
          h-11
          rounded-xl
          bg-[#EEF3FF]
          text-[#1D3681]
          flex
          items-center
          justify-center
          mb-5
        "
      >

        <Icon
          size={21}
          strokeWidth={2.2}
        />

      </div>


      <h3
        className="
          text-lg
          font-black
          text-slate-800
          dark:text-white
        "
      >
        {title}
      </h3>


      <p
        className="
          mt-2
          text-sm
          leading-6
          text-slate-500
          dark:text-slate-400
        "
      >
        {description}
      </p>

    </div>

  );

}
