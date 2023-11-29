import React, {useState} from 'react';
import classes from './header.module.css'
import MobilMenu from "@/components/layout/Header/MobilMenu";
import MainNav from "@/components/layout/Header/MainNav";


const Header = () => {
const [versionNavigation,setVersionNavigation]=useState(false);
    const [closeIcon,setCloseIcon]=useState(false);
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
