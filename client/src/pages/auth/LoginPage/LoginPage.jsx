// Libs
import { useReducer, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// DB, State Management
import { userLoggedIn } from "../../../db/slices/authSlice";

// Utils
import { isEmailValid, isPasswordValid } from "../../../utils/auth";
import { wait } from "../../../utils/shared";

// Local imports
import loginReducer, { loginInitialState } from "./LoginPageReducer";
import { ENUM_LOGIN_ACTION_TYPES } from "./LoginPageEnums";
import "./LoginPage.css";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1. Prepare data
        const payload = {
            email: loginState.form.fields.email.value,
            password: loginState.form.fields.password.value
        }
        
        // Step 2. Send POST request BE
        let data = null;
        try {
            loginDispatch({
                type: "SET_STATUS",
                payload: {
                    status: "LOADING"
                }
            });
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                let error = await response.json();
                throw Error(error.message);
            }
            
            data = await response.json();
            loginDispatch({
                type: "SET_STATUS",
                payload: {
                    status: "SUCCESS"
                }
            });
        } catch (error) {
            loginDispatch({
                type: "SET_STATUS",
                payload: {
                    status: "ERROR"
                }
            });
            loginDispatch({
                type: "SET_SERVER_ERROR_MESSAGE",
                payload: {
                    message: error.message
                }
            });
        }

        // Step 3. Save user in FE state
        dispatch(userLoggedIn({
            email: payload.email,
            token: data.token
        }));

        // Step 4. Navigate to home module
        await wait(500);
        loginDispatch({ type: ENUM_LOGIN_ACTION_TYPES.RESET_STATE });
        navigate("/browse");
    }

    const validateFields = () => {
        let fields = {
            email: {
                isValid: false
            },
            password: {
                isValid: false
            }
        }
        let isFormValid = false;

        for (const field in fields) {
            const value = loginState.form.fields[field].value;
            if (value.length <= 0) {
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Field cannot be empty"
                    }
                });
            } else if (field === "email" && !isEmailValid(value)) {
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Email address is not valid"
                    }
                });
            } else if (field === "password" && !isPasswordValid(value)) {
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_ERROR,
                    payload: {
                        field: field,
                        error: "Password must be between 6 and 60 characters and may not contain a tilde (~)"
                    }
                });
            } else {
                fields[field].isValid = true;
                loginDispatch({
                    type: ENUM_LOGIN_ACTION_TYPES.CLEAR_FIELD_ERROR,
                    payload: {
                        field: field
                    }
                });
            }
        }

        if (fields.email.isValid && fields.password.isValid) {
            isFormValid = true;
        }

        loginDispatch({
            type: ENUM_LOGIN_ACTION_TYPES.VALIDATED_FORM,
            payload: {
                isFormValid: isFormValid
            }
        });
    }

    useEffect(() => {
        validateFields();
    }, [
        loginState.form.fields.email.value,
        loginState.form.fields.password.value
    ]);

    return (
        <div className="LoginPage">
            <div className="LoginPage__form-wrapper">
                <h1>Sign In</h1>
                {loginState.status === "ERROR" && (
                    <div className="LoginPage__form-error-container">
                        {loginState.serverErrorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="LoginPage__form-input-wrapper">
                        <input
                            className={loginState.form.fields["email"].className.join(" ")}
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={loginState.form.fields.email.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                loginDispatch({
                                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_VALUE,
                                    payload: {
                                        field: name,
                                        value: value
                                    }
                                });
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name
                                        }
                                    });
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name
                                        }
                                    });
                                }
                            }}
                        />
                        {loginState.form.fields.email.error.length > 0 && loginState.form.fields.email.isTouched && (
                            <p className="LoginPage__form-error">
                                {loginState.form.fields.email.error}
                            </p>
                        )}
                    </div>
                    <div className="LoginPage__form-input-wrapper">
                        <input
                            className={loginState.form.fields["password"].className.join(" ")}
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={loginState.form.fields.password.value}
                            onChange={(e) => {
                                const { name, value } = e.currentTarget;
                                loginDispatch({
                                    type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_VALUE,
                                    payload: {
                                        field: name,
                                        value: value
                                    }
                                });
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name
                                        }
                                    });
                                }
                            }}
                            onBlur={(e) => {
                                const { name } = e.currentTarget;
                                if (!loginState.form.fields[name].isTouched) {
                                    loginDispatch({
                                        type: ENUM_LOGIN_ACTION_TYPES.SET_FIELD_IS_TOUCHED,
                                        payload: {
                                            field: name
                                        }
                                    });
                                }
                            }}
                        />
                        {loginState.form.fields.password.error.length > 0 && loginState.form.fields.password.isTouched && (
                            <p className="LoginPage__form-error">
                                {loginState.form.fields.password.error}
                            </p>
                        )}
                    </div>
                    <button
                        className="LoginPage__btn"
                        disabled={!loginState.form.options.isFormValid}
                    >
                        Sign In
                    </button>

                    <div className="LoginPage__checkbox-wrapper">
                        <div>
                            <input id="checkbox" name="checkbox" type="checkbox" />
                            <label htmlFor="checkbox">Remember me</label>
                        </div>
                        <Link to="/">Need help?</Link>
                    </div>

                    <div className="LoginPage__others-wrapper">
                        <p>New to netflix? <Link to="/auth/register">Sign up now</Link></p>
                    </div>
                </form>

                <div className="LoginPage__status">
                    {loginState.status === "LOADING" && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
                    {loginState.status === "SUCCESS" && (
                        <i className="LoginPage__status-success bi bi-check-circle"></i>
                    )}
                    {loginState.status === "ERROR" && (
                        <i className="LoginPage__status-error bi bi-exclamation-triangle"></i>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
