export default function formatToCurrency(amount: string | number): string {
  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(parsedAmount)) {
    throw new Error("Invalid amount");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parsedAmount);
}
