import React from 'react';
import classes from './header.module.css';
const LanguageComponent = () => {
    return <>
        <div className={classes.languageComponent}>
            <div
                className={classes.languageComponentTr}
                onClick={() => handleLanguageClick('tr')}
            >
                TR
            </div>
            <div onClick={() => handleLanguageClick('en')}>EN</div>
        </div>
    </>
};
export default LanguageComponent;
