import React, {useEffect, useState} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import styles from "./panelNavigator.module.css";
import {FiMenu} from "react-icons/fi";
import {IoCloseOutline} from "react-icons/io5";
import {useRouter} from "next/router";

const PanelNavigator = (props) => {
    const router = useRouter();
    const {menuItems, openPanelName, setOpenPanelName} = props;
    const [mobilShowPanelNav, setMobilShowPanelNav] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(null);
    const [subMenuActive, setSubMenuActive] = useState(null);

    useEffect(() => {
        function findItemByComponentName(componentName) {
            for (const item of menuItems) {
                if (item.url === componentName) {
                    setSubMenuOpen(item.id)
                    return item; // componentName'e eşleşen öğeyi döndür
                }
                if (item.submenu) {
                    const subItem = item.submenu.find(sub => sub.url === componentName);
                    if (subItem) {
                        setSubMenuOpen(item.id)
                        setSubMenuActive(subItem.url)
                        return subItem;
                    }
                }
            }
            return null;
        }

        findItemByComponentName(props.slug[0])

    }, []);


    const handleMenuItemClick = (menuItem, index) => {
        setSubMenuOpen(menuItem.id);
        console.log("menuItem-------------------------------", menuItem)
        setSubMenuActive(null);
        if (menuItem?.componentName) {
            setOpenPanelName(menuItem.componentName)
            router.push(menuItem.url)
        }
    };
    const handleSubMenuClick = (subMenuItem, index) => {
        setSubMenuActive(subMenuItem.url)
        if (subMenuItem?.componentName) {
            setOpenPanelName(subMenuItem.componentName)
            router.push(subMenuItem.url)
            console.log(subMenuItem)
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
                                <div onClick={() => handleMenuItemClick(menuItem)}
                                     className={`${styles.sidenav__item__title} ${subMenuOpen === menuItem.id ? styles.active : ""}`}>
                                <span>
                                    <i className={menuItem.icon}></i>
                                </span>
                                    <p>{menuItem.text}</p>
                                </div>
                                <div className={`${styles.sidenav__item__submenu__open} 
                            ${(menuItem.submenu && menuItem.id === subMenuOpen) ? styles.active : ""}`}>
                                    {menuItem.submenu && (
                                        <ul className={styles.sidenav__item__submenu}>
                                            {menuItem.submenu.map((subMenuItem, subIndex) => {

                                                    return <li key={subIndex}
                                                               onClick={() => handleSubMenuClick(subMenuItem, subMenuItem.url)}
                                                               className={`${subMenuItem.url === subMenuActive ? styles.active : null}`}
                                                    >
                                                        {subMenuItem.text}
                                                    </li>
                                                }
                                            )}
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
