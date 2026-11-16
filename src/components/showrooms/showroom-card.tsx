import { MapPin, Phone, Tag } from "lucide-react";
import { Showroom } from "@/lib/data/showrooms";

interface ShowroomCardProps {
  showroom: Showroom;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function ShowroomCard({
  showroom,
  isSelected = false,
  onSelect,
}: ShowroomCardProps) {
  return (
    <div
      onClick={() => onSelect && onSelect(showroom.id)}
      className={`group relative rounded-2xl border p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-emerald-500 ring-2 ring-emerald-500/30 bg-slate-50 dark:bg-[#111c33] shadow-md"
          : "border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] hover:border-emerald-500/50 hover:bg-slate-50/60 dark:hover:bg-[#101b31] shadow-sm hover:shadow-md"
      }`}
    >
      {/* Title & Distance */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00DF8F] transition-colors">
          {showroom.name}
        </h3>
        <span className="shrink-0 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-[#00DF8F]">
          {showroom.distance}
        </span>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-[#00DF8F]" />
        <span>{showroom.address}</span>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
        <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <a
          href={`tel:${showroom.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="hover:text-emerald-600 dark:hover:text-[#00DF8F] transition-colors"
        >
          {showroom.phone}
        </a>
      </div>

      {/* Brands */}
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
        <Tag className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <span>
          <strong className="text-slate-700 dark:text-slate-300 font-semibold">
            Brands:
          </strong>{" "}
          {showroom.brands}
        </span>
      </div>
    </div>
  );
}
