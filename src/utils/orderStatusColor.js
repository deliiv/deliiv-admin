export const getBadge = (status) => {
  switch (status) {
    case "delivered":
      return "success";
    case "pickedup":
      return "info";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    case "pickedup":
      return "secondary";
    default:
      return;
  }
};
