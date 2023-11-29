import React from 'react';
import styles from "./buttons.module.css"
const AuthActionButton = (props) => {
    const {title,placeholder, errorMessage,icon, touched, ...inputs} = props

    return <>
        {title && <p className={styles.auth_button_title}>{title}</p>  }
        <div className={styles.auth_button_box}>
            <div className={styles.auth_button_icon}>
                <i> {icon}</i>
            </div>
            <input
                {...inputs}
                type={inputs.type}
                placeholder={placeholder}
                className={`${styles.auth_button_input}     `}
            />
        </div>
    </>
};

export default AuthActionButton;
