export function getColorByStatus(status: string) {
  switch (status) {
    case "C":
      return "gray";
    case "R":
      return "red";
    case "A":
      return "green";
    default:
      return "gray";
  }
}
