import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import colors from "../../constants/colors";
import '../../styles/sidebar.css';

const menuAnimation = {
    hidden: {
        opacity: 0,
        height: 0,
        padding: 0,
        transition: { duration: 0.3, when: "afterChildren" },
    },
    show: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 0.3,
            when: "beforeChildren",
        },
    },
};
const menuItemAnimation = {
    hidden: (i) => ({
        padding: 0,
        x: "-100%",
        transition: {
            duration: (i + 1) * 0.1,
        },
    }),
    show: (i) => ({
        x: 0,
        transition: {
            duration: (i + 1) * 0.1,
        },
    }),
};

const SidebarMenu = ({ route, isOpen, setIsOpen, location }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) {
            setIsMenuOpen(false);
        }
    }, [isOpen]);

    return (
        <>
            <div className="menu" onClick={toggleMenu}>
                <ul className="nav-list">
                    <li>
                        <Link to={route.path}>
                            {route.icon}
                            <div className="subrouteName">
                                <span className="links_name">{route.name}</span>
                                <FaAngleDown style={{ width: "1rem", height: "1rem", color: colors.white }} />
                            </div>
                        </Link>
                        <span className="tooltip">{route.name}</span>
                    </li>
                </ul>

            </div>{" "}
            <div>
                {isMenuOpen && (
                    <div
                        className="menu_container"
                    >
                        {route.subRoutes.map((subRoute, i) => (
                            <div key={i}>
                                <ul className="nav-list">
                                    <li style={{ marginLeft: '10%' }}>
                                        <NavLink to={subRoute.path}
                                            style={({ isActive }) => {
                                                return {
                                                    color: isActive && colors.white,
                                                    background: isActive && colors.blue,
                                                };
                                            }}>
                                            {subRoute.icon}
                                            <div className="subrouteName">
                                                <span className="links_name">{subRoute.name}</span>
                                            </div>
                                        </NavLink>
                                        <span className="tooltip">{subRoute.name}</span>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}{" "}
            </div>
        </>
    );
};

export default SidebarMenu;
