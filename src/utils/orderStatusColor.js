export const getBadge = (status) => {
  switch (status) {
    case "success":
      return "success";
    case "complete":
      return "info";
    case "pending":
      return "warning";
    case "error":
      return "danger";
    case "picked":
      return "secondary";
    default:
      return;
  }
};
