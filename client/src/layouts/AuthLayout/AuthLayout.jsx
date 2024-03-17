import { Link, Outlet } from "react-router-dom";
import LogoImg from "../../assets/netflix_logo_transparent.png";
import "./AuthLayout.css";

const AuthLayout = () => {
    return (
        <div className="AuthLayout">
            <header className="AuthLayout__header">
                <nav className="AuthLayout__nav">
                    <Link
                        to="/"
                        className="AuthLayout__logo-a"
                    >
                        <img
                            className="AuthLayout__logo-img"
                            src={LogoImg}
                            alt="Logo"
                        />
                    </Link>
                </nav>
            </header>
            <main className="AuthLayout__main">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout;
