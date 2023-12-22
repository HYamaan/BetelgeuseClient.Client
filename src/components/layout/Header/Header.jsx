import React, {useState} from 'react';
import classes from './header.module.css'
import dynamic from "next/dynamic";

const MainNav = dynamic(()=> import  ("./MainNav"),{ssr:true});
const MobilMenu = dynamic(()=> import  ("./MobilMenu"),{ssr:true});

const Header = () => {
const versionNavigation= false;
    const [closeIcon,setCloseIcon]=useState(true);
    return <>
        <div className={classes.nav_list_component}>
            <MobilMenu versionNavigation={versionNavigation} closeIcon={closeIcon} setCloseIcon={setCloseIcon}/>
        </div>
        <nav className={`${classes.nav}`}>
            <MainNav versionNavigation={!versionNavigation} setCloseIcon={setCloseIcon}/>
        </nav>
    </>

};
export default Header;
