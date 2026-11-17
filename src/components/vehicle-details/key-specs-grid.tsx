interface KeySpecsGridProps {
  specs: {
    battery: string;
    realRange: string;
    chargeTime: string;
    motorPower: string;
  };
}

export function KeySpecsGrid({ specs }: KeySpecsGridProps) {
  const items = [
    { label: "BATTERY", value: specs.battery },
    { label: "REAL RANGE", value: specs.realRange },
    { label: "CHARGE TIME", value: specs.chargeTime },
    { label: "MOTOR POWER", value: specs.motorPower },
  ];

  return (
    <div className="mt-10 sm:mt-12">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Key Technical Specifications
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1628] p-5 shadow-sm transition-colors"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {item.label}
            </p>
            <p className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
