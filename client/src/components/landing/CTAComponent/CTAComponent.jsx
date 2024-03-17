import { useState, useEffect } from "react";
import "./CTAComponent.css";

const CTAComponent = ({ label, onSubmit }) => {
    const [classNames, setClassNames] = useState({
        "CTAComponent__form-input": ["CTAComponent__form-input"]
    });
    const [email, setEmail] = useState("");
    const [isEmailDirty, setIsEmailDirty] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleChangeEmail = (e) => {
        if (!isEmailDirty) {
            setIsEmailDirty(true);
        }

        const newEmail = e.currentTarget.value;
        setEmail(newEmail);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email);
    }

    useEffect(() => {
        if (!isEmailDirty) {
            return;
        }

        const emailRegex = /^(.+)@(.+)$/;
        if (!emailRegex.test(email)) {
            setClassNames((prevClassNames) => {
                return {
                    ...prevClassNames,
                    "CTAComponent__form-input": ["CTAComponent__form-input", "error"]
                }
            });
            return;
        }

        setIsEmailValid(true);
        setClassNames((prevClassNames) => {
            return {
                ...prevClassNames,
                "CTAComponent__form-input": ["CTAComponent__form-input", "success"]
            }
        });
    }, [email]);

    return (
        <div className="CTAComponent">
            <p>{label}</p>
            <form
                className="CTAComponent__form"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="CTAComponent__form-control">
                    <input
                        id="email"
                        className={classNames["CTAComponent__form-input"].join(" ")}
                        name="email"
                        type="text"
                        value={email}
                        onChange={handleChangeEmail}
                        required={true}
                        autoComplete="off"
                    />
                    <label
                        htmlFor="email"
                        className="CTAComponent__form-label"
                    >
                        Email address
                    </label>
                </div>
                <button
                    className="CTAComponent__btn"
                    disabled={!isEmailValid}
                >
                    Get Started
                    <i className="CTAComponent__btn-icon bi bi-chevron-right"></i>
                </button>
            </form>
        </div>
    )
}

export default CTAComponent;
