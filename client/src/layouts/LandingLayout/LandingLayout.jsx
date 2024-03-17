// Libs
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Components
import AccordionContainerComponent from "../../components/landing/Accordion/AccordionContainerComponent/AccordionContainerComponent";
import CTAComponent from "../../components/landing/CTAComponent/CTAComponent";
import LanguageSelectComponent from "../../components/landing/LanguageSelectComponent/LanguageSelectComponent";
import "./LandingLayout.css";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import FooterComponent from "../../components/landing/FooterComponent/FooterComponent";

// State Management
import {
    languageChangedByKey,
    useSelectLanguage,
    useSelectText
} from "../../db/slices/i18nSlice/i18nSlice";

import {
    useSelectUser
} from "../../db/slices/authSlice";

// Data
import accordionComponentData from "../../data/landing/accordionComponentData.json";
import LogoImg from "../../assets/netflix_logo_transparent.png";

const LandingLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedLanguage = useSelectLanguage();
    const { LANDING_LAYOUT_TEXT } = useSelectText();
    const user = useSelectUser();

    const handleClick = () => {
        navigate("/auth/login");
    }

    const handleSubmit = (email) => {
        navigate("/auth/register", {
            replace: true,
            state: {
                email: email
            }
        });
    }

    const handleLanguageChange = (selectedKey) => {
        dispatch(languageChangedByKey({
            key: selectedKey
        }));
    }

    useEffect(() => {
        if (user.isLoggedIn) {
            navigate("/browse");
        }
    }, []);

    return (
        <div className="LandingLayout">
            <header className="LandingLayout__header">
                <nav className="LandingLayout__nav">
                    <Link
                        to="/"
                        className="LandingLayout__logo-a"
                    >
                        <img className="LandingLayout__logo-img" src={LogoImg} alt="Logo" />
                    </Link>
                    <div className="LandingLayout__nav-item2">
                        <LanguageSelectComponent
                            selectedLanguageKey={selectedLanguage}
                            cbLanguageChange={handleLanguageChange}
                        />
                        <BasicButton
                            label={LANDING_LAYOUT_TEXT.BasicButtonLabel}
                            onClick={handleClick}
                        />
                    </div>
                </nav>
                <div className="LandingLayout__hero">
                    <div className="LandingLayout__hero-gradient"></div>
                    <div className="LandingLayout__hero-content">
                        <h1>{LANDING_LAYOUT_TEXT.H1}</h1>
                        <h2>{LANDING_LAYOUT_TEXT.H2}</h2>
                        <CTAComponent
                            label={LANDING_LAYOUT_TEXT.H3}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </header>
            <main className="LandingLayout__main">
                <Outlet />
            </main>
            <footer className="LandingLayout__footer">
                <div className="LandingLayout__footer-accordion">
                    <AccordionContainerComponent
                        accordionData={accordionComponentData}
                    />
                </div>
                <div className="LandingLayout__footer-CTA-wrapper">
                    <CTAComponent
                        label="Ready to watch? Enter your email to create or restart your membership."
                        onSubmit={handleSubmit}
                    />
                </div>
                <div className="LandingLayout__footer-component">
                    <FooterComponent
                        handleLanguageChange={handleLanguageChange}
                    />
                </div>
            </footer>
        </div>
    );
};

export default LandingLayout;
