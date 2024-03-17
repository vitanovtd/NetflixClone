import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../db/slices/authSlice";

import "./DropdownMenu.css";

const profilesData = [
  {
    id: 0,
    profileName: "Joel",
    profileImg: "https://i.imgur.com/6iIUarA.png",
  },
  {
    id: 1,
    profileName: "John",
    profileImg: "https://i.imgur.com/BU2Bkjf.png",
  },
  {
    id: 2,
    profileName: "Kids",
    profileImg: "https://i.imgur.com/p19PL8P.png",
  },
];


const DropdawnMenu = ({
  profiles = profilesData
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    navigate("/");
  };

  useEffect(() => {
    let handler = (event) => {
      if (
        dropdownRef.current !== event.target &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const accountOptionsData = [
    {
      id: 0,
      buttonTitle: "Manage Profiles",
      buttonIcon: <i className="DropdownMenu__pencil-icon bi bi-pencil"></i>,
      buttonAction: () => console.log("Clicked Manage Profile Button"),
    },
    {
      id: 1,
      buttonTitle: "Transfer Profile",
      buttonIcon: (
        <i className=" DropdownMenu__person-box-icon bi bi-person-bounding-box"></i>
      ),
      buttonAction: () => console.log("Clicked Transfer Profile Button"),
    },
    {
      id: 2,
      buttonTitle: "Account",
      buttonIcon: <i className="DropdownMenu__person-icon bi bi-person"></i>,
      buttonAction: () => console.log("Clicked Account Button"),
    },
    {
      id: 3,
      buttonTitle: "Help Center",
      buttonIcon: (
        <i className="DropdownMenu__question-icon bi bi-question-circle"></i>
      ),
      buttonAction: () => console.log("Clicked Help Center Button"),
    },
    {
      id: 4,
      buttonTitle: (
        <div className="DropdownMenu__sign-out">Sign out of the Netflix</div>
      ),
      buttonAction: () => {
        handleLogout();
      },
    },
  ];
  return (
    <div className="DropdownMenu__main-avatar" ref={dropdownRef}>
      <button className="DropdownMenu__button" onClick={openDropdown}>
        <img
          className="DropdownMenu__main-avatar-img"
          src="https://i.imgur.com/LJ9dB0T.png"
          alt="avatar"
        />

        <i
          className={`DropdownMenu__caret-icon bi bi-caret-${
            isOpen ? "up" : "down"
          }-fill`}
        ></i>
      </button>
      <i
        className={`DropdownMenu__icon-div bi bi-caret-${
          isOpen ? "up" : "down"
        }-fill`}
      ></i>

      {isOpen && (
        <div className="DropdownMenu__menu">
          <ul className="DropdownMenu__profiles">
            {profiles?.map((profile, index) => (
              <li className="DropdownMenu__profile" key={index}>
                <img
                  className="DropdownMenu__profile-img"
                  src={profile.profileImg}
                  alt={profile.profileName}
                />
                <span className="DropdownMenu__profile-name">
                  {profile.profileName}
                </span>
              </li>
            ))}
          </ul>

          <ul className="DropdownMenu__account-options-list">
            {accountOptionsData?.map((option, index) => (
              <li className="DropdownMenu__account-options" key={index}>
                {option.buttonIcon}
                <button
                  className="DropdownMenu__account-options-btn"
                  onClick={option.buttonAction}
                >
                  {option.buttonTitle}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdawnMenu;
