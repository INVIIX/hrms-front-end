export function formatRupiah(
  value: string | number | readonly string[] | null | undefined
) {
  if (!value) return "";
  const numberString = value.toString().replace(/\D/g, "");
  return "Rp. " + numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
