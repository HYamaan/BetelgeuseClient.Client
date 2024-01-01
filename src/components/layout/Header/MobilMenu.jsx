import React, { useState } from 'react';
import Image from 'next/image';
import styles from './header.module.css';

const MobileMenu = (props) => {
    const { versionNavigation, setCloseIcon, closeIcon } = props;
    const [showSubCategoriesForCss, setShowSubCategoriesForCss] = useState(false);

    const handleCloseIconClick = () => {
        setCloseIcon(true);
    };

    return (
        <div className={`${styles.nav_list} ${closeIcon ? styles.hidden : styles.flex}`}>
            <div className={`${styles.nav_list_menu} ${showSubCategoriesForCss ? styles.relative : ''}`}>
                <div className={styles.nav_list_sub}>
                    <div className="p-4 block">
                        <div>Log in</div>
                        <div>Sign up</div>
                    </div>
                    <div className={showSubCategoriesForCss ? styles.mobile_nav_module_category : ''}>
                        {/* Include your Categories component here */}
                    </div>
                </div>
            </div>
            <div className={styles.nav_list_close} onClick={handleCloseIconClick}>
                <Image src="/assets/svg/close-button-x.svg" width={15} height={15} className={styles.icon_close} alt="Close Icon" />
            </div>
        </div>
    );
};

export default MobileMenu;
