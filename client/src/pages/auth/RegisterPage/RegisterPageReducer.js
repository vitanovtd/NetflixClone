import { ENUM_REGISTER_ACTION_TYPES } from "./RegisterPageEnums";

const registerInitialState = {
  status: "INIT", // INIT, LOADING, SUCCESS, ERROR
  serverErrorMessage: "",
  form: {
    fields: {
      email: {
        value: "",
        error: "",
        isTouched: false,
        className: ["RegisterPage__form-input"],
      },
      password: {
        value: "",
        error: "",
        isTouched: false,
        className: ["RegisterPage__form-input"],
      },
      confirmPassword: {
        value: "",
        error: "",
        isTouched: false,
        className: ["RegisterPage__form-input"],
      },
    },
    options: {
      isFormValid: false,
    },
  },
};

const registerReducer = (oldState, action) => {
  if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE) {
    const { field, value } = action.payload;
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    newState.form.fields[field].value = value;
    return newState;
  } else if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED) {
    const { field } = action.payload;
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    newState.form.fields[field].isTouched = true;

    // Add the "was-touched" class if it's not already included
    newState.form.fields[field].className = newState.form.fields[
      field
    ].className.includes("was-touched")
      ? newState.form.fields[field].className
      : [...newState.form.fields[field].className, "was-touched"];

    return newState;
  } else if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR) {
    const { field, error } = action.payload;
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    newState.form.fields[field].error = error;

    // Add the "has-error" class if it's not already included
    newState.form.fields[field].className = newState.form.fields[
      field
    ].className.includes("has-error")
      ? newState.form.fields[field].className
      : [...newState.form.fields[field].className, "has-error"];

    return newState;
  } else if (action.type === ENUM_REGISTER_ACTION_TYPES.CLEAR_FIELD_ERROR) {
    const { field } = action.payload;
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    newState.form.fields[field].error = "";

    // Remove the "has-error" class if it's included
    newState.form.fields[field].className = newState.form.fields[
      field
    ].className.filter((className) => className !== "has-error");

    return newState;
  } else if (action.type === ENUM_REGISTER_ACTION_TYPES.VALIDATED_FORM) {
    const { isFormValid } = action.payload;
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    newState.form.options.isFormValid = isFormValid;
    return newState;
  } else if (action.type === ENUM_REGISTER_ACTION_TYPES.RESET_STATE) {
    return JSON.parse(JSON.stringify(registerInitialState));
  } else if (action.type === ENUM_REGISTER_ACTION_TYPES.SET_STATUS) {
    const { status } = action.payload;
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    newState.status = status;
    return newState;
  } else if (
    action.type === ENUM_REGISTER_ACTION_TYPES.SET_SERVER_ERROR_MESSAGE
  ) {
    const { message } = action.payload;
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    newState.serverErrorMessage = message;
    return newState;
  } else if (
    action.type === ENUM_REGISTER_ACTION_TYPES.CHECK_PASSWORD_CONFIRMATION
  ) {
    const newState = JSON.parse(JSON.stringify(oldState)); // deep copy
    if (
      newState.form.fields.password.value !==
      newState.form.fields.confirmPassword.value
    ) {
      newState.form.fields.confirmPassword.error = "Passwords do not match.";
    }
    return newState;
  }

  return oldState;
};

export default registerReducer;
export { registerInitialState };
