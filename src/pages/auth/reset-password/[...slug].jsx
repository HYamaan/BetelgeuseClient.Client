import styles from "./../authPage.module.css";
import React from 'react';
import Image from 'next/image';
import ForgotPasswordPicture from "../../../../public/assets/gif/cloud-security.gif";
import AuthActionButton from "@/components/ui/Button/AuthActionButton";
import {useFormik} from "formik";
import axios from "axios";
import {useRouter} from "next/router";
import {ResetPasswordSchema} from "@/schema/resetPasswordSchema";
import {BiSolidLockAlt} from "react-icons/bi";

const ResetPasswordFormik = ({userId, token}) => {
    const router = useRouter();

    const onSubmit = async (values, actions) => {
        try {
            const resetPassword = {
                Id: userId,
                Token: token,
                confirmPassword: values.confirmPassword,
                password: values.password,
            };
            console.log("token", token);
            console.log("resetPassword", resetPassword);

            const response = await axios.post(`/api/auth/resetPassword`, resetPassword);
            console.log("response", response);
            if (response.status === 200) {
                router.push("/panel");
            } else {
                console.error('Giriş başarısız');
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    const ResetPasswordFormik = useFormik({
        initialValues: {
            confirmPassword: "", password: "",
        },
        onSubmit,
        validationSchema: ResetPasswordSchema,
    });

    const ResetPasswordInput = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: ResetPasswordFormik.values.password,
            errorMessage: ResetPasswordFormik.errors.password,
            touched: ResetPasswordFormik.touched.password,
            icon: <BiSolidLockAlt/>,
            title: "Password"
        },
        {
            id: 2,
            name: "confirmPassword",
            type: "password",
            placeholder: "Your Confirm Password",
            value: ResetPasswordFormik.values["confirm-password"],
            errorMessage: ResetPasswordFormik.errors["confirm-password"],
            touched: ResetPasswordFormik.touched["confirm-password"],
            icon: <BiSolidLockAlt/>,
            title: "Confirm Password"
        }
    ];

    const handlerBackClick = () => {
        router.push("/auth/login");
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authContainer_Image}>
                <Image
                    src={ForgotPasswordPicture}
                    alt="Picture of the reset password"
                    className={styles.authContainer_Image_Styles}
                />
            </div>
            <div className={styles.authContainer_Input_Boxes}>
                <div className={styles.authContainer_Input_Boxes_Child}>
                    <p className={styles.login_title}>Reset password<span className={styles.login_title_marker}>!</span>
                    </p>
                    <p className={styles.login_description}>Explore, learn, and grow with us. Enjoy a seamless and
                        enriching educational journey. Let's begin!</p>

                    <form onSubmit={ResetPasswordFormik.handleSubmit}>
                        {ResetPasswordInput.map((input) => (
                            <AuthActionButton
                                key={input.id}
                                {...input}
                                onChange={(e) => ResetPasswordFormik.handleChange(e)}
                                onBlur={(e) => ResetPasswordFormik.handleBlur(e)}
                            />
                        ))}
                        <input type="submit" value="Reset Password" className={styles.button_sendRequest}/>
                        <div className={styles.button_sendRequest}
                             onClick={handlerBackClick}><i className="fa-solid fa-arrow-left"></i> Back to
                            login
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordFormik;

export async function getServerSideProps({params}) {
    const refreshPassword_slug = params.slug;
    const userId = refreshPassword_slug[0];
    const token = refreshPassword_slug.slice(1).join("/");
    console.log("refreshPassword_slug", refreshPassword_slug);
    console.log("token", token);
    if (userId === undefined || token === undefined) {
        return {
            notFound: true
        };
    }
    return {
        props: {userId, token}
    };
}
