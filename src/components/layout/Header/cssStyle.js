import {useEffect} from "react";

export const NavbarStyle=(hover)=>{
    return {
        opacity: hover ? 1 : 0,
        visibility: hover ? 'visible' : 'hidden',
        transition: 'opacity 0.35s ease, visibility 0.35s ease',
    };
}
export const NavbarCssStyleUseEffect=(setStyle,hover)=>{
    //CSS
    useEffect(()=>{
        setStyle(NavbarStyle(hover));
    },[hover]);
}
