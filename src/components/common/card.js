import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function Card({ title, value, trend, dir, sub }) {
  const isUp = dir === "up";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-2 shadow-sm min-w-0">
      <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
        {title}
      </span>

      <span className="text-[26px] font-bold text-slate-900 tracking-tight font-mono">
        {value}
      </span>

      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isUp ? (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor">
              <path d="M4.5 1L8.5 7H0.5z" />
            </svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor">
              <path d="M4.5 8L0.5 2H8.5z" />
            </svg>
          )}
          {trend}
        </span>
        <span className="text-[11px] text-slate-400">{sub}</span>
      </div>
    </div>
  );
}

export default Card;
