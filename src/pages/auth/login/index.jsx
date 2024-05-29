import styles from "./../authPage.module.css"
import React from 'react';
import Image from 'next/image'
import loginPic from "../../../../public/assets/gif/login-security.gif"
import AuthActionButton from "@/components/ui/Button/AuthActionButton";
import {FaUserAlt} from "react-icons/fa";
import {BiSolidLockAlt} from "react-icons/bi";
import {loginSchema} from "@/schema/loginSchema";
import {useFormik} from "formik";
import axios from "axios";
import {useRouter} from "next/router";
import {fetchPanelNavigation} from "@/lib/fetch";


const LoginPage = () => {
    const router = useRouter();
    const handleClickForgotPassword = () => {
        router.push("/auth/forgot-password");
    }
    const handleClickSignUp = () => {
        router.push("/auth/register");
    }

    const onSubmit = async (values, actions) => {
        try {
            const loginData = {
                email: values.email,
                password: values.password
            }

            const response = await axios.post(`/api/auth/login`, loginData);
            if (response.status === 200) {
                router.push("/panel/dashboard");
                console.log("response", response);
            } else {
                console.error('Giriş başarısız');
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    const LoginFormik = useFormik({
        initialValues: {
            email: "", password: "",
        }, onSubmit, validationSchema: loginSchema,
    });
    const LoginInput = [
        {
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Your Email",
        value: LoginFormik.values.email,
        errorMessage: LoginFormik.errors.email,
        touched: LoginFormik.touched.email,
        icon:<FaUserAlt/>,
        title:"Your Email"
    }, {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Your Password",
        value: LoginFormik.values.password,
        errorMessage: LoginFormik.errors.password,
        touched: LoginFormik.touched.password,
        icon:<BiSolidLockAlt/>,
        title:"Password"
    }];
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
                            <p className={styles.login_title}>Log in<span className={styles.login_title_marker}>!</span></p>
                            <p className={styles.login_description}>Explore, learn, and grow with us. enjoy a seamless and enriching educational journey. lets begin!</p>

                            <form onSubmit={LoginFormik.handleSubmit}>
                                {LoginInput.map((input) => {
                                    return <AuthActionButton
                                        key={input.id}
                                        {...input}
                                        onChange={LoginFormik.handleChange}
                                        onBlur={LoginFormik.handleBlur}
                                    />
                                })}
                                <input type="submit" value="Login"  className={styles.button}/>
                            </form>
                            <p className={styles.forgot_password} onClick={handleClickForgotPassword}>Forgot
                                password?</p>
                            <p className={styles.dont_have_account}>Dont have an account? <span
                                className={styles.login_page_signup} onClick={handleClickSignUp}>Sign Up</span></p>
                        </div>
                    </div>
            </div>
    </>


};

export default LoginPage;
