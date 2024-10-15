export default function truncateString(str: string, num = 12) {
  if (str) {
    return str.length > num ? str.slice(0, num) + "..." : str
  }
}
