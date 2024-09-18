import PerformanceWidget from "../../components/PerformanceWidget";

export default function Performance() {
  return (
    <div className="flex flex-col items-center h-full p-4">
      <p className="text-white">Select Account</p>
      <div className="flex items-center justify-start gap-4 w-full">
        <h2 className="text-white">Account : 20240907-1</h2>
      </div>
      <div className="flex justify-between items-center gap-6 w-auto">
        <PerformanceWidget label="Total P&L" value="$5,378.53" />
        <PerformanceWidget label="% Profitable" value="0.61" />
        <PerformanceWidget label="Trade win %" value="0.73" />
      </div>
    </div>
  );
}
