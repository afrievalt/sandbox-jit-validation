export default (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "*Required"; // * = suppress until meata.past is true
  }
  if (!values.lastName) {
    errors.lastName = "*Required";
  }
  if (!values.street) {
    errors.street = "*Required";
  }
  if (!values.age) {
    errors.age = "*Required";
  } else if (isNaN(values.age)) {
    errors.age = "Must be a number"; // Show right away.
  } else if (values.age < 18) {
    errors.age = "-Must be over 18"; // - = suppress until meta.touched is true
  } else if (values.age > 120) {
    errors.age = "No one is that old";
  }
  return errors;
};
