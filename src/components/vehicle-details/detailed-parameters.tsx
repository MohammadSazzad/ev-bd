interface ParameterSection {
  title: string;
  items: { label: string; value: string }[];
}

interface DetailedParametersProps {
  parameters: {
    performance: { label: string; value: string }[];
    batteryRange: { label: string; value: string }[];
    dimensionsWarranty: { label: string; value: string }[];
  };
}

export function DetailedParameters({ parameters }: DetailedParametersProps) {
  const sections: ParameterSection[] = [
    { title: "Performance", items: parameters.performance },
    { title: "Battery & Range", items: parameters.batteryRange },
    { title: "Dimensions & Warranty", items: parameters.dimensionsWarranty },
  ];

  return (
    <div className="mt-10 sm:mt-12 space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Detailed Parameters
      </h3>

      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] overflow-hidden shadow-sm transition-colors"
          >
            {/* Dark/Light Section Header Bar */}
            <div className="bg-slate-100/80 dark:bg-[#131d33] px-6 py-3.5 border-b border-slate-200 dark:border-slate-800/80">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {section.title}
              </h4>
            </div>

            {/* Parameter Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {section.items.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-6 py-3.5 text-xs sm:text-sm hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                >
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    {row.label}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold text-right pl-4">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
