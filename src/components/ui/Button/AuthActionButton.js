import React from 'react';
import styles from "./buttons.module.css"

const AuthActionButton = ({title, placeholder, errorMessage, icon, touched, onChange, onBlur, ...inputs}) => {
    return (
        <>
            {title && <p className={styles.auth_button_title}>{title}</p>}
            <div className={styles.auth_button_box}>
                <div className={styles.auth_button_icon}>{icon}</div>
                <input
                    {...inputs}
                    placeholder={placeholder}
                    className={`${styles.auth_button_input}`}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {touched && errorMessage && <div className={styles.error_message}>{errorMessage}</div>}
            </div>
        </>
    );
};

export default AuthActionButton;
