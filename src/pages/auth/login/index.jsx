"use client"

import React from 'react';
import Image from 'next/image'
import loginPic from "../../../assets/gif/login-security.gif"
import AuthActionButton from "@/components/ui/Button/AuthActionButton";
import {FaUserAlt} from "react-icons/fa";
import {BiSolidLockAlt} from "react-icons/bi";
import {loginSchema} from "@/schema/loginSchema";
import {useFormik} from "formik";
const LoginPage = () => {
    const onSubmit = async (values, actions) => {
        actions.preventDefault();

    }
    const LoginFormik = useFormik({
        initialValues: {
            email: "", password: "",
        }, onSubmit, validationSchema: loginSchema,
    });
    const LoginInput = [{
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
            <div className="container mx-auto flex items-center justify-center gap-6 mt-20">
                <div className="flex-1">
                    <Image
                        src={loginPic}
                        alt="Picture of the author"
                    />
                </div>
                    <div className="flex-1">
                        <div className="flex flex-col">
                            <p className="text-5xl font-semibold text-fogGray">Log in<span className="text-sapphireBlue">!</span></p>
                            <p className="mt-7 mb-10 text-lg text-fogGray">Explore, learn, and grow with us. enjoy a seamless and enriching educational journey. lets begin!</p>

                            <form onSubmit={LoginFormik.handleSubmit}>
                                {LoginInput.map((input) => {
                                    return <AuthActionButton
                                        key={input.id}
                                        {...input}
                                        onChange={LoginFormik.handleChange}
                                        onBlur={LoginFormik.handleBlur}
                                    />
                                })}
                                <input type="submit" value="Login"  className="w-full bg-sapphireBlue text-xl rounded-2xl p-4 text-[#fff] cursor-pointer"/>
                            </form>
                            <p className="text-right mt-2 text-lg cursor-pointer">Forgot password?</p>
                            <p className="self-center text-2xl  mt-10">Don't have an account? <span className="m-5 text-sapphireBlue cursor-pointer">Sign Up</span></p>
                        </div>

                    </div>
            </div>

    </>


};

export default LoginPage;
