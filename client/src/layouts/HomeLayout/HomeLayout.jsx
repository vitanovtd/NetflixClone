// Libs
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

// State Management
import { userLoggedOut, useSelectUser } from "../../db/slices/authSlice";

// Local imports
import NavbarComponent from "../../components/home/NavbarComponent/NavbarComponent";
import NavbarComponentData from "../../data/home/navbarComponentData.json";
import "./HomeLayout.css";

const HomeLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelectUser();

    const handleLogout = () => {
        dispatch(userLoggedOut());
        navigate("/");
    }

    return (
        <div className="HomeLayout">
            <header className="HomeLayout__header">
                <NavbarComponent
                    navbarData={NavbarComponentData}
                />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    )
}

export default HomeLayout;
