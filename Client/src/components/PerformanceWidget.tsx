interface Props {
  label?: string;
  value: string;
}

export default function PerformanceWidget({ label, value }: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-[200px] h-[100px] bg-accent-1 rounded-lg bg-bkg-2">
      <h6 className="text-accent-2 text-[18px] font-bold">{label}</h6>
      <p className="text-white text-[18px]">{value}</p>
    </div>
  );
}
