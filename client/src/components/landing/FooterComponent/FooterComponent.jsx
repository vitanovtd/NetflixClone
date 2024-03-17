import React from "react";
import { Link } from "react-router-dom";

// State Management
import { useSelectLanguage } from "../../../db/slices/i18nSlice/i18nSlice";

// Components
import LanguageSelectComponent from "../LanguageSelectComponent/LanguageSelectComponent";

// Local imports
import "./FooterComponent.css";

function FooterComponent({ handleLanguageChange }) {
    const selectedLanguage = useSelectLanguage();

    return (
        <div className="Footer__div">
            <div>Questions? Call 1-844-505-2993</div>
            <div className="Links__grid">
                <Link to="/faq">FAQ</Link>
                <Link to="/help">Help Center</Link>
                <Link to="/account">Account</Link>
                <Link to="/media">Media Center</Link>
                <Link to="/investor-relations">Investor Relations</Link>
                <Link>Jobs</Link>
                <Link>Netflix Shop</Link>
                <Link>Redeem Gift Cards</Link>
                <Link>Buy Gift Cards</Link>
                <Link>Ways to Watch</Link>
                <Link>Terms of Use</Link>
                <Link>Privacy</Link>
                <Link>Cookie Preferences</Link>
                <Link>Corporate Information</Link>
                <Link>Contact Us</Link>
                <Link>Speed Test</Link>
                <Link>Legal Notices</Link>
                <Link>Only on Netflix</Link>
                <Link>Do Not Sell or Share My Personal Information</Link>
            </div>
            <div className="Language__component">
                <LanguageSelectComponent
                    selectedLanguageKey={selectedLanguage}
                    cbLanguageChange={handleLanguageChange}
                />
            </div>
        </div>
    );
}

export default FooterComponent;
