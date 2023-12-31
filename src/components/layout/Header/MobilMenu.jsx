import React, { useState } from 'react';
import Image from 'next/image';
import styless from './header.module.css';
import Categories from './Categories';

const MobilMenu = (props) => {
    const { versionNavigation, setCloseIcon, closeIcon } = props;
    const [showSubCategoriesForCss, setShowSubCategoriesForCss] = useState(false);

    const handleCloseIconClick = () => {
        setCloseIcon(true);
    };

    return (
        <>
            <div className={`${styless.nav_list} ${closeIcon ? 'hidden' : 'flex'} `}>
                <div className={`${styless.nav_list_menu} ${showSubCategoriesForCss ? 'relative' : ''}`}>
                    <div className={`${styless.nav_list_sub}`}>
                        <div className="p-4 block">
                            <div>Log in</div>
                            <div>Sign up</div>
                        </div>
                        <div className={showSubCategoriesForCss ? styless.mobile_nav_module_category : ''}>
                            <Categories
                                versionNavigation={versionNavigation}
                                closeIcon={closeIcon}
                                setShowSubCategoriesForCss={setShowSubCategoriesForCss}
                                showSubCategoriesForCss={showSubCategoriesForCss}
                            />
                        </div>
                    </div>
                </div>
                <div className={styless.nav_list_close} onClick={handleCloseIconClick}>
                    <Image src="./assets/svg/close-button-x.svg" width={15} height={15} className={styless.icon_close} alt="Close Icon" />
                </div>
            </div>
        </>
    );
};

export default MobilMenu;
