import React, {useState} from 'react';
import classes from "@/components/layout/Header/header.module.css";
import {GiStripedSun} from "react-icons/gi";
import CategoryList from "@/components/layout/Header/Categories";
import {IoMdSearch} from "react-icons/io";
import Ebook from "@/components/layout/Header/Ebook";
import {LuShoppingCart} from "react-icons/lu";
import ShoppingBasketComponent from "@/components/layout/Header/ShoppingBasket";
import {MdLanguage} from "react-icons/md";
import LanguageComponent from "@/components/layout/Header/Language";
import {BsList} from "react-icons/bs";
import {useRouter} from "next/router";

const MainNav = (props) => {
    const {versionNavigation,setCloseIcon} =props;
    const router = useRouter()
    const [categoriesHover,setCategoriesHover]=useState(null);
    const [ebookHover,setEbookHover]=useState(null);
    const [shoppingBasketHover,setShoppingBasketHover]=useState(null);
    const [languageHover,setLanguageHover]=useState(null);

    return <>
            <div
                onClick={() => router.push('/')}
                className={`${classes.navLogo} ${classes.flex}`}>
                <GiStripedSun className={classes.navLogoSun}/>
                <span>Betelgeuse</span>
            </div>
            <div className={classes.navCategoriesTop}
                 onMouseLeave={() => setCategoriesHover(false)}>
                <div className={classes.navCategories}>
                    <div className="py-8 z-0" onMouseEnter={() => setCategoriesHover(true)}
                    >Categories
                    </div>
                    {categoriesHover && <CategoryList versionNavigation={versionNavigation}/>}
                </div>
            </div>
            <div className={`${classes.navSearch} ${classes.flex}`}>
                <div className={`${classes.navSearchIcon} ${classes.flex}`}>
                    <i><IoMdSearch/></i>
                </div>
                <input
                    type="text"
                    placeholder="Search for anything"
                    className=" border  rounded-full text-gray-900  focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 outline-none"
                />
            </div>
            <div className={classes.navEbookTop}
                 onMouseLeave={() => setEbookHover(false)}>
                <div className={classes.navEbook}>
                    <div className="py-8 z-0" onMouseEnter={() => setEbookHover(true)}>
                        Ebook
                        {ebookHover && <Ebook/>}
                    </div>
                </div>
            </div>
            <div className={classes.navFindTutor}>Find Tutor</div>
            <div className={`${classes.navShoppingBasketTop}`}
                 onMouseLeave={() => {
                     setShoppingBasketHover(null)
                 }}
                 onMouseEnter={() => {
                     setShoppingBasketHover(true)
                 }}>
                <div className={`${classes.navShoppingBasket} ${classes.flex}`}>
                    <span className={classes.navShoppingBasketDropDownCounter}>3</span>
                    <LuShoppingCart/>

                    {shoppingBasketHover && <ShoppingBasketComponent setShoppingBasketHover={setShoppingBasketHover}/>}
                </div>
            </div>

            <div onClick={() => router.push('/auth/login')}
                 className={`${classes.navLogin} ${classes.button}`}>Login
            </div>
            <div onClick={() => router.push('/auth/register')}
                 className={`${classes.navSignUp} ${classes.button}`}>Sign up
            </div>
            <div className={classes.navLanguageTop} onMouseLeave={() => setLanguageHover(false)}>
                <div className={classes.navLanguage}>
                    <div className="p-1 z-0"
                         onMouseEnter={() => setLanguageHover(true)}>
                        <MdLanguage/>
                        {languageHover && <LanguageComponent/>}
                    </div>
                </div>
            </div>
            {/*Mobilde Eklenecek yerler*/}

            <div className={classes.navListIcon}
            onClick={()=>{setCloseIcon(false)}}
            >
                <BsList/>
            </div>
            <div className={classes.mobile_nav_search_icon}>
                <IoMdSearch/>
            </div>
    </>
};

export default MainNav;
