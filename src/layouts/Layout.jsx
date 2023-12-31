import React from 'react';
import Header from "./../components/layout/Header/Header";
import Footer from "./../components/layout/Footer/Footer";
const Layout = (props) => {
    return <>
        <Header/>
        <main>{props.children}</main>
        <Footer/>
    </>
};
export default Layout;
