export const emailValidation = email => {
  if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return;
  }
  if (email.trim() === "") {
    return "input-danger";
  }
  return "input-danger";
};

export const passwordValidation = pass => {
  if (pass.trim() === "" || pass.trim().length < 7) {
    return "input-danger";
  }
  return;
};
