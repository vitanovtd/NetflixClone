// Libs
import { useReducer, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Utils
import { isEmailValid, isPasswordValid } from "../../../utils/auth";
import { wait } from "../../../utils/shared";

// Local imports
import registerReducer, { registerInitialState } from "./RegisterPageReducer";
import { ENUM_REGISTER_ACTION_TYPES } from "./RegisterPageEnums";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    registerInitialState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1. Prepare data
    const payload = {
      email: registerState.form.fields.email.value,
      password: registerState.form.fields.password.value,
      confirmPassword: registerState.form.fields.confirmPassword.value,
    };

    //Passwords validation
    registerDispatch({
      type: ENUM_REGISTER_ACTION_TYPES.CHECK_PASSWORD_CONFIRMATION,
    });

    //Break if passwords don't match
    if (payload.password != payload.confirmPassword) {
      return;
    }

    // Step 2. Send POST request to BE
    let data = null;
    try {
      registerDispatch({
        type:  ENUM_REGISTER_ACTION_TYPES.SET_STATUS,
        payload: {
          status: "LOADING",
        },
      });

      //Remove later
      await wait(700);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        let error = await response.json();
        throw Error(error.message);
      }
      data = await response.json();
      registerDispatch({
        type:  ENUM_REGISTER_ACTION_TYPES.SET_STATUS,
        payload: {
          status: "SUCCESS",
        },
      });
    } catch (error) {
      registerDispatch({
        type:  ENUM_REGISTER_ACTION_TYPES.SET_STATUS,
        payload: {
          status: "ERROR",
        },
      });
      registerDispatch({
        type: ENUM_REGISTER_ACTION_TYPES.SET_SERVER_ERROR_MESSAGE,
        payload: {
          message: error.message,
        },
      });
      return;
    }

    //Remove later
    await wait(500);

    // Step 3. Navigate to login page
    registerDispatch({ type: ENUM_REGISTER_ACTION_TYPES.RESET_STATE });
    navigate("/auth/login");
  };

  const validateFields = () => {
    let fields = {
      email: {
        isValid: false,
      },
      password: {
        isValid: false,
      },
      confirmPassword: {
        isValid: false,
      },
    };
    let isFormValid = false;

    for (const field in fields) {
      const value = registerState.form.fields[field].value;
      if (value.length <= 0) {
        registerDispatch({
          type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
          payload: {
            field: field,
            error: "Field cannot be empty",
          },
        });
      } else if (field === "email" && !isEmailValid(value)) {
        registerDispatch({
          type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
          payload: {
            field: field,
            error: "Email address is not valid",
          },
        });
      } else if (
        (field === "password" || field === "confirmPassword") &&
        !isPasswordValid(value)
      ) {
        registerDispatch({
          type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_ERROR,
          payload: {
            field: field,
            error:
              "Password must be between 6 and 60 characters and may not contain a tilde (~)",
          },
        });
      } else {
        fields[field].isValid = true;
        registerDispatch({
          type: ENUM_REGISTER_ACTION_TYPES.CLEAR_FIELD_ERROR,
          payload: {
            field: field,
          },
        });
      }
    }

    if (
      fields.email.isValid &&
      fields.password.isValid &&
      fields.confirmPassword.isValid
    ) {
      isFormValid = true;
    }

    registerDispatch({
      type: ENUM_REGISTER_ACTION_TYPES.VALIDATED_FORM,
      payload: {
        isFormValid: isFormValid,
      },
    });
  };

  useEffect(() => {
    validateFields();
  }, [
    registerState.form.fields.email.value,
    registerState.form.fields.password.value,
    registerState.form.fields.confirmPassword.value,
  ]);

  useEffect(() => {
    if (location.state === null) {
        return;
    }
    const { email } = location.state;
    registerDispatch({
        type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
        payload: {
          field: "email",
          value: email,
        },
      });
  }, [location]);

  return (
    <div className="RegisterPage">
      <div className="RegisterPage__form-wrapper">
        <h1>Sign Up</h1>
        {registerState.status === "ERROR" && (
          <div className="RegisterPage__form-error-container">
            {registerState.serverErrorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="RegisterPage__form-input-wrapper">
            <input
              className={registerState.form.fields["email"].className.join(" ")}
              name="email"
              type="text"
              placeholder="Email"
              value={registerState.form.fields.email.value}
              onChange={(e) => {
                const { name, value } = e.currentTarget;
                registerDispatch({
                  type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
                  payload: {
                    field: name,
                    value: value,
                  },
                });
                if (!registerState.form.fields[name].isTouched) {
                  registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                    payload: {
                      field: name,
                    },
                  });
                }
              }}
              onBlur={(e) => {
                const { name } = e.currentTarget;
                if (!registerState.form.fields[name].isTouched) {
                  registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                    payload: {
                      field: name,
                    },
                  });
                }
              }}
            />
            {registerState.form.fields.email.error.length > 0 &&
              registerState.form.fields.email.isTouched && (
                <p className="RegisterPage__form-error">
                  {" "}
                  {registerState.form.fields.email.error}
                </p>
              )}
          </div>
          <div className="RegisterPage__form-input-wrapper">
            <input
              className={registerState.form.fields["password"].className.join(
                " "
              )}
              name="password"
              type="password"
              placeholder="Password"
              value={registerState.form.fields.password.value}
              onChange={(e) => {
                const { name, value } = e.currentTarget;
                registerDispatch({
                  type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
                  payload: {
                    field: name,
                    value: value,
                  },
                });
                if (!registerState.form.fields[name].isTouched) {
                  registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                    payload: {
                      field: name,
                    },
                  });
                }
              }}
              onBlur={(e) => {
                const { name } = e.currentTarget;
                if (!registerState.form.fields[name].isTouched) {
                  registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                    payload: {
                      field: name,
                    },
                  });
                }
              }}
            />
            {registerState.form.fields.password.error.length > 0 &&
              registerState.form.fields.password.isTouched && (
                <p className="RegisterPage__form-error">
                  {" "}
                  {registerState.form.fields.password.error}
                </p>
              )}
          </div>
          <div className="RegisterPage__form-input-wrapper">
            <input
              className="RegisterPage__form-input"
              name="confirmPassword"
              type="password"
              placeholder="Password again"
              value={registerState.form.fields.confirmPassword.value}
              onChange={(e) => {
                const { name, value } = e.currentTarget;
                registerDispatch({
                  type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_VALUE,
                  payload: {
                    field: name,
                    value: value,
                  },
                });
                if (!registerState.form.fields[name].isTouched) {
                  registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                    payload: {
                      field: name,
                    },
                  });
                }
              }}
              onBlur={(e) => {
                const { name } = e.currentTarget;
                if (!registerState.form.fields[name].isTouched) {
                  registerDispatch({
                    type: ENUM_REGISTER_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                    payload: {
                      field: name,
                    },
                  });
                }
              }}
            />
            {registerState.form.fields.confirmPassword.error.length > 0 &&
              registerState.form.fields.confirmPassword.isTouched && (
                <p className="RegisterPage__form-error">
                  {registerState.form.fields.confirmPassword.error}
                </p>
              )}
          </div>
          <button
            className="RegisterPage__btn"
            disabled={!registerState.form.options.isFormValid}
          >
            Register
          </button>

          <div className="RegisterPage__checkbox-wrapper">
            <div>
              <input id="checkbox" name="checkbox" type="checkbox" />
              <label htmlFor="checkbox">I agree to Terms of Service</label>
            </div>
            <Link to="/">Learn more.</Link>
          </div>

          <div className="RegisterPage__others-wrapper">
            <p>
              Already have an account? <Link to="/auth/login">Sign in now</Link>
            </p>
          </div>
        </form>

        <div className="RegisterPage__status">
          {registerState.status === "LOADING" && (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          )}
          {registerState.status === "SUCCESS" && (
            <i className="RegisterPage__status-success bi bi-check-circle"></i>
          )}
          {registerState.status === "ERROR" && (
            <i className="RegisterPage__status-error bi bi-exclamation-triangle"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
