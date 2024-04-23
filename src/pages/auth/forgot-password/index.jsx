"use client"
import styles from "./../authPage.module.css"
import React from 'react';
import Image from 'next/image'
import ForgotPasswordPicture from "../../../../public/assets/gif/cloud-security.gif"
import AuthActionButton from "@/components/ui/Button/AuthActionButton";
import {FaUserAlt} from "react-icons/fa";
import {useFormik} from "formik";
import axios from "axios";
import {useRouter} from "next/router";
import {forgotPasswordSchema} from "@/schema/forgotPassword";


const ForgotPasswordPage = () => {
    const router = useRouter();
    const onSubmit = async (values, actions) => {
        try {
            const forgotPassword = {
                email: values.email,
            }

            const response = await axios.post(`/api/auth/forgotPassword`, forgotPassword);
            console.log("response", response);
            if (response.status === 200) {

                // router.push("/panel");
            } else {
                console.error('Giriş başarısız');
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    const ForgotPasswordForik = useFormik({
        initialValues: {
            email: "",
        }, onSubmit, validationSchema: forgotPasswordSchema,
    });
    const ForgotPasswordInput = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Your Email",
            value: ForgotPasswordForik.values.email,
            errorMessage: ForgotPasswordForik.errors.email,
            touched: ForgotPasswordForik.touched.email,
            icon: <FaUserAlt/>,
            title: "Your Email"
        }];

    const handlerBackClick = () => {
        // router.push("/auth/login");
    }
    return <>
        <div className={styles.authContainer}>
            <div className={styles.authContainer_Image}>
                <Image
                    src={ForgotPasswordPicture}
                    alt="Picture of the forgot password"
                    className={styles.authContainer_Image_Styles}
                />
            </div>
            <div className={styles.authContainer_Input_Boxes}>
                <div className={styles.authContainer_Input_Boxes_Child}>
                    <p className={styles.login_title}>Forgot password<span
                        className={styles.login_title_marker}>!</span></p>
                    <p className={styles.login_description}>Explore, learn, and grow with us. enjoy a seamless
                        and enriching educational journey. lets begin!</p>

                    <form onSubmit={ForgotPasswordForik.handleSubmit}>
                        {ForgotPasswordInput.map((input) => (
                            <AuthActionButton
                                key={input.id}
                                {...input}
                                onChange={(e) => ForgotPasswordForik.handleChange(e)}
                                onBlur={(e) => ForgotPasswordForik.handleBlur(e)}
                            />
                        ))}

                        <input type="submit" value="Send request" className={styles.button_sendRequest}/>
                        <div className={styles.button_sendRequest}
                             onClick={handlerBackClick()}><i className="fa-solid fa-arrow-left"></i> Back to
                            login
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </>
};

export default ForgotPasswordPage;
