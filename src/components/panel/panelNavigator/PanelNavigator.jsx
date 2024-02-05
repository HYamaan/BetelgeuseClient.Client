import React, {useState} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import styles from "./panelNavigator.module.css";
import {FiMenu} from "react-icons/fi";
import {IoCloseOutline} from "react-icons/io5";

const PanelNavigator = (props) => {
    const {menuItems, openPanelName, setOpenPanelName} = props;
    const [mobilShowPanelNav, setMobilShowPanelNav] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(0);
    const [subMenuActive, setSubMenuActive] = useState(null);

    const handleMenuItemClick = (menuItem, index) => {
        setSubMenuOpen(index)
        setSubMenuActive(null);
        if (menuItem?.componentName) {
            setOpenPanelName(menuItem.componentName)
        }
    };
    const handleSubMenuClick = (subMenuItem, index) => {
        setSubMenuActive(index)
        if (subMenuItem?.componentName) {
            setOpenPanelName(subMenuItem.componentName)
        }
    }

    return <>
        <div className={styles.panel__nav__mobil}>
            <div className={styles.userInformation_mobil}>
                <LazyLoadImage src={`assets/image/instructor/demo_instructor.jpg`}
                               alt="demo_instructor.jpg"
                               className={styles.userInformation__image_mobil}

                />
                <p className={styles.userInformation__title_mobil}>Cameron Schofield</p>
            </div>
            <div className={styles.userInformation__menu_mobil}
                 onClick={() => setMobilShowPanelNav(true)}>
                <FiMenu/>
                <span className={styles.userInformation__menu__title_mobil}>Menu</span>
            </div>
        </div>
        <div className={`${styles.panel__nav} ${mobilShowPanelNav ? styles.panel__nav__show_mobil : ""}`}>
            <div className={styles.exit} onClick={() => setMobilShowPanelNav(false)}><IoCloseOutline/></div>
            <div className={styles.userInformation}>
                <LazyLoadImage src={`assets/image/instructor/demo_instructor.jpg`}
                               alt="demo_instructor.jpg"
                               className={styles.userInformation__image}

                />
                <p className={styles.userInformation__title}>Cameron Schofield</p>
            </div>
            <div className={styles.userCourse__count}>
                <p>
                    <span className={styles.userCourse__count_number}>0</span>
                    <span className={styles.userCourse__count_title}>Courses</span>
                </p>
                <p>
                    <span className={styles.userCourse__count_number}>0</span>
                    <span className={styles.userCourse__count_title}>Following</span>
                </p>
            </div>
            <div className={styles.side__nav__section}>
                <ul>
                    {menuItems.map((menuItem, index) => {
                        return (
                            <li key={index} className={`${styles.sidenav__item} `}>
                                <div onClick={() => handleMenuItemClick(menuItem, index)}
                                     className={`${styles.sidenav__item__title} ${subMenuOpen === index ? styles.active : ""}`}>
                                <span>
                                    <i className={menuItem.icon}></i>
                                </span>
                                    <p>{menuItem.text}</p>
                                </div>
                                <div className={`${styles.sidenav__item__submenu__open} 
                            ${(menuItem.submenu && index === subMenuOpen) ? styles.active : ""}`}>
                                    {menuItem.submenu && (
                                        <ul className={styles.sidenav__item__submenu}>
                                            {menuItem.submenu.map((subMenuItem, subIndex) => (
                                                <li key={subIndex}
                                                    onClick={() => handleSubMenuClick(subMenuItem, subIndex)}
                                                    className={`${subIndex === subMenuActive ? styles.active : null}`}
                                                >
                                                    {subMenuItem.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    </>
};

export default PanelNavigator;
