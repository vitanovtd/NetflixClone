//Libs
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import SearchBox from "../SearchBox/SearchBox";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

//Image import
import LogoImg from "../../../assets/netflix_logo_transparent.png";

//Local imports
import "./NavbarComponent.css";

const NavbarComponent = ({ navbarData }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState(false);
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const submitSearch = (searchText) => {
        console.log(searchText);
    };

    const checkScroll = () => {
        if (window.scrollY >= 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const toggleDropdown = () => {
        setDropdownMenu(!dropdownMenu)
    };

    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
        }
    }, []);
    return (
        <div className={`Navbar__main ${isScrolled ? "scrolled" : ""}`}>
            <div className="Navbar__header-wrapper">
                <div className="Navbar__navigation">
                    <Link to="/browse" className="Navbar__logo-a">
                        <img className="Navbar__logo-img" src={LogoImg} alt="Logo" />
                    </Link>

                    <div className="Navbar__dropdown-menu">
                        <button onClick={toggleDropdown}>
                            Options ☰
                        </button>

                        {dropdownMenu &&
                            <div className="Navbar__dropdown">
                                {navbarData.map((link) => (
                                    <Link
                                        key={link.id}
                                        to={link.route}
                                        className={`Navbar__link ${link.id === activeLink ? "active" : ""}`}
                                        onClick={() => setActiveLink(link.id)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        }
                    </div>
                    <nav>
                        <ul className="Navbar__items">
                            {navbarData.map((link) => (
                                <li key={link.id}>
                                    <Link to={link.route}
                                        className={`Navbar__link ${link.id === activeLink ? "active" : ""}`}
                                        onClick={() => setActiveLink(link.id)}
                                    >{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="Navbar__user">
                    
                    <SearchBox
                        placeholder={'Titles, people, genres'}
                        submitSearch={submitSearch}
                    />
                    <Link
                        to={"/kids"}
                        className="Navbar__link-user"
                    >
                        Kids
                    </Link>
                    <i className="bi bi-bell-fill"></i>
                    <DropdownMenu />
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent;
