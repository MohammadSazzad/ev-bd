export function BrandBadge({ type }: { type: string }) {
  switch (type) {
    case "haval":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-center font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 text-sm italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            HAVAL
          </div>
        </div>
      );
    case "byd":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 text-xs tracking-wider">
            BYD
          </div>
        </div>
      );
    case "mg":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-slate-300 font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 text-sm rotate-45">
            <span className="-rotate-45">MG</span>
          </div>
        </div>
      );
    case "niu":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex flex-col items-center justify-center font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-400 text-sm">
            NIU
          </div>
        </div>
      );
    case "yadea":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-500 text-xs tracking-wider">
            YADEA
          </div>
        </div>
      );
    case "super-soco":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-500 text-[11px] tracking-tight text-center leading-3">
            SUPER<br />SOCO
          </div>
        </div>
      );
    case "tesla":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-slate-200 text-xl tracking-tighter">
            T
          </div>
        </div>
      );
    case "audi":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex -space-x-1.5 items-center justify-center">
            <span className="h-4 w-4 rounded-full border border-slate-300" />
            <span className="h-4 w-4 rounded-full border border-slate-300" />
            <span className="h-4 w-4 rounded-full border border-slate-300" />
            <span className="h-4 w-4 rounded-full border border-slate-300" />
          </div>
        </div>
      );
    case "hyundai":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex h-11 w-13 items-center justify-center rounded-full border border-slate-300 italic font-black text-slate-200 text-lg">
            H
          </div>
        </div>
      );
    case "trek":
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-red-500 text-xs tracking-widest">
            TREK
          </div>
        </div>
      );
    default:
      return (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-700 via-slate-900 to-black p-3.5 border border-slate-600/70 shadow-xl shadow-black/60 group-hover:border-emerald-500/60 transition-all">
          <div className="font-bold text-slate-300 text-xs">EV</div>
        </div>
      );
  }
}
