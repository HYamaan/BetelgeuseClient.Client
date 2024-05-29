"use client"

import React from 'react';
import Image from "next/image";
import loginPic from "../../../../public/assets/gif/login-security.gif";
import AuthActionButton from "@/components/ui/Button/AuthActionButton";
import {registerSchema} from "@/schema/registerSchema";
import {FaRegEnvelope, FaUserAlt} from "react-icons/fa";
import {BiSolidLockAlt} from "react-icons/bi";
import {useFormik} from "formik";
import styles from "@/pages/auth/authPage.module.css";
import axios from "axios";
import {useRouter} from "next/router";

const RegisterPage = () => {
    const router = useRouter();

    const handleClickLoginPage = () => {
        router.push("/auth/login");
    }
    const onSubmit = async (values, actions) => {
        const registerData = {
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }
        const response = await axios.post(`/api/auth/register`, registerData);
        if (response.status === 200) {
            router.push("/auth/login");
        } else {
            console.error('Giriş başarısız');
        }

    }

    const RegisterFormik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""

        }, onSubmit,
        validationSchema: registerSchema,
    });
    const RegisterInputInfo = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "Enter Your Full Name",
            value: RegisterFormik.values.fullName,
            errorMessage: RegisterFormik.errors.fullName,
            touched: RegisterFormik.touched.fullName,
            icon:<FaUserAlt/>,
            title:"first and lastname"
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Enter Your Email",
            value: RegisterFormik.values.email,
            errorMessage: RegisterFormik.errors.email,
            touched: RegisterFormik.touched.email,
            icon:<FaRegEnvelope/>,
            title:"email"
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Enter Your valid Password",
            value: RegisterFormik.values.password,
            errorMessage: RegisterFormik.errors.password,
            touched: RegisterFormik.touched.password,
            icon:<BiSolidLockAlt/>,
            title:"your email"

        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Enter Your Confirm Password",
            value: RegisterFormik.values.confirmPassword,
            errorMessage: RegisterFormik.errors.confirmPassword,
            touched: RegisterFormik.touched.confirmPassword,
            icon:<BiSolidLockAlt/>,
            title:"confirm passoword"
        }
    ]
    return <>
        <div className={styles.authContainer}>
            <div className={styles.authContainer_Image}>
                <Image
                    src={loginPic}
                    alt="Picture of the author"
                    className={styles.authContainer_Image_Styles}
                />
            </div>
            <div className={styles.authContainer_Input_Boxes}>
                <div className={styles.authContainer_Input_Boxes_Child}>
                    <p className={styles.login_title}>Sign up<span className={styles.login_title_marker}>!</span></p>
                    <p className={styles.login_description}>Explore, learn, and grow with us. enjoy a seamless and enriching educational journey. lets begin!</p>

                    <form onSubmit={RegisterFormik.handleSubmit}>
                        {RegisterInputInfo.map((input) => {
                            return <AuthActionButton
                                key={input.id}
                                {...input}
                                onChange={RegisterFormik.handleChange}
                                onBlur={RegisterFormik.handleBlur}
                            />
                        })}
                        <input type="submit" value="Sign Up" className={styles.button}/>
                    </form>
                    <p className={styles.dont_have_account}>
                        Already you have an account?
                        <span className={styles.login_page_signup} onClick={handleClickLoginPage}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    </>
};

export default RegisterPage;
